# System Architecture

## Overall System Design

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[Next.js Web Interface]
        Components[Component Library]
        Routes[App Router]
    end

    subgraph "Backend Layer"
        API[API Service]
        Storage[Data Storage]
        
        API --> Storage
    end

    UI --> API
    Components --> UI
    Routes --> UI

    subgraph "Domain Model"
        TR[Test Runs]
        TP[Test Phases]
        M[Measurements]
        S[Stations]
        P[Procedures]
    end

    API --> TR & TP & M & S & P
```

## Current Focus Areas

```mermaid
graph TB
    subgraph "Priority 1: UI Enhancements"
        style Priority1 fill:#4ade80,stroke:#333,stroke-width:2px
        UserExp[User Experience]
        Components[Component Library]
        Responsive[Responsive Design]
        
        UserExp --> Components
        Responsive --> Components
    end

    subgraph "Priority 2: Feature Implementation"
        Authentication[User Authentication]
        Search[Search & Filtering]
        Export[Export & Reporting]
    end

    subgraph "Priority 3: Advanced Features"
        Analytics[Analytics Dashboard]
        RT[Real-time Updates]
        Integration[API Integration]
    end

    Priority1 --> Priority2
    Priority2 --> Priority3
```

## Data Architecture

```mermaid
erDiagram
    TestRun {
        string id PK
        string name
        enum status
        json metadata
        datetime timestamp
        float duration
        string station_id FK
        string procedure_id FK
    }

    TestPhase {
        string id PK
        string name
        enum status
        float duration
        string test_run_id FK
    }

    Measurement {
        string id PK
        string name
        float value
        string unit
        string expected
        enum status
        string phase_id FK
    }

    Station {
        string id PK
        string name
        string location
        enum status
    }

    Procedure {
        string id PK
        string name
        string description
        enum category
    }

    TestRun ||--o{ TestPhase : "has"
    TestPhase ||--o{ Measurement : "contains"
    Station ||--o{ TestRun : "runs"
    Procedure ||--o{ TestRun : "defines"
```

## Implementation Status

### Frontend (Active Development)
1. **Completed**
   - ✅ Page layout with navigation
   - ✅ Welcome page
   - ✅ Test runs list and detail view
   - ✅ Procedures page
   - ✅ Stations page and detail view
   - ✅ Consistent styling with Tailwind

2. **In Progress**
   - 🔄 Improved form components
   - 🔄 Data visualization
   - 🔄 Advanced filtering
   - 🔄 Mobile optimizations

3. **Planned**
   - Authentication and user management
   - Export and reporting
   - Customizable dashboard
   - Real-time updates

### Data Flow

```mermaid
sequenceDiagram
    participant UI as Frontend
    participant API as Backend API
    participant DB as Database
    
    Note over UI,API: View Test Runs
    UI->>API: GET /runs
    API->>DB: Query Runs
    DB-->>API: Return Results
    API-->>UI: JSON Response
    
    Note over UI,API: View Run Details
    UI->>API: GET /runs/{id}
    API->>DB: Query Run Details
    DB-->>API: Return Run with Phases
    API-->>UI: JSON Response with Phases
    
    Note over UI,API: View Station Details
    UI->>API: GET /stations/{id}
    API->>DB: Query Station
    DB-->>API: Return Station Details
    API-->>UI: JSON Response
```

## Development Workflow

We follow a feature-based development workflow:

1. **Feature Planning**
   - Define requirements
   - Create UI mockups
   - Plan component structure

2. **Implementation**
   - Create/update components
   - Implement business logic
   - Add styling and interactions

3. **Testing**
   - Component testing
   - Integration testing
   - Responsive design testing

4. **Deployment**
   - Code review
   - Staging deployment
   - Production release 