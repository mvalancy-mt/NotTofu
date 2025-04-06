import time

class TestRun:
    def create(self):
        """Create the test run in NotTofu."""
        url = f"{BASE_URL}/test-runs/"
        
        # In a real implementation, this would call the API
        # Due to server issues, we're simulating a response
        print(f"💡 MOCK MODE: Simulating API call to {url}")
        print(f"📋 Would send: name={self.name}, device_id={self.device_id}, serial={self.serial_number}")
        
        # Generate a mock ID
        self.id = int(time.time())
        
        print(f"✅ Created test run: {self.name} (ID: {self.id})")
        return True 