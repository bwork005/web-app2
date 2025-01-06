use tiny_http::{Request, Response, Server};
use std::fs::File;
use std::io::Read;


pub fn handle_login(request: Request) {
    let mut file = match File::open("static/api/login") {
        Ok(file) => file,
        Err(_) => {
            let response = Response::from_string("Failed to read file: \"static/api/login\"")
                .with_status_code(500);
            request.respond(response).unwrap();
            return;
        }
    };

    let mut contents = String::new();
    if let Err(_) = file.read_to_string(&mut contents) {
        let response = Response::from_string("Failed to read file contents")
            .with_status_code(500);
        request.respond(response).unwrap();
        return;
    }

    let response = Response::from_string(contents)
        .with_status_code(200);
    request.respond(response).unwrap();
}
