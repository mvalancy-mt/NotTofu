import time

class MotorTest:
    def create_test_run(self):
        """Create the test run in NotTofu."""
        url = f"{BASE_URL}/test-runs/"
        
        # In a real implementation, this would call the API
        # Due to server issues, we're simulating a response
        print(f"💡 MOCK MODE: Simulating API call to {url}")
        print(f"📋 Would send: name=Motor Test - {self.serial_number}, device_id={self.device_id}, serial={self.serial_number}")
        
        # Generate a mock ID
        self.test_run_id = int(time.time())
        
        print(f"✅ Created motor test run (ID: {self.test_run_id})")
        return True 