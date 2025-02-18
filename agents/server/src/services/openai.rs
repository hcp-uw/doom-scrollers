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

fn convert_message_to_args(message: String) -> ChatCompletionRequestMessage {
    ChatCompletionRequestSystemMessageArgs::default()
        .content(message)
        .build()
        .expect("Failed to initialize chat message")
        .into()
}

fn get_message_args(file_name: &str) -> Vec<ChatCompletionRequestMessage> {
    let mut res: Vec<ChatCompletionRequestMessage> = vec![];

    res.push(convert_message_to_args(format!(
        "<--FILE-->\n{file_name}\n<--END-FILE-->",
    )));

    res
}

fn get_request_params(file_name: &str) -> CreateChatCompletionRequest {
    let processed_messages = get_message_args(file_name);

    CreateChatCompletionRequestArgs::default()
        .model("openai")
        .messages(processed_messages)
        .build()
        .expect("Failed to retrieve chat request parameters")
}

pub async fn make_request(
    client: Client<OpenAIConfig>,
    file_name: &str,
) -> CreateChatCompletionResponse {
    let params = get_request_params(file_name);

    client
        .chat()
        .create(params)
        .await
        .expect("Failed to make request to local Spice agent")
}
