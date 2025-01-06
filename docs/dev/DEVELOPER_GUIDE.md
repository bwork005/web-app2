# Development Tools

## Core Build Tools

### Rust Toolchain
- **Rust (2021 edition)**: Primary programming language
- **Cargo**: Package manager and build system
- **Rustup**: Toolchain installer

## Development Environment

### IDE Support
- **VS Code**: Primary IDE
- **rust-analyzer**: Language server integration
- **rustfmt**: Code formatter
- **clippy**: Linter

## Core Dependencies

### Web Server & Framework
- **tiny-http (0.12)**: Lightweight HTTP server implementation
- **stdweb (0.4)**: WebAssembly and JavaScript interoperability

### Security & Encoding
- **orion (0.17)**: Pure Rust cryptographic operations
- **data-encoding (2.3)**: Data encoding/decoding utilities
- **tiny-keccak (2.0)**: SHA-3 hashing implementation
- **simdutf8 (0.1)**: SIMD-accelerated UTF-8 validation

### Runtime Support
- **async-std (1.12)**: Lightweight async runtime implementation

### Utility Libraries
- **indexmap (2.0)**: Ordered hash maps and sets
- **smol_str (0.2)**: Small-string optimization
- **spin (0.9)**: Minimal synchronization primitives
- **anyhow (1.0)**: Error handling utilities

### Data Storage
- **pickledb (0.5)**: Lightweight key-value store

### Logging System
- **log (0.4)**: Logging facade
- **env_logger (0.10)**: Environment-based logging

### Data Formats
- **miniserde (0.1)**: Minimal serialization implementation

### Documentation Tools
- **man (0.3)**: Man page generation

### Testing Framework
- **bencher (0.1)**: Lightweight benchmarking

## Version Control
- Git: Source control
  - Branch Strategy: GitFlow
  - Commit Format: `[Type] Description`

## Security Tools
- cargo-audit: Security auditing
- cargo-crev: Code review system
- BearSSL: lightweight SSL/TLS implementation
  - Certificate management and key generation
  - Cryptographic operations and secure communications
  - Optimized for embedded systems
- checksec: Binary security analysis
  - Stack protection verification
  - Security feature validation

## Environment Setup

Required environment variables:
```bash
LANG=en_AU.ISO8859-1
LC_ALL=en_AU.ISO8859-1
CHARSET=UTF-8
```
