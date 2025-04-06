#!/usr/bin/env python3
"""
Complex Test Example

This example demonstrates a more complex test setup with multiple test phases,
detailed measurements, and report generation for the NotTofu platform.

Usage:
    python complex_test.py
"""

import requests
import json
import time
import random
import sys
import os
import argparse
from datetime import datetime

# Base URL for NotTofu API
BASE_URL = "http://localhost:8000"

class TestRun:
    """Class to manage a test run and its phases."""
    
    def __init__(self, name, device_id=None, serial_number=None, metadata=None):
        """Initialize a test run."""
        self.name = name
        self.device_id = device_id or f"DEVICE-{int(time.time())}"
        self.serial_number = serial_number or f"SN-{int(time.time())}"
        self.metadata = metadata or {}
        self.id = None
        self.phases = []
        self.start_time = time.time()
        self.end_time = None
        self.status = "PENDING"
    
    def create(self):
        """Create the test run in NotTofu."""
        url = f"{BASE_URL}/test-runs/"
        
        payload = {
            "name": self.name,
            "uut_id": self.device_id,
            "uut_serial": self.serial_number,
            "meta_data": self.metadata
        }
        
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
            self.id = result["id"]
            print(f"✅ Created test run: {self.name} (ID: {self.id})")
            return True
        except requests.exceptions.RequestException as e:
            print(f"❌ Error creating test run: {e}")
            return False
    
    def add_phase(self, phase):
        """Add a test phase to this run."""
        phase.test_run_id = self.id
        self.phases.append(phase)
        
        # In a real implementation, this would call the API to add the phase
        print(f"📋 Added phase: {phase.name} with status {phase.status}")
        
        return phase
    
    def complete(self, status):
        """Complete the test run with the given status."""
        self.status = status
        self.end_time = time.time()
        
        # In a real implementation, this would update the test run in the database
        print(f"✅ Completed test run with status: {status}")
        
        return True
    
    def generate_report(self, output_dir="reports"):
        """Generate a test report in JSON format."""
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        report = {
            "test_run": {
                "id": self.id,
                "name": self.name,
                "device_id": self.device_id,
                "serial_number": self.serial_number,
                "status": self.status,
                "start_time": datetime.fromtimestamp(self.start_time).isoformat(),
                "end_time": datetime.fromtimestamp(self.end_time).isoformat() if self.end_time else None,
                "duration": (self.end_time - self.start_time) if self.end_time else None,
                "metadata": self.metadata
            },
            "phases": [phase.to_dict() for phase in self.phases]
        }
        
        timestamp = int(time.time())
        filename = f"{output_dir}/test_report_{self.id or timestamp}.json"
        
        with open(filename, "w") as f:
            json.dump(report, f, indent=2)
            
        print(f"📊 Generated test report: {filename}")
        return filename

class TestPhase:
    """Class to manage a test phase."""
    
    def __init__(self, name, description=None):
        """Initialize a test phase."""
        self.name = name
        self.description = description
        self.test_run_id = None
        self.measurements = {}
        self.start_time = time.time()
        self.end_time = None
        self.status = "PENDING"
    
    def add_measurement(self, name, value, unit=None, expected=None, limits=None):
        """Add a measurement result."""
        status = "PASS"
        
        # Determine status based on limits if provided
        if limits:
            if "min" in limits and value < limits["min"]:
                status = "FAIL"
            if "max" in limits and value > limits["max"]:
                status = "FAIL"
        
        # Store the measurement
        self.measurements[name] = {
            "value": value,
            "unit": unit,
            "expected": expected,
            "limits": limits,
            "status": status
        }
        
        return status
    
    def complete(self, status):
        """Complete the phase with the given status."""
        self.status = status
        self.end_time = time.time()
        return True
    
    def to_dict(self):
        """Convert phase to dictionary representation."""
        return {
            "name": self.name,
            "description": self.description,
            "status": self.status,
            "start_time": datetime.fromtimestamp(self.start_time).isoformat(),
            "end_time": datetime.fromtimestamp(self.end_time).isoformat() if self.end_time else None,
            "duration": (self.end_time - self.start_time) if self.end_time else None,
            "measurements": self.measurements
        }

def simulate_power_on_test(test_run):
    """Simulate a power-on test phase."""
    print("\n🔄 Running Power-On Test...")
    phase = TestPhase("Power-On Test", "Verify device powers on correctly")
    test_run.add_phase(phase)
    
    # Simulate work
    time.sleep(2)
    
    # Check voltage
    voltage = 12.0 + (random.random() * 0.4 - 0.2)  # 12.0V ± 0.2V
    voltage_status = phase.add_measurement(
        name="Input Voltage",
        value=voltage,
        unit="V",
        expected="12.0V ± 0.2V",
        limits={"min": 11.8, "max": 12.2}
    )
    
    # Check current
    current = 0.5 + (random.random() * 0.2 - 0.1)  # 0.5A ± 0.1A
    current_status = phase.add_measurement(
        name="Input Current",
        value=current,
        unit="A",
        expected="0.5A ± 0.1A",
        limits={"min": 0.4, "max": 0.6}
    )
    
    # Check boot time
    boot_time = 3.0 + (random.random() * 1.0)  # 3.0s + up to 1.0s
    boot_status = phase.add_measurement(
        name="Boot Time",
        value=boot_time,
        unit="s",
        expected="< 4.0s",
        limits={"max": 4.0}
    )
    
    # Determine phase status based on measurements
    if all(status == "PASS" for status in [voltage_status, current_status, boot_status]):
        phase.complete("PASSED")
    else:
        phase.complete("FAILED")
    
    return phase.status

def simulate_calibration_test(test_run):
    """Simulate a calibration test phase."""
    print("\n🔄 Running Calibration Test...")
    phase = TestPhase("Calibration", "Calibrate device sensors")
    test_run.add_phase(phase)
    
    # Simulate work
    time.sleep(3)
    
    # Temperature sensor calibration
    temp_offset = random.random() * 0.6 - 0.3  # -0.3°C to +0.3°C
    temp_status = phase.add_measurement(
        name="Temperature Sensor Offset",
        value=temp_offset,
        unit="°C",
        expected="±0.2°C",
        limits={"min": -0.2, "max": 0.2}
    )
    
    # Pressure sensor calibration
    pressure_offset = random.random() * 2.0 - 1.0  # -1.0hPa to +1.0hPa
    pressure_status = phase.add_measurement(
        name="Pressure Sensor Offset",
        value=pressure_offset,
        unit="hPa",
        expected="±1.0hPa",
        limits={"min": -1.0, "max": 1.0}
    )
    
    # Humidity sensor calibration
    humidity_offset = random.random() * 4.0 - 2.0  # -2.0% to +2.0%
    humidity_status = phase.add_measurement(
        name="Humidity Sensor Offset",
        value=humidity_offset,
        unit="%RH",
        expected="±2.0%RH",
        limits={"min": -2.0, "max": 2.0}
    )
    
    # Determine phase status based on measurements
    if all(status == "PASS" for status in [temp_status, pressure_status, humidity_status]):
        phase.complete("PASSED")
    else:
        phase.complete("FAILED")
    
    return phase.status

def simulate_functional_test(test_run):
    """Simulate a functional test phase."""
    print("\n🔄 Running Functional Test...")
    phase = TestPhase("Functional Test", "Verify core device functionality")
    test_run.add_phase(phase)
    
    # Simulate work
    time.sleep(4)
    
    # Display test
    display_status = "PASS" if random.random() > 0.05 else "FAIL"  # 95% pass rate
    phase.add_measurement(
        name="Display Test",
        value=display_status,
        expected="PASS"
    )
    
    # Button test
    buttons_working = random.randint(4, 5)  # 4 or 5 buttons working out of 5
    button_status = phase.add_measurement(
        name="Button Test",
        value=f"{buttons_working}/5 buttons working",
        expected="5/5 buttons working"
    )
    
    # Communication test
    comm_latency = 50 + (random.random() * 30)  # 50-80ms
    comm_status = phase.add_measurement(
        name="Communication Latency",
        value=comm_latency,
        unit="ms",
        expected="< 75ms",
        limits={"max": 75}
    )
    
    # Data storage test
    storage_speed = 10 + (random.random() * 5)  # 10-15 MB/s
    storage_status = phase.add_measurement(
        name="Storage Write Speed",
        value=storage_speed,
        unit="MB/s",
        expected="> 12 MB/s",
        limits={"min": 12}
    )
    
    # Determine phase status
    if (display_status == "PASS" and 
        buttons_working >= 4 and 
        comm_status == "PASS" and 
        storage_status == "PASS"):
        phase.complete("PASSED")
    else:
        phase.complete("FAILED")
    
    return phase.status

def simulate_environmental_test(test_run):
    """Simulate an environmental test phase."""
    print("\n🔄 Running Environmental Test...")
    phase = TestPhase("Environmental Test", "Test device under various environmental conditions")
    test_run.add_phase(phase)
    
    # Simulate work
    time.sleep(2.5)
    
    # Temperature operation test
    temp_op = 35 + (random.random() * 15)  # 35-50°C
    temp_status = phase.add_measurement(
        name="High Temperature Operation",
        value=temp_op,
        unit="°C",
        expected="Functional up to 45°C",
        limits={"max": 45}
    )
    
    # Humidity operation test
    humidity_op = 75 + (random.random() * 15)  # 75-90%
    humidity_status = phase.add_measurement(
        name="High Humidity Operation",
        value=humidity_op,
        unit="%RH",
        expected="Functional up to 85%RH",
        limits={"max": 85}
    )
    
    # Vibration test
    vibration_result = "PASS" if random.random() > 0.1 else "FAIL"  # 90% pass rate
    phase.add_measurement(
        name="Vibration Test",
        value=vibration_result,
        expected="PASS"
    )
    
    # Determine phase status
    if temp_status == "PASS" and humidity_status == "PASS" and vibration_result == "PASS":
        phase.complete("PASSED")
    else:
        phase.complete("FAILED")
    
    return phase.status

def run_complex_test(device_id=None, serial_number=None):
    """Run a complex test with multiple phases."""
    # Create a test run
    test_run = TestRun(
        name="Complex Device Test",
        device_id=device_id,
        serial_number=serial_number,
        metadata={
            "version": "2.0.0",
            "operator": "Automated System",
            "test_type": "Production",
            "firmware_version": "1.5.2",
            "hardware_revision": "B",
            "test_suite": "Full Qualification"
        }
    )
    
    # Create the test run in NotTofu
    if not test_run.create():
        print("Could not create test run. Exiting.")
        return False
    
    # Run each test phase
    power_on_status = simulate_power_on_test(test_run)
    calibration_status = simulate_calibration_test(test_run)
    functional_status = simulate_functional_test(test_run)
    environmental_status = simulate_environmental_test(test_run)
    
    # Determine overall test status
    if all(status == "PASSED" for status in [power_on_status, calibration_status, 
                                           functional_status, environmental_status]):
        overall_status = "PASSED"
    else:
        overall_status = "FAILED"
    
    # Complete the test run
    test_run.complete(overall_status)
    
    # Generate a test report
    test_run.generate_report()
    
    return True

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="Run a complex test example for NotTofu")
    parser.add_argument("--device-id", help="Device ID for the test run")
    parser.add_argument("--serial", help="Serial number for the device")
    return parser.parse_args()

if __name__ == "__main__":
    print("🧪 Starting Complex Test Example")
    start_time = time.time()
    
    args = parse_args()
    success = run_complex_test(device_id=args.device_id, serial_number=args.serial)
    
    end_time = time.time()
    total_duration = end_time - start_time
    print(f"\n⏱️ Total test duration: {total_duration:.2f} seconds")
    
    if success:
        print("✅ Test example completed successfully")
        sys.exit(0)
    else:
        print("❌ Test example failed")
        sys.exit(1) 