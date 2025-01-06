#!/bin/sh
set -e

# Source common functions
. "$(dirname "$0")/../build/common.sh"

BRIDGE_CONFIG="config/bridge.json"
API_PORT=8000

setup_bridge() {
    log_info "Setting up client-server bridge..."
    check_command nc
    check_command curl

    # Check if port is available
    if nc -z localhost $API_PORT 2>/dev/null; then
        log_error "Port $API_PORT is already in use"
        exit 1
    }
}

start_bridge() {
    log_info "Starting bridge on port $API_PORT..."
    $CARGO run --bin bridge -- \
        --config "$BRIDGE_CONFIG" \
        --port "$API_PORT" || {
        log_error "Failed to start bridge"
        exit 1
    }
}

main() {
    setup_bridge
    start_bridge
    log_info "Bridge started successfully"
}

main "$@"
