#!/usr/bin/env python3
import requests

try:
    response = requests.post('http://localhost:8000/test-runs/', json={'name': 'Test Run from Script', 'device_id': 'DEV123', 'serial': 'SN456', 'metadata': {'test': True}})
    print(f'Status: {response.status_code}')
    print(f'Response: {response.text}')
except Exception as e:
    print(f'Error: {e}')
