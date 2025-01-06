# Rust Development Guidelines

## General Guidelines
- Adhere to Rust's 2018 edition standards.
- Ensure code is portable, cross-platform, and cross-architecture.
- Prioritize compatibility with lightweight environments.
- Avoid features requiring non-portable platform-specific APIs.
- Write code optimized for lightweight environments.
- Data-oriented design is preferred over object-oriented design.
- Ensure all files use UTF-8 encoding.

## Encoding
- Set encoding to UTF-8 (Latin-1) for all source files.
- Use only ASCII-compatible characters where possible.

## Development Tools
### Core Tools
- **Rust**: Programming language with memory safety and concurrency.
- **Cargo**: Rust's package manager and build system.
- **Rustup**: Toolchain installer for Rust.
- **Rustc**: The Rust compiler.
- **Rust-std**: The Rust standard library.
- **Rust-docs**: Local copy of the Rust documentation.
- **Rust-analyzer**: Language server for editors and IDEs.

### Version Control and Collaboration
- **Git**: Version control system.
- **Github-CLI**: Command line interface for Github.

### Security and Encryption
- **GPG**: Encryption and signing tool.
- **GPG-Agent**: Manages private keys.
- **Rust-openssl**: OpenSSL bindings for Rust.
- **Jsonwebtoken**: JSON Web Token implementation in Rust.
- **Accesscontrol**: Access control library for Rust.
- **Sha2**: SHA-2 hash functions.

### Networking and Communication
- **Dropbear**: Lightweight SSH client and server.
- **Tiny-http**: Low-level HTTP server library in Rust.
- **Tokio**: Asynchronous runtime for Rust.
- **Rocket**: Web framework for Rust.

### Utilities and Libraries
- **Lru**: Least Recently Used cache implementation.
- **Zip**: Library for handling ZIP archives.
- **Regex**: Regular expressions for Rust.
- **Sys-info**: System information library for Rust.
- **Wasmer**: WebAssembly runtime.
- **Dyon**: Rust scripting language.

## Code Quality
- **Clippy**: Lint tool that provides extra checks for common mistakes and stylistic choices.
- **Rustfmt**: Tool for automatically formatting code.
- **Encoding_rs**: Character encoding library to ensure UTF-8 compliance.

## Documentation
- **Rustdoc**: Documentation generator for Rust.
- **Roff**: Manual page formatter.

## Testing and Benchmarking
- **Cargo Test**: Built-in testing framework for Rust.
- **Tarpaulin**: Code coverage analysis for Rust.
- **Criterion**: Benchmarking library for Rust.

## Monitoring and Logging
- **Prometheus**: Prometheus instrumentation library for Rust.
- **Log**: Logging facade for Rust.

### Database
- **PoloDB_core**: An embedded JSON database written in Rust. It only costs around 500KB of memory to serve a database, making it extremely lightweight.


## Coding Standards
- Follow Rust's official style guide and use `rustfmt` for formatting.
- Use `clippy` to enforce coding standards and catch common mistakes.
- Avoid complex control structures and nested loops.
- Ensure generated code is safe, efficient, and maintainable.
- Provide clear and concise comments to explain the purpose of the code.
- Use consistent naming conventions for variables, functions, and files.
- Avoid generating code that is overly complex or difficult to understand.
- Ensure that the generated code is well-documented and self-explanatory.
- Keep generated code minimal, modular, and reusable.
- Avoid generating code that is overly specific to a particular use case.
- Ensure that the generated code is well-structured and easy to read.

## Code Safety Requirements
- No undefined behavior.
- No memory leaks.
- No floating-point issues.
- Use Rust's ownership and borrowing system to ensure memory safety.
- Avoid using `unsafe` code unless absolutely necessary and document its use.

## Build and Configuration Files
- Use UTF-8 encoding for all build and configuration files.
- Ensure all Rust source files are saved in UTF-8 encoding.

## Environment Setup
Required environment variables:
```bash
LANG=en_AU.ISO8859-1
LC_ALL=en_AU.ISO8859-1
CHARSET=UTF-8
```

## Web Development Standards
- **HTML5**: Use HTML5 for web development.
- **CSS3**: Use CSS3 for styling.
- **ECMAScript 2018 (ES9)**: Use ES9 for JavaScript.

## Native Web-Apis

Prioritse use of native web-apis and integration:

### Compatible Browser APIs
1. **Canvas API** - For rendering graphics, charts, or custom visualizations.
2. **Clipboard API** - To enable copy-paste functionality in a secure and user-friendly way.
3. **Console API** - For debugging and logging.
4. **Fetch API** - For making network requests.
5. **File API** - To handle file uploads and processing.
6. **Fullscreen API** - To enable fullscreen mode for elements.
7. **Geolocation API** - For location-based features.
8. **Intersection Observer API** - To detect visibility of elements (e.g., lazy loading).
9. **Media Capabilities API** - To assess media playback capabilities.
10. **MediaStream Recording API** - For recording audio/video streams.
11. **Page Visibility API** - To detect if the page is visible to the user.
12. **Pointer Lock API** - For immersive pointer controls (e.g., games or visualizations).
13. **Resize Observer API** - To monitor changes in element sizes.
14. **Service Worker API** - For offline capabilities and background tasks.
15. **Storage API** - To handle client-side storage efficiently.
16. **Streams API** - For working with streaming data.
17. **URL API** - To manipulate and parse URLs.
18. **Web Animations API** - For smooth animations.
19. **Web Crypto API** - For cryptographic operations.
20. **WebRTC API** - For real-time communication.
21. **WebSocket API** - For two-way communication with servers.
22. **Web Storage API** - For session or local storage needs.

### Considerations
- Ensure all chosen APIs align with your encoding requirements (UTF-8).
- Avoid experimental or non-standard APIs unless absolutely necessary.
- Test compatibility across target browsers to maintain portability and cross-platform functionality.

### Rust Code Styling Standards and Guidelines (2018 Edition)

#### **Code Structure**
- **Modularity**: Organize code into modules with clear boundaries.
- **Separation of Concerns**: Separate logic, data definitions, and tests into distinct modules.
- **File Organization**: Use `src/main.rs` for the main executable and `src/lib.rs` for libraries.
- **Reusability**: Write minimal and reusable components.

#### **Formatting Style**
- Use `rustfmt` to enforce consistent formatting:
  - Install with `rustup component add rustfmt`.
  - Format code with `cargo fmt`.
- Default settings for `rustfmt` align with the official Rust style guide:
  - **Indentation**: 4 spaces per level.
  - **Line Length**: 100 characters (configurable via `.rustfmt.toml`).
  - **Braces**: Use K&R style (brace on the same line as the function or control structure).

#### **Naming Conventions**
- **Variables**: Use snake_case (e.g., `file_name`, `user_data`).
- **Functions**: Use snake_case (e.g., `process_input`, `get_user_data`).
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_BUFFER_SIZE`, `DEFAULT_TIMEOUT`).
- **Structs and Enums**: Use PascalCase (e.g., `User`, `HttpResponse`).
- **Traits**: Use PascalCase (e.g., `Read`, `Write`).
- **Lifetimes**: Use single lowercase letters prefixed by an apostrophe (e.g., `'a`, `'b`).

#### **Guidelines for `rustfmt` Configuration**
Create a `.rustfmt.toml` file in the root of your project for customization:
```toml
max_width = 100               # Limit line length to 100 characters.
hard_tabs = false             # Use spaces instead of tabs.
use_small_heuristics = "max"  # Optimize formatting for smaller constructs.
newline_style = "unix"        # Use LF for line endings.
brace_style = "SameLineWhere" # Keep braces on the same line for control blocks.
```

#### **Coding Standards**
- **Clarity**: Write self-explanatory and concise code.
- **Immutability**: Prefer immutable variables unless mutability is required.
- **Error Handling**: Use `Result` and `Option` types for robust error management.
- **Ownership**: Leverage Rust's ownership system to ensure memory safety.
- **Documentation**: Add `///` comments for public items and `//!` for module-level documentation.
- **Testing**: Include unit tests in the same file using the `#[cfg(test)]` attribute.

#### **Ensuring `rustfmt` Adherence**
- Add `cargo fmt --check` to your CI pipeline to enforce formatting.
- Run `cargo fmt` as a pre-commit hook using a tool like `pre-commit` or `husky`.

## Rocket Web Framework Guidelines

### Version and Dependencies
Add to `Cargo.toml`:
```toml
[dependencies]
rocket = "0.5.0"
rocket_contrib = "0.5.0"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

### Project Structure for Rocket
```
src/
    main.rs             # Application entry point
    routes/             # Route handlers
        mod.rs          # Module declarations
        auth.rs         # Authentication routes
        api.rs          # API routes
        static.rs       # Static file routes
    models/             # Data models
        mod.rs
        user.rs
        session.rs
    guards/             # Request guards
        mod.rs
        auth.rs
        rate_limit.rs
    fairings/          # Fairings (middleware)
        mod.rs
        cors.rs
        logging.rs
    config/            # Configuration
        mod.rs
        app_config.rs
    errors/            # Error handling
        mod.rs
        handlers.rs
    db/               # Database interactions
        mod.rs
        connection.rs
    services/         # Business logic
        mod.rs
        user_service.rs
```

### Rocket Configuration
Create `Rocket.toml` in project root:
```toml
[debug]
address = "localhost"
port = 8000
workers = 4
keep_alive = 5
log_level = "normal"
limits = { forms = 32768 }

[release]
address = "0.0.0.0"
port = 8000
workers = 16
keep_alive = 5
log_level = "critical"
limits = { forms = 32768 }

[global.databases]
sqlite_db = { url = "db/database.db" }
```

### Coding Standards for Rocket

#### Route Handlers
- Use semantic route names
- Group related routes in modules
- Implement proper error handling
```rust
#[get("/users/<id>")]
async fn get_user(id: i32) -> Result<Json<User>, Status> {
    // Implementation
}
```

#### Request Guards
- Use for authentication and authorization
- Implement custom guards for specific requirements
```rust
#[derive(Debug)]
struct ApiKey(String);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for ApiKey {
    type Error = ();
    // Implementation
}
```

#### State Management
- Use Rocket managed state for application-wide data
- Implement thread-safe state management
```rust
#[derive(Default)]
struct AppState {
    // State fields
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(AppState::default())
        .mount("/", routes![...])
}
```

#### Error Handling
- Use custom error types
- Implement proper error responses
```rust
#[derive(Debug, Responder)]
enum ApiError {
    #[response(status = 404)]
    NotFound(String),
    #[response(status = 400)]
    BadRequest(String),
    // Other error variants
}
```

#### Fairings
- Use for cross-cutting concerns
- Implement custom middleware
```rust
#[derive(Default)]
struct RequestTimer;

#[rocket::async_trait]
impl Fairing for RequestTimer {
    // Implementation
}
```

### Security Best Practices
- Enable CSRF protection
- Use secure headers
- Implement rate limiting
- Use HTTPS in production
- Sanitize user input
- Use secure session management

### Performance Guidelines
- Use async/await for I/O operations
- Implement proper caching strategies
- Use connection pooling for databases
- Configure appropriate worker count
- Optimize static file serving

### Testing
```rust
#[cfg(test)]
mod tests {
    use rocket::http::Status;
    use rocket::local::blocking::Client;

    #[test]
    fn test_hello_world() {
        let client = Client::tracked(rocket()).expect("valid rocket instance");
        let response = client.get("/").dispatch();
        assert_eq!(response.status(), Status::Ok);
    }
}
```

## Example structure
```
.                            # Project root
.editorconfig                # Editor configuration file
.gitattributes               # Git attributes file
.gitignore                   # Git ignore file
.gitmodules                  # Git submodules file
LICENSE                      # License must stay in root
README.md                    # Quick start guide stays in root
CHANGELOG.md                 # Version history stays in root
VERSION                      # Version info stays in root
web-app.rsode-workspace       # VS Code workspace file
.github/                     # GitHub-specific configuration
    copilot-instructions.md  # Instructions for GitHub Copilot
    ISSUE_TEMPLATE/          # Issue templates
        feature_request.md   # Feature request template
        bug_report.md        # Bug report template
    workflows/               # GitHub Actions workflows
        build.yml            # Build automation workflow
    PULL_REQUEST_TEMPLATE.md # Pull request template
    dependabot.yml           # Dependabot configuration
    FUNDING.yml              # Sponsorship information
    CODEOWNERS               # Code owners for review
.vscode/                     # VS Code-specific configuration
    extensions.json          # Recommended extensions
    launch.json              # Debug configurations
    tasks.json               # Task configurations
    settings.json            # Editor settings
.devcontainer/               # Development container configuration
    devcontainer.json        # Container settings
    Containerfile            # Container setup
Cargo.toml             # Configuration file for the project
Cargo.lock             # Auto-generated, locks dependencies to specific versions
target/                # Compiled artifacts (build output)
	debug/             # Debug build outputs
	release/           # Release build outputs
archive/                     # Archive root directory
    releases/                # Version-controlled archives
        app-1.2.3.tar.gz     # Major.Minor.Patch version
        app-1.2.4.tar.gz     # Patch update version
        app-2.0.0.tar.gz     # Major version update
    by-date/                 # Date-based archives
        app-20240314.tar.gz  # Daily archive (YYYYMMDD)
        app-202403.tar.gz    # Monthly archive (YYYYMM)
        app-2024Q1.tar.gz    # Quarterly archive
    deprecated/              # Deprecated code archive
        feature-v1-deprecated.rs # Deprecated features
        module-old-202403.rs  # Date-tagged old code
backup/                      # Backup directory
    daily/                   # Daily backups
        app-20240314.tar.gz  # Full application backup
        db-20240314.sql.gz   # Database backup
    weekly/                  # Weekly backups
        app-2024W11.tar.gz   # Week 11 backup
    monthly/                 # Monthly backups
        app-202403.tar.gz    # March 2024 backup
    config/                  # Configuration backups
        web.rsonf.bak         # Simple backup
        web.rsonf.1           # Versioned backup
        web.rsonf.old         # Previous version
    pre-update/              # Pre-update backups
        app-1.2.3-pre.tar.gz # Pre-update app backup
        config-1.2.3-pre.tar.gz # Pre-update config
bin/                         # Executable files and scripts
    enssol                   # Main application binary
config/                      # Configuration files and settings
    app/                     # Application configuration
        app.env              # Environment variables
        app.rsonf            # Core app settings (INI-style)
        user.rsonf           # User preferences (INI-style)
    auth/                    # Authentication configuration
        passwd              # User accounts (Unix standard) 
        shadow              # Password hashes (Unix standard)
    security/               # Security settings
        acl.rsonf            # Access Control Lists
        auth.rsonf           # Authentication rules
        ssl.rsonf            # SSL/TLS configuration 
        headers.rsonf        # Security headers
        csp.rsonf            # Content Security Policy
    build/                  # Build configurations
        deps.txt                # Project dependencies
.well-known/            # Standard URIs
    acme-challenge/     # ACME verification
        token           # Challenge token
        response        # Challenge response
charset/                     # Character encoding configs
    UTF-8.map           # Maps UTF-8 characters to their binary values
checksums/                   # Directory for checksum files
    release.sha256           # SHA-256 checksum for release files
    release.md5              # MD5 checksum for release files
    libs.sha256              # SHA-256 checksum for libraries
docs/                        # Project documentation root
    api/                     # API documentation directory
        API.md               # Complete API reference and documentation
    user/                    # End-user documentation directory
        USER_GUIDE.md        # Complete guide for end users
        INSTALL.md           # Installation instructions
        FAQ.md               # Frequently asked questions
        SUPPORT.md           # Support information and contact details
    dev/                     # Developer documentation directory
        DEVELOPER_GUIDE.md   # Guide for developers
        CONTRIBUTING.md      # Guidelines for contributing
        HACKING              # Technical details (plain text)
        EXAMPLES.md          # Code examples and usage samples
    project/                 # Project management documentation
        AUTHORS.md           # List of project authors and contributors
        MAINTAINERS          # Current project maintainers (plain text)
        ROADMAP.md           # Future development plans
        TODO.md              # Pending tasks and features
        NEWS                 # Project news and release notes (plain text)
    security/                # Security documentation
        SECURITY.md          # Security policies and procedures
        CODE_OF_CONDUCT.md   # Project code of conduct
    technical/               # Technical documentation (plain text)
        project-index.json    # Index of project documentation
        project-structure.json # Details of project architecture
        specfile.spec        # Project specifications
        DOCUMENTATION.md     # General technical documentation
man/                         # Unix manual pages
    man1/                    # User commands
        webapp.1             # Web application user manual
    roff/                    # Library functions
        libwebapp.3          # Web application library functions
static/                      # Public web root
    index.html              # Main entry point
    robots.json           # Search engine directives
    sitemap.xml           # Site structure for SEO
    web.xml               # Web app manifest (XML format)
    weblinks.json         # App links (plain text)
    manifest.json
    security.txt            # Security info
    service-worker.js
    assets/                 # Core assets
        js/                  # JavaScript files
            main.js         # Main JS file
            utils.js        # Utility JS functions
            api/
            	canvas-api.js            # For Canvas API functionality
            	clipboard-api.js         # For Clipboard API functionality
            	console-api.js           # For Console API usage
            	fetch-api.js             # For Fetch API usage
            	file-api.js              # For File API handling
            	fullscreen-api.js        # For Fullscreen API handling
            	geolocation-api.js       # For Geolocation API usage
            	intersection-observer-api.js # For Intersection Observer API
            	media-capabilities-api.js # For Media Capabilities API
            	media-stream-recording-api.js # For MediaStream Recording API
            	page-visibility-api.js   # For Page Visibility API
            	pointer-lock-api.js      # For Pointer Lock API
            	resize-observer-api.js   # For Resize Observer API
            	service-worker-api.js    # For Service Worker API
            	storage-api.js           # For Storage API handling
            	streams-api.js           # For Streams API usage
            	url-api.js               # For URL API manipulation
            	web-animations-api.js    # For Web Animations API
            	web-crypto-api.js        # For Web Crypto API
            	webrtc-api.js            # For WebRTC API
            	websocket-api.js         # For WebSocket API
            	web-storage-api.js       # For Web Storage API
        css/                 # CSS files
            main.css         # Main CSS file
            styles.css      # Additional styles
        images/             # Image assets by type
            interface/      # Interface elements
                buttons/    # Button elements
                    standard/
                        std-normal.webp
                        std-hover.webp
                        std-active.webp
                        std-disabled.webp
                    interactive/
                        int-normal.webp
                        int-hover.webp
                        int-active.webp
                        int-disabled.webp
                symbols/    # Symbol elements
                    navigation/
                        nav-home.webp
                        nav-about.webp
                        nav-products.webp
                        nav-contact.webp
                    indicators/
                        ind-success.webp
                        ind-error.webp
                        ind-warning.webp
                        ind-info.webp
                    operations/
                        op-edit.webp
                        op-delete.webp
                        op-save.webp
                        op-cancel.webp
                structural/     # Structural images
                    headerarea/
                        hdr-default.webp
                        hdr-alternate.webp
                        hdr-print.webp
                    mainarea/
                        main-default.webp
                        main-alternate.webp
                    footerarea/
                        ftr-default.webp
                        ftr-alternate.webp
                formcontrols/  # Form controls
                    checkboxes/
                        chk-empty.webp
                        chk-marked.webp
                        chk-inactive.webp
                    radiobuttons/
                        rad-empty.webp
                        rad-marked.webp
                        rad-inactive.webp
                    dropdowns/
                        dd-arrow.webp
                        dd-inactive.webp
                ornaments/      # Visual elements
                    dividers/
                        div-horizontal.webp
                        div-vertical.webp
                    markers/
                        mrk-primary.webp
                        mrk-secondary.webp
                    directional/
                        dir-next.webp
                        dir-prev.webp
                        dir-up.webp
                        dir-down.webp
            media/              # Content images
                companyinfo/
                    team-photo.webp
                    office-view.webp
                    mission-graphic.webp
                catalog/
                    item1/
                        item1-preview.webp
                        item1-large.webp
                        item1-specs.webp
                    item2/
                        item2-preview.webp
                        item2-large.webp
                        item2-specs.webp
                promotional/
                    homepage/
                        promo-desktop.webp
                        promo-mobile.webp
                    seasonal/
                        season-spring.webp
                        season-summer.webp
                        season-autumn.webp
                        season-winter.webp
                identity/       # Brand assets
                    brandmarks/
                        logo-primary.webp
                        logo-print.webp
                        logo-compact.webp
                    siteicons/
                        icon-default.ico
                        icon-small.ico
                        icon-large.ico
    views/                  # All HTML views/pages
        pages/              # Dynamic pages
            w6946.html         # W6946 project page
            scjv.html          # SCJV project page  
            ms1180.html        # MS1180 project page
            profile.html       # User profile page
            dashboard.html     # Main dashboard
            audit.html         # Audit log viewer
            crud_profile.html  # User profile management
            crud_scjv.html     # SCJV records management
            crud_ms1180.html   # MS1180 records management 
            crud_w6946.html    # W6946 records management
    content/            # Static data
        menuitems/      # Navigation data
            menu-main.json
            menu-footer.json
            menu-sitemap.json
        notifications/  # System messages
            msg-error.json
            msg-success.json
            msg-info.json
        items/          # Content data
            item-products.json
            item-services.json
            item-faq.json
        descriptors/    # Metadata
            meta-pages.json
            meta-images.json
            meta-files.json
        config/             # New configuration directory
            forms/
                field-definitions.json     # Field types and attributes
                validation-rules.json      # Input validation rules
                form-states.json           # Form state definitions
            ui/
                state-mappings.json        # UI state configurations  
                component-states.json      # Component state definitions
                layout-configs.json        # Layout configurations
            routing/
                route-mappings.json        # URL to view mappings
                redirect-rules.json        # Redirection rules
            errors/
                error-mappings.json        # Error code to message maps
                validation-messages.json    # Field validation messages
            compat/
                browser-checks.json        # Browser feature tests
                fallback-rules.json        # Fallback behavior rules
scripts/                      # Build automation and utility scripts
    build/                     # Build-related scripts
        configure              # Project configuration script
        build.sh              # Main build script
        make-dist.sh          # Create distribution package
        make-debug.sh         # Create debug build
        make-release.sh       # Create release build
        install.sh            # Installation script
        clean.sh              # Cleanup script
        test.sh               # Test runner script
    config/                   # Configuration scripts
        mkdirs.sh            # Script to create installation dirs
    install/                  # Installation scripts
        install-deps.sh       # Install dependencies
        install-tools.sh      # Install dev tools
        post-install.sh       # Post-installation tasks
    utils/                    # Utility scripts
        gen-docs.sh          # Generate documentation
        check-style.sh       # Code style checker
        sync-test.sh         # Sync test data
        run-tests.sh         # Test execution
    public/                   # Public directory scripts
        update-assets.sh      # Update public assets
        update-views.sh       # Update HTML templates
        update-data.sh        # Update data files
middleware/                   # Middleware scripts
    compile/                  # Compilation scripts
        compile-core.sh       # Core server functionality
        compile-http.sh       # HTTP protocol handling
        compile-utils.sh      # Utility functions
        compile-main.sh       # Main entry point
        compile-constants.sh  # Global constants
    system/                   # System-related scripts
        compile-structs.sh    # Structure definitions
        compile-data.sh       # Data operations
        compile-error.sh      # Error handling
        compile-validation.sh # Validation functions
        compile-memory.sh     # Memory management
        compile-threading.sh  # Thread management
        compile-io.sh         # I/O operations
        compile-cache.sh      # Cache management
        compile-garbage.sh    # Garbage collection
        compile-system.sh     # System init and cleanup
        compile-logging.sh    # Logging operations
        compile-monitoring.sh # System monitoring
    network/                  # Network-related scripts
        compile-network.sh    # Network management
        compile-database.sh   # Database management
        compile-filesystem.sh # File system operations
    security/                 # Security-related scripts
        compile-auth.sh       # User authentication
        compile-encryption.sh # Data encryption/decryption
        compile-permissions.sh # Permission management
    config/                   # Configuration scripts
        compile-config.sh     # Config management
        compile-sysconfig.sh  # System configuration
    data/                     # Data-related scripts
        compile-encoding.sh   # Data encoding/decoding
        compile-recutils.sh   # Recutils operations
        compile-archive.sh    # Archive management
        compile-backup.sh     # Backup management
        compile-checksum.sh   # Checksum calculation
        compile-db.sh         # Database operations
    process/                  # Process management
        compile-process.sh    # Process management
        compile-systeminfo.sh # System information
    var/                      # Variable data scripts
        update-records.sh     # Update system records
        update-logs.sh        # Update logging files
        update-runtime.sh     # Update runtime data
        update-state.sh       # Update app state
        update-queue.sh       # Update message queues
        update-exports.sh     # Update data exports
private/                     # Private files and data
    ssl/                     # SSL certificates and keys
        certs/               # SSL certificates
            server.rsrt       # SSL certificate
            server.key       # SSL private key
tmp/                            # Temporary files
    build/                      # Build-related temporary files
        tmp-build-*.log      # Build process logs
        tmp-make-*.out       # Make process output
pid/                     # Process ID files
    app-*.pid            # Running application PIDs
    worker-*.pid         # Worker process PIDs
src/
    main.rs             # Application entry point
    routes/             # Route handlers
        mod.rs          # Module declarations
        auth.rs         # Authentication routes
        api.rs          # API routes
        static.rs       # Static file routes
    models/             # Data models
        mod.rs
        user.rs
        session.rs
    guards/             # Request guards
        mod.rs
        auth.rs
        rate_limit.rs
    fairings/          # Fairings (middleware)
        mod.rs
        cors.rs
        logging.rs
    config/            # Configuration
        mod.rs
        app_config.rs
    errors/            # Error handling
        mod.rs
        handlers.rs
    db/               # Database interactions
        mod.rs
        connection.rs
    services/         # Business logic
        mod.rs
        user_service.rs
tests/
    main.rs             # Application entry point
    routes/             # Route handlers
        mod.rs          # Module declarations
        auth.rs         # Authentication routes
        api.rs          # API routes
        static.rs       # Static file routes
    models/             # Data models
        mod.rs
        user.rs
        session.rs
    guards/             # Request guards
        mod.rs
        auth.rs
        rate_limit.rs
    fairings/          # Fairings (middleware)
        mod.rs
        cors.rs
        logging.rs
    config/            # Configuration
        mod.rs
        app_config.rs
    errors/            # Error handling
        mod.rs
        handlers.rs
    db/               # Database interactions
        mod.rs
        connection.rs
    services/         # Business logic
        mod.rs
        user_service.rs
cache/                   # Cache directory
    tmp-cache-*.dat      # Temporary cache data
    tmp-index-*.idx      # Cache indices
var/                         # Variable data directory
    records/                 # System records
        obligation_number.txt # Obligation number
        group-1234.json       # Group record
        user-1234.json        # User record
        trans-w6946.json      # Transaction record
        trans-scjv.json       # Transaction record
        trans-ms1180.json     # Transaction record
        schema-v1.json       # Schema descriptor
        test-data.json        # Test data
    log/                     # Logging root directory
        web/                 # Web server logs
            access-YYYY-MM-DD.log # Daily access logs
            error-YYYY-MM-DD.log  # Daily error logs
            events-YYYY-MM-DD.log # Combined daily events
        app/                 # Application logs
            app_core.log     # Core application logs
            app_debug.log    # Debug information
            app_audit.log    # Application audit trail
        security/            # Security logs
            auth-YYYY-MM-DD.log # Daily authentication logs
            audit-YYYY-MM-DD.log # Daily security audit
            incident-YYYY-MM-DD.log # Security incidents
        system/              # System logs
            daemon.log       # Daemon activities
            kernel.log       # Kernel messages
            cron.log         # Scheduled tasks
    data/                    # Application data directory
        runtime/             # Runtime data files
            cache/           # Cache files
                *.rsache      # Temporary cached content
                index.dat    # Cache index file
            sessions/        # Session data
                sess_*       # Session files by ID
                sessions.idx # Session index
        state/               # Application state
            counters/        # Counter files
                req_count.dat # Request counter
                hits.dat     # Hit counter
            flags/           # Flag files
                maint.flag   # Maintenance mode flag
                debug.flag   # Debug mode flag
            locks/           # Lock files
                app.lock     # Application lock
                proc.lock    # Process lock
        queue/               # Message queues
            incoming/        # Incoming messages
                msg-*.in     # Incoming message files
                in.idx       # Incoming index
            outgoing/        # Outgoing messages
                msg-*.out    # Outgoing message files
                out.idx      # Outgoing index
db/                      # Database files
    database.pdb           # Main database
exports/                 # Data exports
    data-20240314.json    # DB dump with date
    data-20240314.json    # JSON export with date
```

### Rust Project
1. **Create a Rust Project**:
   - On your host machine, create a new Rust project:
     ```bash
     cargo new my_project
     ```
   - Add the required crates as dependencies in the `Cargo.toml` file:
     ```toml
     [dependencies]
     roff = "0.2.2"
     encoding_rs = "0.8.35"
     tiny_http = "0.12.0"
     polodb_core = "5.1.3"
     ```

2. **Copy Project Files into the Container**:
   - Copy the `Cargo.toml`, `Cargo.lock`, and `src/` directory into the Docker image.

3. **Build the Project**:
   - The `cargo build --release` command will compile your project and include the dependencies.

4. **Run the Final Executable**:
   - The compiled binary will be located in the `target/release/` directory. You can adjust the Dockerfile to copy or execute this binary as needed.

### Key Notes
- The `cargo install` command is only suitable for crates with binaries (e.g., `ripgrep`, `fd`).
- For libraries, you must use them within a Rust project.
- Ensure that the `Cargo.toml` and `src` directory structure matches the expectations of your project.
