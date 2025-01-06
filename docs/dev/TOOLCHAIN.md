# Toolchain

## Core Build Tools

### Rust Compiler
- **rustc**: The Rust compiler
  - **Edition**: 2021
  - **Target**: Cross-platform compilation
  - **Optimization**: Release builds use -O3

### Package Manager
- **Cargo**: Package manager and build system
  - **Commands**:
    - `cargo build --release`: Production build
    - `cargo build`: Development build
    - `cargo test`: Run test suite
    - `cargo clean`: Clean artifacts

## Development Tools

### IDE and Language Support
- **VS Code**: Primary IDE
- **rust-analyzer**: Language server protocol implementation
- **rustfmt**: Code formatting
- **clippy**: Linting and static analysis

## Core Dependencies

### Web Framework & Server
- **tiny-http (0.12)**: Lightweight HTTP server
- **stdweb (0.4)**: WebAssembly and JS interop

### Security and Encoding
- **orion (0.17)**: Pure Rust cryptography
- **data-encoding (2.3)**: Data encoding/decoding
- **tiny-keccak (2.0)**: SHA-3 hashing
- **simdutf8 (0.1)**: SIMD-accelerated UTF-8 validation

### Runtime & Async
- **async-std (1.12)**: Lightweight async runtime

### Core Utilities
- **indexmap (2.0)**: Ordered hash maps/sets
- **smol_str (0.2)**: Small-string optimization
- **spin (0.9)**: Minimal synchronization primitives
- **anyhow (1.0)**: Error handling

### Storage & Database
- **pickledb (0.5)**: Lightweight key-value store

### Logging & Monitoring
- **log (0.4)**: Logging facade
- **env_logger (0.10)**: Environment-based logging

### Data Processing
- **miniserde (0.1)**: Minimal serialization

### Documentation
- **man (0.3)**: Man page generation

### Testing Tools
- **bencher (0.1)**: Lightweight benchmarking

## Version Control
- **Git**: Source control
  - Branch Strategy: GitFlow
  - Commit Format: `[Type] Description`

## Continuous Integration
- **GitHub Actions**: CI/CD pipeline
  - Build verification
  - Test execution
  - Code quality checks

## Security Tools
- **cargo-audit**: Security auditing
- **cargo-crev**: Code review
