from sqlalchemy import Column, String, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum
from .base import BaseModel

class TestStatus(enum.Enum):
    PENDING = "pending"
    RUNNING = "running"
    PASSED = "passed"
    FAILED = "failed"
    ERROR = "error"

class TestRun(BaseModel):
    __tablename__ = "test_runs"

    name = Column(String, index=True)
    status = Column(Enum(TestStatus), default=TestStatus.PENDING)
    meta_data = Column(JSON)
    results = Column(JSON)
    
    # Reference to the unit under test
    uut_id = Column(String, index=True)
    uut_serial = Column(String, index=True)
    
    # Relationships
    phases = relationship("TestPhase", back_populates="test_run")
    attachments = relationship("Attachment", back_populates="test_run") 