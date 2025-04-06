from .base import Base, BaseModel
from .test_run import TestRun, TestStatus
from .test_phase import TestPhase, PhaseStatus
from .attachment import Attachment

# Import models so SQLAlchemy can discover them
__all__ = ["Base", "BaseModel", "TestRun", "TestStatus", "TestPhase", "PhaseStatus", "Attachment"] 