tonic::include_proto!("agent");
use crate::{
    handler::test_agent::test_agent_server::TestAgent,
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

        let model_response =
            make_request(client, request_data.file_name, request_data.prompt).await;

        println!("Got model response");

        let response = match &model_response.choices[0].message.content {
            Some(message) => message,
            None => &String::from("No response provided"),
        };

        println!("Got model response");

        let reply = TestMethodResponse {
            status: "success".to_string(),
            response: response.to_string(),
            error_message: "".to_string(),
        };

        Ok(Response::new(reply))
    }
}
