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
    let message = "In the dataset `spice.hcp.files`, find the file whose `content` column contains `// Test this file` . Generate a query for this and execute to find the contents. Now, write a unit test for the function that the comment refers to,  assuming that the unit test will be in the same file, so no need to import the original function for the unit tests. Use Jest to write your tests. Return only the code block containing the original function and the unit tests.".to_string();

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

fn get_message_args(_file_name: String, _prompt: String) -> Vec<ChatCompletionRequestMessage> {
    let mut res: Vec<ChatCompletionRequestMessage> = vec![get_initial_prompt()];


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
