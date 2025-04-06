#!/usr/bin/env python3
"""
Mock Test Example for NotTofu

This example demonstrates a mock test that doesn't require a working API.
It simulates what would happen if the API worked correctly.

Usage:
    python mock_test.py
"""

import time
import random
import sys
from datetime import datetime

# This is just for informational purposes
MOCK_API_URL = "http://localhost:8000/test-runs/"

def create_mock_test_run(name, device_id=None, serial=None, metadata=None):
    """Create a mock test run without calling any API."""
    # Generate IDs if not provided
    device_id = device_id or f"DEVICE-{int(time.time())}"
    serial = serial or f"SN-{int(time.time())}"
    
    # Log what we would have sent
    print(f"💡 MOCK MODE: API call simulation")
    print(f"📋 Would send to {MOCK_API_URL}:")
    print(f"    name: {name}")
    print(f"    device_id: {device_id}")
    print(f"    serial: {serial}")
    
    # Create a mock result
    mock_id = int(time.time())
    result = {
        "id": mock_id,
        "name": name,
        "device_id": device_id,
        "serial": serial,
        "metadata": metadata or {},
        "created_at": datetime.now().isoformat(),
        "status": "CREATED"
    }
    
    print(f"✅ Created mock test run: {result['name']} (ID: {result['id']})")
    return result

def add_mock_phase(test_run_id, name, status, measurements=None, duration=None):
    """Add a mock test phase."""
    print(f"📋 Adding phase '{name}' to test run {test_run_id}")
    print(f"   Status: {status}")
    print(f"   Measurements: {measurements or {}}")
    print(f"   Duration: {duration or 0.0} seconds")

def run_mock_test():
    """Run a simulated test."""
    # Create a test run
    test_run = create_mock_test_run(
        name="Example Mock Test",
        metadata={
            "version": "1.0.0",
            "operator": "Automated Script",
            "description": "A simple mock test"
        }
    )
    
    test_run_id = test_run["id"]
    
    # Simulate initialization phase
    print("\n🔄 Running initialization phase...")
    time.sleep(1)  # Simulate work
    add_mock_phase(
        test_run_id=test_run_id,
        name="Initialization",
        status="PASSED", 
        duration=1.0
    )
    
    # Simulate voltage measurement phase
    print("\n🔄 Running voltage measurement phase...")
    time.sleep(1.5)  # Simulate work
    voltage = 3.3 + (random.random() * 0.2 - 0.1)  # 3.3V ± 0.1V
    voltage_in_range = 3.2 <= voltage <= 3.4
    
    add_mock_phase(
        test_run_id=test_run_id,
        name="Voltage Measurement",
        status="PASSED" if voltage_in_range else "FAILED",
        measurements={
            "voltage": {
                "value": voltage,
                "unit": "V",
                "limits": {"min": 3.2, "max": 3.4},
                "status": "PASS" if voltage_in_range else "FAIL"
            }
        },
        duration=1.5
    )
    
    # Simulate temperature measurement phase
    print("\n🔄 Running temperature measurement phase...")
    time.sleep(2)  # Simulate work
    temperature = 25 + (random.random() * 10 - 5)  # 25°C ± 5°C
    temp_in_range = 20 <= temperature <= 30
    
    add_mock_phase(
        test_run_id=test_run_id,
        name="Temperature Measurement",
        status="PASSED" if temp_in_range else "FAILED",
        measurements={
            "temperature": {
                "value": temperature,
                "unit": "°C",
                "limits": {"min": 20, "max": 30},
                "status": "PASS" if temp_in_range else "FAIL"
            }
        },
        duration=2.0
    )
    
    # Simulate functionality test phase
    print("\n🔄 Running functionality test phase...")
    time.sleep(1.5)  # Simulate work
    # 90% chance of passing
    functionality_passed = random.random() < 0.9
    
    add_mock_phase(
        test_run_id=test_run_id,
        name="Functionality Test",
        status="PASSED" if functionality_passed else "FAILED",
        measurements={
            "boot_time": {
                "value": 2.3,
                "unit": "s",
                "limits": {"max": 3.0},
                "status": "PASS"
            },
            "memory_check": {
                "value": "OK" if functionality_passed else "ERROR",
                "status": "PASS" if functionality_passed else "FAIL"
            }
        },
        duration=1.5
    )
    
    # Update the test run status based on all phases
    overall_status = "PASSED" if (voltage_in_range and temp_in_range and functionality_passed) else "FAILED"
    print(f"\n✅ Test complete with status: {overall_status}")
    
    return True

if __name__ == "__main__":
    print("🧪 Starting Mock Test Example")
    start_time = time.time()
    
    success = run_mock_test()
    
    end_time = time.time()
    total_duration = end_time - start_time
    print(f"\n⏱️ Total test duration: {total_duration:.2f} seconds")
    
    if success:
        print("✅ Test example completed successfully")
        sys.exit(0)
    else:
        print("❌ Test example failed")
        sys.exit(1) 