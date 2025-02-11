use async_openai::{
    config::OpenAIConfig,
    types::{
        ChatCompletionRequestMessage, ChatCompletionRequestSystemMessageArgs,
        CreateChatCompletionRequest, CreateChatCompletionRequestArgs, CreateChatCompletionResponse,
    },
    Client,
};

pub fn get_client() -> Client<OpenAIConfig> {
    Client::with_config(OpenAIConfig::new().with_api_base("http://localhost:8090/v1"))
}

fn get_initial_prompt() -> ChatCompletionRequestMessage {
    let message = "Run the query `select content from hcp.files where name = FILE`, where FILE is provided to in a subsequent message denoted by <--FILE-->. Return only the content formatted as a code block".to_string();

    ChatCompletionRequestSystemMessageArgs::default()
        .content(message)
        .build()
        .unwrap()
        .into()
}

fn convert_message_to_args(message: String) -> ChatCompletionRequestMessage {
    ChatCompletionRequestSystemMessageArgs::default()
        .content(message)
        .build()
        .unwrap()
        .into()
}

fn get_message_args(file_name: String, _prompt: String) -> Vec<ChatCompletionRequestMessage> {
    let mut res: Vec<ChatCompletionRequestMessage> = vec![get_initial_prompt()];

    res.push(convert_message_to_args(format!(
        "<--FILE-->\n{}",
        file_name
    )));

    //    res.push(convert_message_to_args(format!("<--PROMPT-->\n{}", prompt)));

    res
}

fn get_request_params(file_name: String, prompt: String) -> CreateChatCompletionRequest {
    let processed_messages = get_message_args(file_name, prompt);

    CreateChatCompletionRequestArgs::default()
        .model("openai")
        .messages(processed_messages)
        .build()
        .unwrap()
}

pub async fn make_request(
    client: Client<OpenAIConfig>,
    file_name: String,
    prompt: String,
) -> CreateChatCompletionResponse {
    let params = get_request_params(file_name, prompt);

    client.chat().create(params).await.unwrap()
}
