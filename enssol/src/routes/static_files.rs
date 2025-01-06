use rocket::fs::{FileServer, relative};

pub fn static_routes() -> FileServer {
    FileServer::from(relative!("static"))
}
