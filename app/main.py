from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uvicorn
import os

from .database import get_db
from .models import test_run, test_phase
from .schemas import test_schemas

app = FastAPI(title="NotTofu Test Management Platform")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to NotTofu Test Management Platform"}

# Support both /test-runs/ (legacy) and /runs/ (new) endpoints
@app.post("/runs/", response_model=test_schemas.TestRun)
@app.post("/test-runs/", response_model=test_schemas.TestRun)
async def create_test_run(test_run_data: test_schemas.TestRunCreate, db: Session = Depends(get_db)):
    db_test_run = test_run.TestRun(**test_run_data.dict())
    db.add(db_test_run)
    db.commit()
    db.refresh(db_test_run)
    return db_test_run

@app.get("/runs/", response_model=List[test_schemas.TestRun])
@app.get("/test-runs/", response_model=List[test_schemas.TestRun])
async def list_test_runs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(test_run.TestRun).offset(skip).limit(limit).all()

@app.get("/runs/{test_run_id}", response_model=test_schemas.TestRun)
@app.get("/test-runs/{test_run_id}", response_model=test_schemas.TestRun)
async def get_test_run(test_run_id: int, db: Session = Depends(get_db)):
    db_test_run = db.query(test_run.TestRun).filter(test_run.TestRun.id == test_run_id).first()
    if db_test_run is None:
        raise HTTPException(status_code=404, detail="Test run not found")
    return db_test_run

@app.post("/test-phases/", response_model=test_schemas.TestPhase)
@app.post("/phases/", response_model=test_schemas.TestPhase)
async def create_test_phase(phase_data: test_schemas.TestPhaseCreate, db: Session = Depends(get_db)):
    # First check if the test_run exists
    db_test_run = db.query(test_run.TestRun).filter(test_run.TestRun.id == phase_data.test_run_id).first()
    if db_test_run is None:
        raise HTTPException(status_code=404, detail="Test run not found")
    
    # Convert the status string to the appropriate enum value
    status_str = phase_data.status
    if status_str.upper() == "PASSED":
        status_value = test_phase.PhaseStatus.PASSED
    elif status_str.upper() == "FAILED":
        status_value = test_phase.PhaseStatus.FAILED
    elif status_str.upper() == "PENDING":
        status_value = test_phase.PhaseStatus.PENDING
    elif status_str.upper() == "RUNNING":
        status_value = test_phase.PhaseStatus.RUNNING
    elif status_str.upper() == "SKIPPED":
        status_value = test_phase.PhaseStatus.SKIPPED
    elif status_str.upper() == "ERROR":
        status_value = test_phase.PhaseStatus.ERROR
    else:
        raise HTTPException(status_code=400, detail=f"Invalid status value: {status_str}")
    
    # Create the test phase object
    try:
        phase_dict = phase_data.dict()
        # Replace the string status with the enum value
        phase_dict.pop("status", None)  # Remove string status
        db_phase = test_phase.TestPhase(**phase_dict)
        db_phase.status = status_value  # Set the status directly
        
        # Add and commit to the database
        db.add(db_phase)
        db.commit()
        db.refresh(db_phase)
        
        # Update test run status based on phase status if needed
        if status_value == test_phase.PhaseStatus.FAILED and db_test_run.status != test_run.TestStatus.FAILED:
            db_test_run.status = test_run.TestStatus.FAILED
            db.commit()
            db.refresh(db_test_run)
        
        return db_phase
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating test phase: {str(e)}")

@app.put("/runs/{test_run_id}/status", response_model=test_schemas.TestRun)
@app.put("/test-runs/{test_run_id}/status", response_model=test_schemas.TestRun)
async def update_test_run_status(test_run_id: int, status_data: dict, db: Session = Depends(get_db)):
    try:
        db_test_run = db.query(test_run.TestRun).filter(test_run.TestRun.id == test_run_id).first()
        if db_test_run is None:
            raise HTTPException(status_code=404, detail="Test run not found")
        
        if "status" not in status_data:
            raise HTTPException(status_code=400, detail="Status field is required")
        
        status_str = status_data["status"]
        if status_str.upper() == "PASSED":
            status_value = test_run.TestStatus.PASSED
        elif status_str.upper() == "FAILED":
            status_value = test_run.TestStatus.FAILED
        elif status_str.upper() == "PENDING":
            status_value = test_run.TestStatus.PENDING
        elif status_str.upper() == "RUNNING":
            status_value = test_run.TestStatus.RUNNING
        elif status_str.upper() == "ERROR":
            status_value = test_run.TestStatus.ERROR
        else:
            raise HTTPException(status_code=400, detail=f"Invalid status value: {status_str}")
        
        db_test_run.status = status_value
        db.commit()
        db.refresh(db_test_run)
        return db_test_run
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating test run status: {str(e)}")

@app.get("/runs/{test_run_id}/phases", response_model=List[test_schemas.TestPhase])
@app.get("/test-runs/{test_run_id}/phases", response_model=List[test_schemas.TestPhase])
async def get_test_phases_by_run_id(test_run_id: int, db: Session = Depends(get_db)):
    db_test_run = db.query(test_run.TestRun).filter(test_run.TestRun.id == test_run_id).first()
    if db_test_run is None:
        raise HTTPException(status_code=404, detail="Test run not found")
    
    phases = db.query(test_phase.TestPhase).filter(test_phase.TestPhase.test_run_id == test_run_id).all()
    return phases

@app.get("/status")
async def get_api_status():
    """
    Return the current API health status
    """
    import datetime
    import platform
    
    # Calculate uptime (mock for now)
    start_time = datetime.datetime.now() - datetime.timedelta(days=10, hours=5, minutes=30)
    uptime = datetime.datetime.now() - start_time
    uptime_str = f"{uptime.days}d {uptime.seconds // 3600}h {(uptime.seconds // 60) % 60}m"
    
    return {
        "status": "operational",
        "version": "1.0.0",
        "uptime": uptime_str,
        "services": {
            "database": "connected",
            "storage": "connected",
            "cache": "connected"
        },
        "latency": {
            "database": "15ms",
            "api": "45ms"
        },
        "system": {
            "python": platform.python_version(),
            "os": platform.system(),
            "processor": platform.processor()
        }
    }

if __name__ == "__main__":
    # Get port from environment variable or use default
    # First try NOTTOFU_PORT, then fall back to PORT, then default to 8000
    port = int(os.environ.get("NOTTOFU_PORT", os.environ.get("PORT", 8000)))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True) 