#!/usr/bin/env python3
"""
Batch Test Runner for NotTofu

This script demonstrates how to run multiple tests in batch mode
and record the results in the NotTofu platform.

Usage:
    python batch_test_runner.py [--count N] [--config CONFIG_FILE]
"""

import os
import sys
import time
import random
import json
import argparse
import subprocess
from datetime import datetime

# Add the examples directory to the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import from test samples
from test_samples.simple_test import run_fake_test
from test_samples.complex_test import run_complex_test

class BatchRunner:
    """Class to manage batch test execution."""
    
    def __init__(self, batch_name=None, config_file=None):
        """Initialize the batch runner."""
        self.batch_name = batch_name or f"Batch-{int(time.time())}"
        self.config_file = config_file
        self.start_time = time.time()
        self.end_time = None
        self.results = {
            "tests": [],
            "summary": {
                "total": 0,
                "passed": 0,
                "failed": 0,
                "errors": 0
            }
        }
        
        # Load configuration if provided
        self.config = {}
        if config_file and os.path.exists(config_file):
            with open(config_file, "r") as f:
                self.config = json.load(f)
    
    def run_test(self, test_type, params=None):
        """Run a single test of the specified type with parameters."""
        params = params or {}
        start_time = time.time()
        test_result = {
            "type": test_type,
            "params": params,
            "start_time": datetime.fromtimestamp(start_time).isoformat(),
            "status": "UNKNOWN"
        }
        
        try:
            print(f"\n{'='*80}")
            print(f"📋 Running {test_type} test with parameters: {params}")
            print(f"{'='*80}")
            
            # Run the appropriate test based on type
            if test_type == "simple":
                success = run_fake_test()
            elif test_type == "complex":
                device_id = params.get("device_id")
                serial_number = params.get("serial_number")
                success = run_complex_test(device_id=device_id, serial_number=serial_number)
            elif test_type == "external":
                # Run an external test script
                script_path = params.get("script_path")
                if not script_path:
                    raise ValueError("script_path is required for external tests")
                
                args = [sys.executable, script_path]
                for key, value in params.items():
                    if key != "script_path" and value is not None:
                        args.append(f"--{key}={value}")
                
                print(f"Running external script: {' '.join(args)}")
                process = subprocess.run(args, capture_output=True, text=True)
                success = process.returncode == 0
                
                if not success:
                    print(f"External script failed with code {process.returncode}")
                    print(f"Error output: {process.stderr}")
            else:
                raise ValueError(f"Unknown test type: {test_type}")
            
            # Record the result
            status = "PASSED" if success else "FAILED"
            self.results["summary"]["total"] += 1
            self.results["summary"]["passed" if success else "failed"] += 1
            
        except Exception as e:
            print(f"❌ Error running test: {e}")
            status = "ERROR"
            self.results["summary"]["total"] += 1
            self.results["summary"]["errors"] += 1
        
        end_time = time.time()
        duration = end_time - start_time
        
        # Update the test result
        test_result.update({
            "end_time": datetime.fromtimestamp(end_time).isoformat(),
            "duration": duration,
            "status": status
        })
        
        self.results["tests"].append(test_result)
        print(f"\n📊 Test completed: {status} in {duration:.2f} seconds\n")
        
        return status
    
    def run_batch(self, count=1, test_types=None):
        """Run a batch of tests."""
        test_types = test_types or ["simple", "complex"]
        
        print(f"🧪 Starting batch run: {self.batch_name}")
        print(f"📅 {datetime.now().isoformat()}")
        print(f"📊 Planning to run {count} tests")
        
        for i in range(count):
            # Pick a random test type if multiple types are available
            test_type = random.choice(test_types) if len(test_types) > 1 else test_types[0]
            
            # Generate random parameters for the test
            params = {}
            if test_type == "complex":
                params = {
                    "device_id": f"DEV-BATCH-{i+1}",
                    "serial_number": f"SN-BATCH-{i+1:04d}"
                }
            
            print(f"\n🔄 Running test {i+1} of {count} (type: {test_type})")
            status = self.run_test(test_type, params)
            
            # Optional delay between tests
            if i < count - 1:
                delay = random.uniform(0.5, 2.0)
                print(f"⏱️ Waiting {delay:.1f} seconds before next test...")
                time.sleep(delay)
        
        self.end_time = time.time()
        self.generate_report()
        return True
    
    def generate_report(self, output_dir="reports"):
        """Generate a batch run report."""
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        report = {
            "batch_name": self.batch_name,
            "start_time": datetime.fromtimestamp(self.start_time).isoformat(),
            "end_time": datetime.fromtimestamp(self.end_time).isoformat() if self.end_time else None,
            "duration": (self.end_time - self.start_time) if self.end_time else None,
            "results": self.results
        }
        
        filename = f"{output_dir}/batch_report_{int(self.start_time)}.json"
        
        with open(filename, "w") as f:
            json.dump(report, f, indent=2)
        
        print(f"\n📊 Batch Report generated: {filename}")
        print(f"📈 Summary: {self.results['summary']}")
        
        return filename

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="Run a batch of tests for NotTofu")
    parser.add_argument("--count", type=int, default=3, help="Number of tests to run (default: 3)")
    parser.add_argument("--config", help="Path to a JSON configuration file")
    parser.add_argument("--name", help="Name for this batch run")
    parser.add_argument("--types", help="Comma-separated list of test types to run (default: simple,complex)")
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()
    
    # Parse test types
    test_types = ["simple", "complex"]
    if args.types:
        test_types = args.types.split(",")
    
    # Create batch runner
    runner = BatchRunner(batch_name=args.name, config_file=args.config)
    
    # Run the batch
    print(f"🧪 Starting batch test runner with {args.count} tests")
    start_time = time.time()
    
    success = runner.run_batch(count=args.count, test_types=test_types)
    
    end_time = time.time()
    total_duration = end_time - start_time
    print(f"\n⏱️ Total batch duration: {total_duration:.2f} seconds")
    
    if success:
        print("✅ Batch test run completed successfully")
        sys.exit(0)
    else:
        print("❌ Batch test run failed")
        sys.exit(1) 