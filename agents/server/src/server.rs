use agent_service::{test_agent_server::TestAgentServer, TestMethodRequest, TestMethodResponse};
use spiceai::{ClientBuilder, StreamExt};
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
    let address = "[::]:8089".parse()?;
    println!("Server listening on: {}", address);
    let agent_service_handler = AgentHandler::default();

    let mut client = ClientBuilder::new()
        .flight_url("http://spiced:50051")
        .build()
        .await
        .unwrap();

    let mut flight_data_stream = client
        .query("SELECT content FROM hcp.files WHERE name=\'singleton.ts\'")
        .await
        .expect("Error executing query");

    while let Some(batch) = flight_data_stream.next().await {
        match batch {
            Ok(batch) => {
                /* process batch */
                println!("{:?}", batch)
            }
            Err(_) => { /* handle error */ }
        };
    }

    println!("Listening...");
    Server::builder()
        .add_service(TestAgentServer::new(agent_service_handler))
        .serve(address)
        .await?;

    Ok(())
}
