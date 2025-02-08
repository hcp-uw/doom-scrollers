use agent_service::{test_agent_server::TestAgentServer, TestMethodRequest, TestMethodResponse};
use tonic::{transport::Server, Request, Response, Status};

use crate::agent_service::test_agent_server::TestAgent;

pub mod agent_service {
    tonic::include_proto!("agent_server");
}

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

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let address = "[::1]:8089".parse()?;
    let agent_service_handler = AgentHandler::default();
    println!("Listening...");
    Server::builder()
        .add_service(TestAgentServer::new(agent_service_handler))
        .serve(address)
        .await?;

    Ok(())
}
