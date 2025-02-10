use handler::test_agent::{test_agent_server::TestAgentServer, AgentHandler};
use tonic::transport::Server;

pub mod handler;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let address = "[::]:8089".parse()?;
    let agent_service_handler = AgentHandler::default();
    println!("Listening...");
    Server::builder()
        .add_service(TestAgentServer::new(agent_service_handler))
        .serve(address)
        .await?;

    Ok(())
}
