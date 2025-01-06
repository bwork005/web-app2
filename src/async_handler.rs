use async_std::task;
use indexmap::IndexMap;
use smol_str::SmolStr;
use spin::Mutex;
use std::sync::Arc;

pub struct AsyncCache {
    cache: Arc<Mutex<IndexMap<SmolStr, Vec<u8>>>>
}

impl AsyncCache {
    pub fn new() -> Self {
        Self {
            cache: Arc::new(Mutex::new(IndexMap::new()))
        }
    }

    pub async fn store(&self, key: &str, value: Vec<u8>) {
        let cache = self.cache.clone();
        let key = SmolStr::new(key);
        task::spawn(async move {
            let mut cache = cache.lock();
            cache.insert(key, value);
        }).await;
    }
}
