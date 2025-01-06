use rocket::http::Status;
use rocket::request::{FromRequest, Outcome, Request};
use std::fs::File;
use std::io::{BufRead, BufReader};

pub struct User {
    pub username: String,
}

#[derive(Debug)]
pub enum AuthError {
    Missing,
    Invalid,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for User {
    type Error = AuthError;

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let cookies = request.cookies();

        match cookies.get_private("user_token") {
            Some(cookie) => {
                // Validate against passwd file
                let file = match File::open("config/auth/passwd") {
                    Ok(f) => f,
                    Err(_) => return Outcome::Failure((Status::InternalServerError, AuthError::Invalid)),
                };

                let reader = BufReader::new(file);
                let username = cookie.value();

                for line in reader.lines() {
                    if let Ok(line) = line {
                        let parts: Vec<&str> = line.split(':').collect();
                        if parts.len() >= 1 && parts[0] == username {
                            return Outcome::Success(User {
                                username: username.to_string(),
                            });
                        }
                    }
                }
                Outcome::Failure((Status::Unauthorized, AuthError::Invalid))
            }
            None => Outcome::Failure((Status::Unauthorized, AuthError::Missing)),
        }
    }
}
