# Code Examples

## Example 1: Basic HTTP Server

### Server Implementation
```rust
// filepath: src/http_server.rs
use tiny_http::{Server, Response};
use std::io::Error;

const MAX_CONNECTIONS: u32 = 10;

pub fn start_server(port: u16) -> Result<(), Error> {
    let server = Server::http(format!("0.0.0.0:{}", port))?;

    for request in server.incoming_requests() {
        println!("Received request! method: {:?}, url: {:?}",
            request.method(),
            request.url()
        );

        let response = Response::from_string("Hello World!");
        request.respond(response)?;
    }

    Ok(())
}
```

## Example 2: Simple String Manipulation

```rust
// filepath: src/string_utils.rs
pub fn to_uppercase(s: &str) -> String {
    s.to_uppercase()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_to_uppercase() {
        assert_eq!(to_uppercase("hello"), "HELLO");
    }
}
```
