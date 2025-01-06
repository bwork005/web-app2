#!/bin/sh
set -e

# Source common functions
. "$(dirname "$0")/../build/common.sh"

# Config
METRICS_FILE="/var/log/middleware/metrics.log"
ALERT_THRESHOLD=90

monitor_performance() {
    log_info "Monitoring middleware performance..."
    mkdir -p "$(dirname "$METRICS_FILE")"

    while true; do
        CPU_USAGE=$(ps -p $(pgrep bridge) -o %cpu | tail -n1)
        MEM_USAGE=$(ps -p $(pgrep bridge) -o %mem | tail -n1)

        printf "%s CPU: %s%% MEM: %s%%\n" "$(date '+%Y-%m-%d %H:%M:%S')" \
            "$CPU_USAGE" "$MEM_USAGE" >> "$METRICS_FILE"

        if [ "${CPU_USAGE%.*}" -gt "$ALERT_THRESHOLD" ]; then
            log_warn "High CPU usage detected: $CPU_USAGE%"
        fi

        sleep 60
    done
}

main() {
    monitor_performance
}

main "$@"
