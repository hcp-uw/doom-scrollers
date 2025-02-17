use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct TestAgentJSONResponse {
    pub prompt_response: String,
    pub code: String,
}
