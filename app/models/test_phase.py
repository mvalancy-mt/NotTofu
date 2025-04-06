from sqlalchemy import Column, String, JSON, ForeignKey, Enum, Float, Integer
from sqlalchemy.orm import relationship
import enum
from .base import BaseModel

class PhaseStatus(enum.Enum):
    PENDING = "pending"
    RUNNING = "running"
    PASSED = "passed"
    FAILED = "failed"
    SKIPPED = "skipped"
    ERROR = "error"

class TestPhase(BaseModel):
    __tablename__ = "test_phases"

    name = Column(String, index=True)
    description = Column(String)
    status = Column(Enum(PhaseStatus), default=PhaseStatus.PENDING)
    measurements = Column(JSON)  # Store measurements and their limits
    duration = Column(Float)  # Duration in seconds
    
    # Foreign keys
    test_run_id = Column(Integer, ForeignKey("test_runs.id"))
    
    # Relationships
    test_run = relationship("TestRun", back_populates="phases")
    attachments = relationship("Attachment", back_populates="phase") 