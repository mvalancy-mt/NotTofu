#!/usr/bin/env python3
import time
import random
import sys
from datetime import datetime

def create_mock_test_run(name, device_id=None, serial=None, metadata=None):
    # Generate IDs if not provided
