use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Project {
    pub obligation_number: String,
    pub project_name: String,
    pub primary_env_mechanism: String,
    pub procedure: String,
    pub env_aspect: String,
    pub obligation: String,
    pub accountability: String,
    pub responsibility: String,
    pub project_phase: String,
    pub action_due_date: Option<NaiveDateTime>,
    pub close_out_date: Option<NaiveDateTime>,
    pub status: String,
    pub supporting_info: Option<String>,
    pub general_comments: Option<String>,
    pub compliance_comments: Option<String>,
    pub nonconformance_comments: Option<String>,
    pub evidence: Option<String>,
    pub person_email: Option<String>,
    pub recurring_obligation: bool,
    pub recurring_frequency: Option<String>,
    pub recurring_status: Option<String>,
    pub recurring_forecast_date: Option<NaiveDateTime>,
    pub inspection: bool,

    pub inspection_frequency: Option<String>,
    pub site_or_desktop: Option<String>,
    pub new_control_action_required: Option<String>,
    pub obligation_type: Option<String>
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuditLog {
    pub timestamp: NaiveDateTime,
    pub project_id: String,
    pub action: String,
    pub user: String,
    pub details: Option<String>
}
