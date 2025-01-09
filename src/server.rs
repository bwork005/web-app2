use anyhow::{Error, Result};
use log::{error, info};
use serde::{Deserialize, Serialize};
use spin::Mutex;
use std::path::Path;
use std::sync::Arc;
use tiny_http::{Header, Method, Request, Response, Server};

use crate::db::pickledb_loader::{ProjectStore, Record};
use crate::static_files;

#[derive(Serialize, Deserialize)]
struct ApiResponse<T> {
    success: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    data: Option<T>,
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
}

pub struct WebServer {
    server: Server,
    static_dir: Box<Path>,
    store: ProjectStore,
}

impl WebServer {
    pub fn new(addr: &str, static_dir: &Path, store: ProjectStore) -> Result<Self, Error> {
        let server = Server::http(addr).map_err(Error::msg)?;
        info!("Server listening on {}", addr);

        Ok(Self { server, static_dir: static_dir.into(), store })
    }

    pub fn serve(self) -> Result<()> {
        let store = Arc::new(Mutex::new(self.store.clone()));

        for mut request in self.server.incoming_requests() {
            let path = request.url().to_string();
            info!("{} {}", request.method(), path);

            let response = match (request.method(), path.as_str()) {
                (Method::Get, "/api/projects") => self.handle_projects_list(),
                (Method::Post, "/api/records") => {
                    let mut store = store.lock();
                    self.handle_record_create(&mut request, &mut store)
                }
                _ => self.handle_static_file(&request),
            };

            if let Err(e) = request.respond(response) {
                error!("Error sending response: {}", e);
            }
        }
        Ok(())
    }

    fn handle_projects_list(&self) -> Response<std::io::Cursor<Vec<u8>>> {
        match self.store.list_projects() {
            Ok(projects) => self.json_response(&ApiResponse {
                success: true,
                data: Some(projects),
                error: None,
            }),
            Err(e) => self.error_response(500, &e.to_string()),
        }
    }

    fn handle_record_create(
        &self,
        request: &mut Request,
        store: &mut ProjectStore,
    ) -> Response<std::io::Cursor<Vec<u8>>> {
        let mut body = String::new();
        if let Err(e) = request.as_reader().read_to_string(&mut body) {
            return self.error_response(400, &format!("Invalid request body: {}", e));
        }

        match serde_json::from_str::<Record>(&body) {
            Ok(record) => {
                if let Err(e) = store.save_record(&record.record_key, &record) {
                    self.error_response(500, &format!("Failed to save record: {}", e))
                } else {
                    self.json_response(&ApiResponse::<()> {
                        success: true,
                        data: None,
                        error: None,
                    })
                }
            }
            Err(e) => self.error_response(400, &format!("Invalid record format: {}", e)),
        }
    }

    fn json_response<T: Serialize>(&self, data: &T) -> Response<std::io::Cursor<Vec<u8>>> {
        let mut response = Response::from_data(serde_json::to_vec(data).unwrap());
        response.add_header(Header::from_bytes("Content-Type", "application/json").unwrap());
        response
    }

    fn error_response(&self, status: u16, message: &str) -> Response<std::io::Cursor<Vec<u8>>> {
        let response =
            ApiResponse::<()> { success: false, data: None, error: Some(message.to_string()) };
        let mut response = Response::from_data(serde_json::to_vec(&response).unwrap());
        response.add_header(Header::from_bytes("Content-Type", "application/json").unwrap());
        response.with_status_code(status)
    }

    fn handle_static_file(&self, request: &Request) -> Response<std::io::Cursor<Vec<u8>>> {
        let path = request.url().to_string();
        match static_files::serve_static(&self.static_dir, &path) {
            Ok(content) => {
                let mut response = Response::from_data(content.data);
                response.add_header(
                    Header::from_bytes("Content-Type".as_bytes(), content.mime_type.as_bytes())
                        .unwrap(),
                );
                response
            }
            Err(e) => {
                error!("Error serving {}: {}", path, e);
                Response::from_string("404 Not Found").with_status_code(404)
            }
        }
    }
}
