# Entity Relationships

## Current Entity Model

```mermaid
erDiagram
    TestRun {
        string id PK
        string name
        string status
        string description
        date startTime
        date endTime
        string procedureId FK
        string stationId FK
    }
    TestPhase {
        string id PK
        string name
        string status
        string description
        date startTime
        date endTime
        string testRunId FK
    }
    Measurement {
        string id PK
        string name
        string value
        string unit
        string status
        string description
        date timestamp
        string testPhaseId FK
    }
    Station {
        string id PK
        string name
        string description
        string location
        string status
    }
    Procedure {
        string id PK
        string name
        string description
        string version
        boolean isActive
    }

    TestRun }|--|| Station : "runs on"
    TestRun }|--|| Procedure : "follows"
    TestRun ||--|{ TestPhase : "contains"
    TestPhase ||--|{ Measurement : "records"
```

## Data Relationships Flow

```mermaid
flowchart TD
    Station[Station] --> |hosts| TestRun[Test Run]
    Procedure[Procedure] --> |defines| TestRun
    TestRun --> |includes| TestPhase[Test Phase]
    TestPhase --> |collects| Measurement[Measurement]
    
    subgraph Station Details
        S_ID[ID]
        S_Name[Name]
        S_Desc[Description]
        S_Loc[Location]
        S_Status[Status]
    end
    
    subgraph Test Run Details
        TR_ID[ID]
        TR_Name[Name]
        TR_Status[Status]
        TR_Start[Start Time]
        TR_End[End Time]
    end
    
    subgraph Test Phase Details
        TP_ID[ID]
        TP_Name[Name]
        TP_Status[Status]
        TP_Start[Start Time]
        TP_End[End Time]
    end
    
    subgraph Measurement Details
        M_ID[ID]
        M_Name[Name]
        M_Value[Value]
        M_Unit[Unit]
        M_Status[Status]
    end
    
    Station --- S_ID & S_Name & S_Desc & S_Loc & S_Status
    TestRun --- TR_ID & TR_Name & TR_Status & TR_Start & TR_End
    TestPhase --- TP_ID & TP_Name & TP_Status & TP_Start & TP_End
    Measurement --- M_ID & M_Name & M_Value & M_Unit & M_Status
```

## Cross-Entity Relationships

```mermaid
graph TB
    subgraph "Station Relationships"
        Station[Station] --> |has many| TestRun1[Test Run 1]
        Station --> |has many| TestRun2[Test Run 2]
        Station --> |has many| TestRunN[Test Run N...]
    end
    
    subgraph "Procedure Relationships"
        Procedure[Procedure] --> |has many| TestRunA[Test Run A]
        Procedure --> |has many| TestRunB[Test Run B]
        Procedure --> |has many| TestRunZ[Test Run Z...]
    end
    
    subgraph "Test Run Relationships"
        TR[Test Run] --> |has many| TP1[Test Phase 1]
        TR --> |has many| TP2[Test Phase 2]
        TR --> |has many| TPN[Test Phase N...]
    end
    
    subgraph "Test Phase Relationships"
        Phase[Test Phase] --> |has many| M1[Measurement 1]
        Phase --> |has many| M2[Measurement 2]
        Phase --> |has many| MN[Measurement N...]
    end
```

## Data Model Relationships

### Test Run
- A **TestRun** is the main entity representing an execution of a test
- Each TestRun is associated with exactly one **Station** where it runs
- Each TestRun follows exactly one **Procedure**
- A TestRun contains multiple **TestPhases**

### Test Phase
- A **TestPhase** represents a logical step in a test run
- Each TestPhase belongs to exactly one **TestRun**
- A TestPhase can record multiple **Measurements**

### Measurement
- A **Measurement** represents a single data point collected during testing
- Each Measurement belongs to exactly one **TestPhase**
- Measurements have a value, unit, and status (PASS/FAIL/etc.)

### Station
- A **Station** represents a physical testing station
- A Station can be used for multiple **TestRuns**
- Stations have a location and operational status

### Procedure
- A **Procedure** defines the test protocol to follow
- A Procedure can be used for multiple **TestRuns**
- Only active procedures can be used for new test runs

## Data Access Patterns

### Common Queries
1. Get all test runs for a specific station
2. Get all test runs using a specific procedure
3. Get test phases for a specific test run
4. Get measurements for a specific test phase
5. Get latest test run for a station/procedure combination

### Data Aggregations
1. Test pass/fail rates by station
2. Test duration statistics by procedure
3. Measurement trends over time
4. Station utilization metrics

## API Data Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant DB
    
    Client->>API: GET /runs?stationId=123
    API->>DB: SELECT * FROM TestRun WHERE stationId = 123
    DB-->>API: Return TestRun records
    API-->>Client: Return JSON response
    
    Client->>API: GET /runs/456
    API->>DB: SELECT * FROM TestRun WHERE id = 456
    DB-->>API: Return TestRun record
    API->>DB: SELECT * FROM TestPhase WHERE testRunId = 456
    DB-->>API: Return TestPhase records
    API-->>Client: Return TestRun with TestPhases
    
    Client->>API: GET /stations/789
    API->>DB: SELECT * FROM Station WHERE id = 789
    DB-->>API: Return Station record
    API->>DB: SELECT * FROM TestRun WHERE stationId = 789 LIMIT 5
    DB-->>API: Return recent TestRun records
    API-->>Client: Return Station with recent TestRuns
```

## Implementation Notes

- Primary keys are represented as strings to maintain flexibility (UUID)
- Timestamps use ISO 8601 format for consistency
- Status fields use enumerated values (e.g., "RUNNING", "COMPLETE", "FAILED")
- All entities include audit fields (created/modified timestamps and users) in the actual implementation 