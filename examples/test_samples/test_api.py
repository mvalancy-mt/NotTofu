import
requests
response = requests.post("http://localhost:8000/test-runs/", json={"name": "Test Run from Script", "uut_id": "DEV123", "uut_serial": "SN456", "meta_data": {"test": True}})
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")
