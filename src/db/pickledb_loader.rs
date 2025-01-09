use anyhow::Result;
use pickledb::{PickleDb, PickleDbDumpPolicy, SerializationMethod};
use serde::{Deserialize, Serialize};
use std::path::Path;
use std::sync::{Arc, Mutex};

#[derive(Debug, Serialize, Deserialize)]
pub struct Record {
    pub record_key: String,
    pub data: String,
    pub checksum: Vec<u8>,
    pub timestamp: u64,
}

#[derive(Clone)]
pub struct ProjectStore {
    db: Arc<Mutex<PickleDb>>,
}

impl ProjectStore {
    pub fn new<P: AsRef<Path>>(path: P) -> Result<Self> {
        let db = PickleDb::new(path, PickleDbDumpPolicy::AutoDump, SerializationMethod::Json);
        Ok(Self { db: Arc::new(Mutex::new(db)) })
    }

    pub fn save_record(&mut self, key: &str, record: &Record) -> Result<()> {
        let mut db = self.db.lock().unwrap();
        db.set(key, record)?;
        Ok(())
    }

    pub fn list_projects(&self) -> Result<Vec<Record>> {
        let db = self.db.lock().unwrap();
        Ok(db.iter().filter_map(|item| item.get_value::<Record>()).collect())
    }
}
