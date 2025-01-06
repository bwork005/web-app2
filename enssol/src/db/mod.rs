use polodb_core::{Database, Result};
use crate::models::records::{Project, AuditLog};

pub struct RecordsDb {
    db: Database
}

impl RecordsDb {
    pub fn new(path: &str) -> Result<Self> {
        let db = Database::open(path)?;
        Ok(Self { db })
    }

    pub fn insert_project(&self, project: &Project) -> Result<()> {
        let collection = self.db.collection("projects");
        collection.insert_one(project)?;
        Ok(())
    }

    pub fn find_projects(&self) -> Result<Vec<Project>> {
        let collection = self.db.collection("projects");
        let projects = collection.find(None)?;
        Ok(projects)
    }

    pub fn insert_audit_log(&self, log: &AuditLog) -> Result<()> {
        let collection = self.db.collection("audit_logs");
        collection.insert_one(log)?;
        Ok(())
    }

    pub fn find_audit_logs(&self) -> Result<Vec<AuditLog>> {
        let collection = self.db.collection("audit_logs");
        let logs = collection.find(None)?;
        Ok(logs)
    }
}
