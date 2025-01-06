use tiny_http::Header;

pub fn get_security_headers() -> Vec<Header> {
    vec![
        Header::from_bytes("X-Content-Type-Options", "nosniff").unwrap(),
        Header::from_bytes("X-Frame-Options", "DENY").unwrap(),
        Header::from_bytes("X-XSS-Protection", "1; mode=block").unwrap(),
        Header::from_bytes("Referrer-Policy", "strict-origin-when-cross-origin").unwrap(),
        Header::from_bytes(
            "Content-Security-Policy",
            "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;"
        ).unwrap(),
        Header::from_bytes(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        ).unwrap(),
    ]
}
