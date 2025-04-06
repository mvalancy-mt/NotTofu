from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum

class TestStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    PASSED = "passed"
    FAILED = "failed"
    ERROR = "error"

class TestRunBase(BaseModel):
    name: str
    uut_id: Optional[str] = None
    uut_serial: Optional[str] = None
    meta_data: Optional[Dict[str, Any]] = None

class TestRunCreate(TestRunBase):
    pass

class TestRun(TestRunBase):
    id: int
    status: TestStatus
    results: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TestPhaseBase(BaseModel):
    name: str
    description: Optional[str] = None
    measurements: Optional[Dict[str, Any]] = None
    duration: Optional[float] = None

class TestPhaseCreate(TestPhaseBase):
    test_run_id: int

class TestPhase(TestPhaseBase):
    id: int
    status: TestStatus
    test_run_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 