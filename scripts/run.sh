#!/bin/sh

# Ensure we're in the project root
cd "$(dirname "$0")/.." || exit

# Build the project
cargo build

# Run the binary
./target/debug/enssol
