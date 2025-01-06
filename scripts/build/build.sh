#!/bin/sh
set -e

# Config
CARGO="${CARGO:-cargo}"
RUSTC="${RUSTC:-rustc}"
RUSTUP="${RUSTUP:-rustup}"

# Source common functions
. "$(dirname "$0")/common.sh"

log_info "Starting build process"

# Check rust toolchain
check_rust_toolchain() {
    log_info "Checking Rust toolchain..."
    $RUSTUP show || {
        log_error "Rust toolchain check failed"
        exit 1
    }
}

# Build process
build_project() {
    log_info "Building project..."
    $CARGO build --release || {
        log_error "Build failed"
        exit 1
    }
}

# Run tests
run_tests() {
    log_info "Running tests..."
    $CARGO test || {
        log_error "Tests failed"
        exit 1
    }
}

main() {
    check_rust_toolchain
    build_project
    run_tests
    log_info "Build completed successfully"
}

main "$@"
