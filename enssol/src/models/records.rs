use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Project {
    project_name: String,
    primary_environmental_mechanism: String,
    procedure: String,
    environmental_aspect: String,
    obligation_number: String,
    obligation: String,
    accountability: String,
    responsibility: String,
    project_phase: String,
    action_due_date: DateTime<Utc>,
    close_out_date: Option<DateTime<Utc>>,
    status: String,
    supporting_information: Option<String>,
    general_comments: Option<String>,
    compliance_comments: Option<String>,
    nonconformance_comments: Option<String>,
    evidence: Option<String>,
    person_email: Option<String>,
    recurring_obligation: Option<bool>,
    recurring_frequency: Option<String>,
    recurring_status: Option<String>,
    recurring_forcasted_date: Option<DateTime<Utc>>,
    inspection: Option<bool>,
    inspection_frequency: Option<String>,
    site_or_desktop: Option<String>,
    new_control_action_required: Option<String>,
    obligation_type: Option<String>
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuditLog {
    timestamp: DateTime<Utc>,
    username: String,
    action: String,
    status: String,
    details: Option<String>
}
