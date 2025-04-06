#!/usr/bin/env python3
"""
Hardware Motor Test Example

This example simulates testing of a motor controller, measuring parameters
like startup time, speed accuracy, current draw, and temperature.

Usage:
    python hw_motor_test.py [--device-id ID] [--serial SERIAL] [--rpm RPM]
"""

import requests
import json
import time
import random
import sys
import argparse
from datetime import datetime

# Base URL for NotTofu API
BASE_URL = "http://localhost:8000"

class MotorTestRun:
    """Class to manage a motor test run."""
    
    def __init__(self, device_id=None, serial_number=None, target_rpm=None):
        """Initialize a motor test run."""
        self.device_id = device_id or f"MOTOR-{int(time.time())}"
        self.serial_number = serial_number or f"SN{int(time.time())}"
        self.target_rpm = target_rpm or 3000
        self.test_run_id = None
        self.start_time = time.time()
        self.end_time = None
        self.phases = []
        self.measurements = {}
    
    def create_test_run(self):
        """Create the test run in NotTofu."""
        url = f"{BASE_URL}/test-runs/"
        
        payload = {
            "name": f"Motor Test - {self.serial_number}",
            "uut_id": self.device_id,
            "uut_serial": self.serial_number,
            "meta_data": {
                "target_rpm": self.target_rpm,
                "test_type": "Motor Qualification",
                "firmware_version": "2.5.1",
                "hardware_version": "4.2"
            }
        }
        
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
            self.test_run_id = result["id"]
            print(f"✅ Created motor test run (ID: {self.test_run_id})")
            return True
        except requests.exceptions.RequestException as e:
            print(f"❌ Error creating test run: {e}")
            return False
    
    def test_motor_startup(self):
        """Run the motor startup test phase."""
        print("\n🔄 Running motor startup test...")
        
        # Simulate startup test
        time.sleep(2)
        
        startup_time = random.uniform(0.8, 1.5)  # 0.8 to 1.5 seconds
        current_spike = random.uniform(1.5, 2.5)  # 1.5 to 2.5 Amps
        
        self.measurements["startup_time"] = {
            "value": startup_time,
            "unit": "s",
            "limits": {"max": 1.2},
            "status": "PASS" if startup_time <= 1.2 else "FAIL"
        }
        
        self.measurements["startup_current"] = {
            "value": current_spike,
            "unit": "A",
            "limits": {"max": 2.0},
            "status": "PASS" if current_spike <= 2.0 else "FAIL"
        }
        
        startup_status = "PASSED"
        if startup_time > 1.2 or current_spike > 2.0:
            startup_status = "FAILED"
        
        self.phases.append({
            "name": "Motor Startup",
            "status": startup_status,
            "measurements": {
                "startup_time": self.measurements["startup_time"],
                "startup_current": self.measurements["startup_current"]
            }
        })
        
        print(f"  Startup Time: {startup_time:.2f}s (limit: 1.2s) - {self.measurements['startup_time']['status']}")
        print(f"  Current Spike: {current_spike:.2f}A (limit: 2.0A) - {self.measurements['startup_current']['status']}")
        print(f"  Phase Status: {startup_status}")
        
        return startup_status
    
    def test_speed_accuracy(self):
        """Run the speed accuracy test phase."""
        print("\n🔄 Running speed accuracy test...")
        
        # Simulate speed test
        time.sleep(3)
        
        actual_rpm = self.target_rpm + random.uniform(-150, 150)  # Target ±150 RPM
        speed_error = (actual_rpm - self.target_rpm) / self.target_rpm * 100  # Error as percentage
        
        self.measurements["actual_rpm"] = {
            "value": actual_rpm,
            "unit": "RPM",
            "expected": self.target_rpm,
            "status": "PASS" if abs(speed_error) <= 5.0 else "FAIL"
        }
        
        self.measurements["speed_error"] = {
            "value": speed_error,
            "unit": "%",
            "limits": {"min": -5.0, "max": 5.0},
            "status": "PASS" if abs(speed_error) <= 5.0 else "FAIL"
        }
        
        speed_accuracy_status = "PASSED" if abs(speed_error) <= 5.0 else "FAILED"
        
        self.phases.append({
            "name": "Speed Accuracy",
            "status": speed_accuracy_status,
            "measurements": {
                "actual_rpm": self.measurements["actual_rpm"],
                "speed_error": self.measurements["speed_error"]
            }
        })
        
        print(f"  Target RPM: {self.target_rpm}")
        print(f"  Actual RPM: {actual_rpm:.1f}")
        print(f"  Speed Error: {speed_error:.2f}% (limit: ±5.0%) - {self.measurements['speed_error']['status']}")
        print(f"  Phase Status: {speed_accuracy_status}")
        
        return speed_accuracy_status
    
    def test_load_performance(self):
        """Run the load performance test phase."""
        print("\n🔄 Running load performance test...")
        
        # Simulate load test
        time.sleep(4)
        
        # Test at 25%, 50%, 75%, and 100% load
        load_points = [25, 50, 75, 100]
        load_results = {}
        all_passed = True
        
        for load in load_points:
            print(f"  Testing at {load}% load...")
            time.sleep(1)
            
            current_draw = (load / 100) * 5.0 * (1 + random.uniform(-0.15, 0.15))  # Expected current with ±15% variation
            temp_rise = (load / 100) * 40.0 * (1 + random.uniform(-0.1, 0.3))  # Expected temp rise with variation
            
            current_limit = (load / 100) * 5.0 * 1.2  # 120% of expected current
            temp_limit = (load / 100) * 40.0 * 1.25  # 125% of expected temp rise
            
            current_status = "PASS" if current_draw <= current_limit else "FAIL"
            temp_status = "PASS" if temp_rise <= temp_limit else "FAIL"
            
            load_results[f"load_{load}pct"] = {
                "load_pct": load,
                "current": {
                    "value": current_draw,
                    "unit": "A",
                    "limits": {"max": current_limit},
                    "status": current_status
                },
                "temp_rise": {
                    "value": temp_rise,
                    "unit": "°C",
                    "limits": {"max": temp_limit},
                    "status": temp_status
                }
            }
            
            print(f"    Current: {current_draw:.2f}A (limit: {current_limit:.2f}A) - {current_status}")
            print(f"    Temperature Rise: {temp_rise:.1f}°C (limit: {temp_limit:.1f}°C) - {temp_status}")
            
            if current_status == "FAIL" or temp_status == "FAIL":
                all_passed = False
        
        load_status = "PASSED" if all_passed else "FAILED"
        
        self.measurements["load_test"] = load_results
        
        self.phases.append({
            "name": "Load Performance",
            "status": load_status,
            "measurements": load_results
        })
        
        print(f"  Phase Status: {load_status}")
        
        return load_status
    
    def test_durability(self):
        """Run a short durability test."""
        print("\n🔄 Running durability test (short simulation)...")
        
        # Simulate durability test cycles
        cycles = 10  # In a real test, this would be much higher
        failures = 0
        
        for i in range(1, cycles + 1):
            print(f"  Running cycle {i}/{cycles}...")
            time.sleep(0.5)
            
            # Simulate random failures with 5% probability
            if random.random() < 0.05:
                failures += 1
                print(f"    ❌ Detected anomaly in cycle {i}")
        
        self.measurements["durability"] = {
            "value": f"{cycles - failures}/{cycles} cycles passed",
            "cycles_run": cycles,
            "cycles_failed": failures,
            "status": "PASS" if failures <= 1 else "FAIL"  # Allow 1 anomaly
        }
        
        durability_status = "PASSED" if failures <= 1 else "FAILED"
        
        self.phases.append({
            "name": "Durability Test",
            "status": durability_status,
            "measurements": {
                "durability": self.measurements["durability"]
            }
        })
        
        print(f"  Cycles Run: {cycles}")
        print(f"  Failures Detected: {failures}")
        print(f"  Phase Status: {durability_status}")
        
        return durability_status
    
    def complete_test_run(self, overall_status):
        """Complete the test run with the final status."""
        self.end_time = time.time()
        print(f"\n✅ Test completed with overall status: {overall_status}")
        print(f"⏱️ Total duration: {self.end_time - self.start_time:.2f} seconds")
        
        # In a real implementation, we would update the test run in the database
        return True
    
    def generate_report(self, output_dir="reports"):
        """Generate a test report for this run."""
        import os
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        report = {
            "test_run": {
                "id": self.test_run_id,
                "device_id": self.device_id,
                "serial_number": self.serial_number,
                "target_rpm": self.target_rpm,
                "start_time": datetime.fromtimestamp(self.start_time).isoformat(),
                "end_time": datetime.fromtimestamp(self.end_time).isoformat() if self.end_time else None,
                "duration": (self.end_time - self.start_time) if self.end_time else None,
            },
            "phases": self.phases,
            "measurements": self.measurements
        }
        
        filename = f"{output_dir}/motor_test_{self.serial_number}_{int(time.time())}.json"
        
        with open(filename, "w") as f:
            json.dump(report, f, indent=2)
        
        print(f"\n📊 Test report generated: {filename}")
        return filename

def run_motor_test(device_id=None, serial_number=None, target_rpm=None):
    """Run a complete motor test sequence."""
    test = MotorTestRun(
        device_id=device_id,
        serial_number=serial_number,
        target_rpm=target_rpm
    )
    
    print(f"🧪 Starting Motor Test for {test.device_id} (S/N: {test.serial_number})")
    print(f"Target RPM: {test.target_rpm}")
    
    # Create the test run
    if not test.create_test_run():
        print("Could not create test run. Exiting.")
        return False
    
    # Run each test phase
    startup_status = test.test_motor_startup()
    speed_status = test.test_speed_accuracy()
    load_status = test.test_load_performance()
    durability_status = test.test_durability()
    
    # Determine overall test status
    if all(status == "PASSED" for status in [startup_status, speed_status, load_status, durability_status]):
        overall_status = "PASSED"
    else:
        overall_status = "FAILED"
    
    # Complete the test run
    test.complete_test_run(overall_status)
    
    # Generate a test report
    test.generate_report()
    
    return overall_status == "PASSED"

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="Run a motor test example for NotTofu")
    parser.add_argument("--device-id", help="Device ID for the motor controller")
    parser.add_argument("--serial", help="Serial number for the motor")
    parser.add_argument("--rpm", type=int, default=3000, help="Target RPM for the test (default: 3000)")
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()
    
    print("🔄 Motor Test Example")
    
    success = run_motor_test(
        device_id=args.device_id,
        serial_number=args.serial,
        target_rpm=args.rpm
    )
    
    if success:
        print("✅ Motor test completed successfully")
        sys.exit(0)
    else:
        print("❌ Motor test failed")
        sys.exit(1) 