# NotTofu Test Examples

This directory contains example test scripts that demonstrate how to use the NotTofu platform to track and manage test results.

## Overview

These examples show different approaches to integrating with NotTofu:

- Simple test: Basic test with phases and measurements
- Complex test: More advanced test with detailed reporting
- Motor test: Domain-specific test for motor hardware
- Batch runner: A tool to run multiple tests in sequence

## Requirements

- Python 3.7+
- NotTofu server running (backend API)
- Required Python packages:
  - `requests`
  - `argparse`

## Directory Structure

- `test_samples/`: Individual test example scripts
  - `simple_test.py`: A basic test example
  - `complex_test.py`: A more advanced test example with detailed reporting
  - `hw_motor_test.py`: A simulated hardware test for motors
- `batch_test_runner.py`: A utility to run multiple tests in sequence
- `reports/`: Generated test reports (will be created when running tests)

## Running the Examples

Make sure the NotTofu backend server is running:

```bash
# Start the NotTofu backend
cd .. && python -m uvicorn app.main:app --reload  # Runs on port 8000
```

### Running Individual Tests

```bash
# Simple test
python examples/test_samples/simple_test.py

# Complex test
python examples/test_samples/complex_test.py --device-id DEV123 --serial SN456

# Motor test
python examples/test_samples/hw_motor_test.py --rpm 4000
```

### Running Batch Tests

```bash
# Run 5 tests (mix of simple and complex)
python examples/batch_test_runner.py --count 5 --name "Daily-Test-Batch"

# Run only motor tests
python examples/batch_test_runner.py --count 3 --types "motor" --name "Motor-Batch"
```

## Customizing Tests

You can customize the tests by:

1. Modifying the example files
2. Creating new test scripts based on the examples
3. Adding more test phases or measurements

## Viewing Results

After running the tests:

1. Check the NotTofu web interface to see the test runs
2. Look in the `reports/` directory for JSON test reports
3. Review the console output for test status and measurements

## Integration Points

These examples demonstrate several ways to integrate with NotTofu:

- Using the REST API to create test runs and report results
- Generating detailed test reports in JSON format
- Structuring tests with phases and measurements
- Implementing different test types for specific domains

## Next Steps

After exploring these examples, you might want to:

1. Create your own test scripts for your specific needs
2. Integrate NotTofu with your existing test infrastructure
3. Automate test runs as part of your CI/CD pipeline 