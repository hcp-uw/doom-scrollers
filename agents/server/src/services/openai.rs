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
    let message = "On the dataset `hcp.files`, find the file whose contents correspond best the description denoted by <--FILE--> and has the comment `// Test this file`` written above a function. 
    Then, based on the content of that function that is labelled with `// Test this file`, answer the given prompt (denoted by <--PROMPT-->)".to_string();

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

fn get_message_args(file_name: String, prompt: String) -> Vec<ChatCompletionRequestMessage> {
    let mut res: Vec<ChatCompletionRequestMessage> = vec![get_initial_prompt()];

    res.push(convert_message_to_args(format!(
        "<--FILE-->\n{}",
        file_name
    )));

    res.push(convert_message_to_args(format!("<--PROMPT-->\n{}", prompt)));

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
