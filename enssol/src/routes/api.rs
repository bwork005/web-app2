use rocket::serde::json::Json;
use rocket::State;
use crate::db::RecordsDb;
use crate::models::{Project, AuditLog, ApiResponse};

#[get("/projects")]
pub async fn get_projects(db: &State<RecordsDb>) -> Json<ApiResponse<Vec<Project>>> {
    match db.get_projects() {
        Ok(projects) => Json(ApiResponse {
            success: true,
            data: Some(projects),
            error: None,
        }),
        Err(e) => Json(ApiResponse {
            success: false,
            data: None,
            error: Some(e.to_string()),
        }),
    }
}

#[get("/audit-logs")]
pub async fn get_audit_logs(db: &State<RecordsDb>) -> Json<ApiResponse<Vec<AuditLog>>> {
    match db.get_audit_logs() {
        Ok(logs) => Json(ApiResponse {
            success: true,
            data: Some(logs),
            error: None,
        }),
        Err(e) => Json(ApiResponse {
            success: false,
            data: None,
            error: Some(e.to_string()),
        }),
    }
}
