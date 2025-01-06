# Testing Guide

## Unit Testing
1. **Write Unit Tests**:
   - Place tests in the same file as the code
   - Use `#[cfg(test)]` module attribute

2. **Run Unit Tests**:
   ```sh
   cargo test
   ```

## Integration Testing
1. **Write Integration Tests**:
   - Place tests in `tests/` directory
   - Create separate files for different test suites

2. **Run Integration Tests**:
   ```sh
   cargo test --test '*'
   ```

## Performance Testing
1. **Write Benchmarks**:
   - Use criterion for benchmarking
   - Place benchmarks in `benches/` directory

2. **Run Benchmarks**:
   ```sh
   cargo bench
   ```

## Security Testing
1. **Static Analysis**:
   ```sh
   cargo clippy
   ```

2. **Run Security Audit**:
   ```sh
   cargo audit
   ```

## Continuous Integration
- Tests run automatically via GitHub Actions on push and pull requests
