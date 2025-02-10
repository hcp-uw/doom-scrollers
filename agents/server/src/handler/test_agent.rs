tonic::include_proto!("agent");
use crate::handler::test_agent::test_agent_server::TestAgent;
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

        let reply = TestMethodResponse {
            status: "success".to_string(),
            response: request_data.prompt,
            error_message: "".to_string(),
        };

        Ok(Response::new(reply))
    }
}
