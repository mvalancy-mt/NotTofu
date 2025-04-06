from sqlalchemy import Column, String, Integer, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from .base import BaseModel

class Attachment(BaseModel):
    """Model for file attachments linked to test runs or test phases."""
    __tablename__ = "attachments"

    filename = Column(String, nullable=False)
    content_type = Column(String)
    file_size = Column(Integer)
    file_path = Column(String)  # Path to file if stored in filesystem
    file_data = Column(LargeBinary, nullable=True)  # Binary data if stored in DB
    description = Column(String)
    
    # Foreign keys - allow attachments to be connected to either test runs or phases
    test_run_id = Column(Integer, ForeignKey("test_runs.id"), nullable=True)
    phase_id = Column(Integer, ForeignKey("test_phases.id"), nullable=True)
    
    # Relationships
    test_run = relationship("TestRun", back_populates="attachments")
    phase = relationship("TestPhase", back_populates="attachments") 