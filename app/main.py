from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uvicorn

from .database import get_db
from .models import test_run, test_phase
from .schemas import test_schemas

app = FastAPI(title="NotTofu Test Management Platform")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to NotTofu Test Management Platform"}

@app.post("/test-runs/", response_model=test_schemas.TestRun)
async def create_test_run(test_run_data: test_schemas.TestRunCreate, db: Session = Depends(get_db)):
    db_test_run = test_run.TestRun(**test_run_data.dict())
    db.add(db_test_run)
    db.commit()
    db.refresh(db_test_run)
    return db_test_run

@app.get("/test-runs/", response_model=List[test_schemas.TestRun])
async def list_test_runs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(test_run.TestRun).offset(skip).limit(limit).all()

@app.get("/test-runs/{test_run_id}", response_model=test_schemas.TestRun)
async def get_test_run(test_run_id: int, db: Session = Depends(get_db)):
    db_test_run = db.query(test_run.TestRun).filter(test_run.TestRun.id == test_run_id).first()
    if db_test_run is None:
        raise HTTPException(status_code=404, detail="Test run not found")
    return db_test_run

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 