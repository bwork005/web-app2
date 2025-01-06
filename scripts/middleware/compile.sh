#!/bin/sh
set -e

# Source common functions

. "$(dirname "$0")/../build/common.sh"

# Config
MIDDLEWARE_DIR="src/middleware"
OUTPUT_DIR="target/middleware"

compile_auth() {
    log_info "Compiling authentication middleware..."
    $RUSTC "${MIDDLEWARE_DIR}/auth/mod.rs" --out-dir "${OUTPUT_DIR}/auth" || {
        log_error "Auth compilation failed"
        return 1
    }
}

compile_api() {
    log_info "Compiling API middleware..."
    $RUSTC "${MIDDLEWARE_DIR}/api/mod.rs" --out-dir "${OUTPUT_DIR}/api" || {
        log_error "API compilation failed"
        return 1
    }
}

main() {
    mkdir -p "${OUTPUT_DIR}"
    compile_auth
    compile_api
    log_info "Middleware compilation completed"
}

main "$@"
