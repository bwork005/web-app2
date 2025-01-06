# EnvEng Web Server

A lightweight HTTP web server implementation in Rust, focusing on cross-platform compatibility and minimal dependencies.

## Features
- Static file serving over HTTP
- Basic authentication and session management
- Cross-platform Rust implementation
- Minimal footprint
- UTF-8 encoding support
- HTML5 compliant
- CSS3 compliant
- ECMAScript 2018 (ES9) compliant
- Mobile-first responsive design

## Prerequisites
- Rust toolchain (via rustup)
- Cargo package manager
- Git

## Build Quick Start

To build the project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/web-app.git
    cd web-app
    ```

2. **Set up the environment**:
    ```sh
    export ENV=dev  # For development build
    # or
    export ENV=prod  # For production build
    ```

3. **Build the project**:
    ```sh
    cargo build --release
    ```

4. **Install the project**:
    ```sh
    cargo install --path .
    ```

5. **Clean build artifacts**:
    ```sh
    cargo clean
    ```

## Tool Requirements

Ensure you have the following tools installed:

- **Rust**: Programming language with memory safety and concurrency
- **Cargo**: Package manager and build system for Rust
- **Rustup**: Toolchain installer for Rust
- **Git**: For version control

## Build Commands

### Basic Build Commands
```bash
cargo build --release  # Build production binary
cargo test             # Build and run tests
cargo check            # Check code without building
cargo clean            # Clean build artifacts

# Clean previous builds and create new release package
cargo package

# The optimized package will be at:
# target/release/web-app-0.0.1.tar.gz
```

## Project Structure
```
.
├─ target/           # Build outputs
├─ src/              # Source code
├─ tests/            # Test suite
└─ static/           # Static web content
    ├─ assets/       # Static assets
    ├─ error/        # Error pages
    └─ templates/    # HTML templates
```

## Usage
Start the server:
```bash
./target/release/web_server -c /etc/web_server.conf
```

Access via browser:
- Login page: http://localhost:8080
- Admin panel: http://localhost:8080/admin
- Status page: http://localhost:8080/status

## Technical Details
- Rust 2018 edition compliant
- Cross-platform compatibility
- Static linking
- UTF-8 character encoding
- Memory-safe implementation
- Thread-safe operations
- No external dependencies

## Development Guidelines
- Mobile-first responsive design
- HTML5
- Native CSS3 only (no frameworks)
- ES9 JavaScript (no libraries)
- UTF-8 encoding for all files

## Security
- Memory protection features
- Stack protection enabled
- Strict input validation
- Safe string handling
- Format string protection

## Running Tests

To ensure the quality and correctness of the web application, a comprehensive test suite has been implemented. Follow the steps below to set up and run the tests.

### Prerequisites

1. **Install Dependencies**: Ensure all necessary dependencies are installed. This includes the Rust toolchain and Cargo package manager.
    ```sh
    rustup update
    ```

2. **Build the Project**: Compile the project with the appropriate flags.
    ```sh
    cargo build --release
    ```

### Running Unit Tests

Unit tests are located in the `tests/unit` directory. To run the unit tests, execute the following command:
```sh
cargo test --test unit
```

### Running Integration Tests

Integration tests are located in the `tests/integration` directory. To run the integration tests, execute the following command:
```sh
cargo test --test integration
```

### Running Performance Tests

Performance tests are located in the `tests/performance` directory. To run the performance tests, execute the following command:
```sh
cargo test --test performance
```

### Running Security Tests

Security tests are located in the `tests/security` directory. To run the security tests, execute the following command:
```sh
cargo test --test security
```

### Cleaning Up

To clean up the build artifacts and temporary files after running the tests, execute the following command:
```sh
cargo clean
```

### Additional Notes

- Ensure that the environment variables and configurations are correctly set up before running the tests.
- Use `valgrind` or equivalent tools to check for memory leaks and other issues during testing.

For more detailed information on the test suite and individual test cases, refer to the documentation in the `docs` directory.

## Documentation Links

- [API Documentation](docs/api/API.md)
- [User Guide](docs/user/USER_GUIDE.md)
- [Developer Guide](docs/dev/DEVELOPER_GUIDE.md)
- [Installation Instructions](docs/user/INSTALL.md)
- [Frequently Asked Questions](docs/user/FAQ.md)
- [Support Information](docs/user/SUPPORT.md)
- [Contributing Guidelines](docs/dev/CONTRIBUTING.md)
- [Project Roadmap](docs/project/ROADMAP.md)
- [Security Policies](docs/security/SECURITY.md)

## License
AGPL-3.0-or-later
