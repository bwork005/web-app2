# API Reference

## Core Web Server API

### HTTP Server Interface
```rust
pub fn start_server(port: u16) -> Result<(), Error>
```
Starts the HTTP server on the specified port.

- **Parameters:**
  - `port`: Port number to listen on (1-65535)
- **Returns:**
  - `Ok(())` on success
  - `Err(Error)` on failure

### String Utilities
```rust
pub fn to_uppercase(s: &str) -> String
```
Converts a string to uppercase.

- **Parameters:**
  - `s`: String slice to convert (UTF-8 encoded)
- **Returns:**
  - `String` containing uppercase version

## HTML5 Components

### Forms
```html
<form method="POST" action="/submit">
  <input type="text" required>
  <button type="submit">Submit</button>
</form>
```
Modern HTML5 form with validation.

### Tables
```html
<table>
  <thead>
    <tr><th>Header</th></tr>
  </thead>
  <tbody>
    <tr><td>Data</td></tr>
  </tbody>
</table>
```
Semantic HTML5 table structure.

## CSS3 Styles

### Layout
```css
.container {
  display: flex;
  width: 100%;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```
Modern CSS3 layout with flexbox.

## JavaScript ES9 Functions

### Async/Await Event Handlers
```javascript
async function handleClick(event) {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```
Modern async/await pattern with ES9.

## Error Handling

```rust
#[derive(Debug)]
pub enum AppError {
    InvalidParameters,
    AuthenticationError,
    PermissionDenied,
    NotFound,
    ServerError,
}

impl From<AppError> for tiny_http::Response<std::io::Cursor<Vec<u8>>> {
    fn from(error: AppError) -> Self {
        // Convert error to HTTP response
        // ...existing code...
    }
}
```

## Data Formats

### Request Format
```http
GET /path HTTP/1.1
Host: example.com
Accept: text/html
Accept-Charset: UTF-8
```

### Response Format
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: <length>

<!DOCTYPE html>
<html>
...
</html>
```
