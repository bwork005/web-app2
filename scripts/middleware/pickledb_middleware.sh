#!/bin/bash

# Set up environment
DB_DIR="var/db/pickledb"
RECORD_DIR="var/records"
LOG_DIR="var/log"

# Create necessary directories
mkdir -p "$DB_DIR"
mkdir -p "$LOG_DIR"

# Initialize fresh database
rm -f "$DB_DIR/projects.db"

# Import records using Rust binary
cargo run --bin import_records -- \
    --db "$DB_DIR/projects.db" \
    --records "$RECORD_DIR/trans-w6946.rec" \
    --records "$RECORD_DIR/trans-scjv.rec" \
    --records "$RECORD_DIR/trans-ms1180.rec" \
    --log "$LOG_DIR/import.log"

# Verify import
cargo run --bin verify_db -- \
    --db "$DB_DIR/projects.db" \
    --log "$LOG_DIR/verify.log"

echo "Database initialization complete"
