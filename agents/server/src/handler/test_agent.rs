tonic::include_proto!("agent");

use crate::{
    handler::{test_agent::test_agent_server::TestAgent, types::TestAgentJSONResponse},
    services::openai::{get_client, make_request},
};
use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct AgentHandler {}

#[tonic::async_trait]
impl TestAgent for AgentHandler {
    async fn test_method(
        &self,
        request: Request<TestMethodRequest>,
    ) -> Result<Response<TestMethodResponse>, Status> {
        let request_data = request.into_inner();

        println!("Received request to test method");

        let client = get_client();

        println!("Awaiting model response");

        let model_response = make_request(client, request_data.file_name.as_str()).await;

        let response = match &model_response.choices[0].message.content {
            Some(message) => message,
            None => &String::from("No response provided"),
        };

        println!("{}", response);

        let mut err = String::new();
        let parsed_response: TestAgentJSONResponse = if let Ok(val) = serde_json::from_str(response)
        {
            val
        } else {
            err = "Unable to parse JSON".to_string();
            TestAgentJSONResponse::default()
        };

        println!("{:?}", parsed_response);
        println!("Err: {}", err.is_empty());

        let reply = TestMethodResponse {
            status: if err.is_empty() {
                "success".to_string()
            } else {
                "error".to_string()
            },
            response: parsed_response.code,
            error_message: err,
        };

        Ok(Response::new(reply))
    }
}
