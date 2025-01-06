use anyhow::Result;
use std::path::PathBuf;
use crate::server::WebServer;
use crate::db::pickledb_loader::ProjectStore;
use tiny_http::{Server, Response};
mod routes;

mod server;
mod static_files;
mod db;

fn main() -> Result<()> {
    env_logger::init();

    let static_dir = PathBuf::from("static");
    let store = ProjectStore::new("data/projects.db")?;

    let server = WebServer::new("127.0.0.1:8080", &static_dir, store)?;
    server.serve()?;

    let server = Server::http("0.0.0.0:8000").unwrap();

    for request in server.incoming_requests() {
        match request.url() {
            "/api/login" => routes::api::handle_login(request),
            // ...existing routes...
            _ => {
                let response = Response::from_string("Not Found")
                    .with_status_code(404);
                request.respond(response).unwrap();
            }
        }
    }

    Ok(())
}
