#[macro_use] extern crate rocket;

mod db;
mod models;
mod routes;
mod guards;

use db::RecordsDb;
use routes::{static_routes, get_projects, get_audit_logs, login, logout};
use rocket::fs::FileServer;

#[launch]
fn rocket() -> _ {
    let db = RecordsDb::new("var/db/database.pdb").expect("Failed to initialize database");

    rocket::build()
        .manage(db)
        .mount("/", static_routes())
        .mount("/api", routes![get_projects, get_audit_logs, login, logout])
        .mount("/static", FileServer::from("static"))
}
