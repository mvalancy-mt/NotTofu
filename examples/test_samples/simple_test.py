#!/usr/bin/env python3
"""
Simple Test Example

This example demonstrates how to create and store test data in the NotTofu platform.
It simulates a basic test with multiple phases and measurements.

Usage:
    python simple_test.py
"""

import requests
import json
import time
import random
import sys
from datetime import datetime

# Base URL for NotTofu API
BASE_URL = "http://localhost:8000"

def create_test_run(name, uut_id=None, uut_serial=None, meta_data=None):
    """Create a new test run in NotTofu."""
    url = f"{BASE_URL}/test-runs/"
    
    payload = {
        "name": name,
        "uut_id": uut_id or f"DEVICE-{int(time.time())}",
        "uut_serial": uut_serial or f"SN-{int(time.time())}",
        "meta_data": meta_data or {}
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        result = response.json()
        print(f"✅ Created test run: {result['name']} (ID: {result['id']})")
        return result
    except requests.exceptions.RequestException as e:
        print(f"❌ Error creating test run: {e}")
        return None

def add_test_phase(test_run_id, name, status, measurements=None, duration=None):
    """Add a test phase to an existing test run."""
    url = f"{BASE_URL}/test-phases/"
    
    payload = {
        "name": name,
        "test_run_id": test_run_id,
        "status": status,
        "measurements": measurements or {},
        "duration": duration or 0.0,
        "description": f"Phase created by simple_test.py"
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        result = response.json()
        print(f"✅ Added phase: {result['name']} with status: {result['status']}")
        return result
    except requests.exceptions.RequestException as e:
        print(f"❌ Error adding test phase: {e}")
        return None

def run_fake_test():
    """Run a simulated test with multiple phases and store the results."""
    # Create a test run
    test_run = create_test_run(
        name="Example Simple Test",
        meta_data={
            "version": "1.0.0",
            "operator": "Automated Script",
            "description": "A simple example test"
        }
    )
    
    if not test_run:
        print("Could not create test run. Exiting.")
        return False
    
    test_run_id = test_run["id"]
    
    # Simulate initialization phase
    print("\n🔄 Running initialization phase...")
    time.sleep(1)  # Simulate work
    add_test_phase(
        test_run_id=test_run_id,
        name="Initialization",
        status="PASSED", 
        duration=1.0
    )
    
    # Simulate voltage measurement phase
    print("\n🔄 Running voltage measurement phase...")
    time.sleep(1.5)  # Simulate work
    voltage = 3.3 + (random.random() * 0.4 - 0.2)  # 3.3V ± 0.2V (increased range)
    voltage_in_range = 3.2 <= voltage <= 3.4
    
    add_test_phase(
        test_run_id=test_run_id,
        name="Voltage Measurement",
        status="PASSED" if voltage_in_range else "FAILED",
        measurements={
            "voltage": {
                "value": round(voltage, 2),
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
    temperature = 25 + (random.random() * 20 - 10)  # 25°C ± 10°C (increased range)
    temp_in_range = 20 <= temperature <= 30
    
    add_test_phase(
        test_run_id=test_run_id,
        name="Temperature Measurement",
        status="PASSED" if temp_in_range else "FAILED",
        measurements={
            "temperature": {
                "value": round(temperature, 1),
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
    # 70% chance of passing (reduced from 90%)
    functionality_passed = random.random() < 0.7
    
    add_test_phase(
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
    
    # Update the test run status in the database
    try:
        url = f"{BASE_URL}/test-runs/{test_run_id}/status"
        response = requests.put(url, json={"status": overall_status})
        response.raise_for_status()
        print(f"✅ Updated test run status to: {overall_status}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error updating test run status: {e}")
    
    return True

if __name__ == "__main__":
    print("🧪 Starting Simple Test Example")
    start_time = time.time()
    
    success = run_fake_test()
    
    end_time = time.time()
    total_duration = end_time - start_time
    print(f"\n⏱️ Total test duration: {total_duration:.2f} seconds")
    
    if success:
        print("✅ Test example completed successfully")
        sys.exit(0)
    else:
        print("❌ Test example failed")
        sys.exit(1) 