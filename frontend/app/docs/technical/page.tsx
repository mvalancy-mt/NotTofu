'use client'

import React, { useEffect } from 'react';
import mermaid from 'mermaid';

export default function TechnicalDocumentationPage() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      fontSize: 14,
    });
    mermaid.run();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Technical Documentation</h1>
      <p className="text-lg text-gray-600 mb-8">
        This page provides a comprehensive overview of the NotTofu architecture, component structure, data models, and workflow processes.
      </p>

      <div className="space-y-16">
        {/* System Overview Section */}
        <section id="system-overview" className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Overview</h2>
          <p className="text-gray-600 mb-6">
            NotTofu consists of a Next.js frontend and FastAPI backend with SQLite database storage. The diagram below shows the high-level architecture.
          </p>
          
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
graph TB
    subgraph "Frontend Layer"
        UI[Next.js Web Interface]
        Components[Component Library]
        Routes[App Router]
        Pages[Application Pages]
    end

    subgraph "Backend Layer"
        API[API Service]
        Storage[Data Storage]
    end

    subgraph "Domain Model"
        TR[Test Runs]
        TP[Test Phases]
        M[Measurements]
        S[Stations]
        P[Procedures]
    end

    UI --> API
    Components --> UI
    Routes --> Pages
    Pages --> UI
    
    API <--> Storage
    API --> TR & TP & M & S & P
    
    style UI fill:#bbf,stroke:#333,stroke-width:2px
    style API fill:#bfb,stroke:#333,stroke-width:2px
    style Storage fill:#fbb,stroke:#333,stroke-width:2px
              `}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Application Components</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
graph TB
    subgraph "Application Components"
        Frontend["Next.js Frontend<br>Default Port: 3000"]
        Backend["FastAPI Backend<br>Default Port: 8000"]
        DB[(SQLite Database)]
    end
    
    subgraph "Installation Flow"
        Setup["Setup Scripts<br>setup.bat/setup.sh"]
        Start["Start Scripts<br>start.bat/start.sh"]
        Run["Run Scripts<br>run_frontend & run_backend"]
    end
    
    Setup --> Start
    Start --> Run
    Run --> Frontend
    Run --> Backend
    Backend --> DB
    
    style Frontend fill:#bbf,stroke:#333,stroke-width:2px
    style Backend fill:#bfb,stroke:#333,stroke-width:2px
    style DB fill:#fbb,stroke:#333,stroke-width:2px
              `}
            </pre>
          </div>
        </section>

        {/* User Flow Section */}
        <section id="user-flow" className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User and Data Flow</h2>
          <p className="text-gray-600 mb-6">
            The diagram below illustrates how users navigate through the application and how data flows between components.
          </p>
          
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
flowchart TD
    subgraph "User Flow"
        Start([Start]) --> Home[Home Page]
        Home --> Runs[Test Runs]
        Home --> Stations[Stations]
        Home --> Procedures[Procedures]
        Home --> Analytics[Analytics]
        
        Runs --> RunDetail[Run Details]
        RunDetail --> Phases[Test Phases]
        Phases --> Measurements[Measurements]
        
        Stations --> StationDetail[Station Details]
        StationDetail --> StationRuns[Station Test Runs]
        
        Procedures --> ProcedureDetail[Procedure Details]
    end
    
    subgraph "Data Flow"
        Frontend[Frontend] <-->|API Calls| Backend[Backend API]
        Backend <-->|CRUD Operations| Database[(Database)]
    end
    
    style Home fill:#f9f,stroke:#333,stroke-width:2px
    style Runs fill:#bbf,stroke:#333,stroke-width:2px
    style Stations fill:#bfb,stroke:#333,stroke-width:2px
    style Procedures fill:#fbb,stroke:#333,stroke-width:2px
    style Analytics fill:#fbf,stroke:#333,stroke-width:2px
              `}
            </pre>
          </div>
        </section>

        {/* Frontend Architecture Section */}
        <section id="frontend-architecture" className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frontend Architecture</h2>
          <p className="text-gray-600 mb-6">
            The frontend is built using Next.js with a component-based architecture.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Component Hierarchy</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
graph TB
    subgraph Root
        RootLayout[RootLayout]
        Navigation[Navigation]
        MainContent[MainContent]
        Logo[Logo]
    end

    subgraph Pages
        Welcome[Welcome Page]
        Runs[Test Runs Page]
        RunDetail[Run Detail Page]
        Procedures[Procedures Page]
        Stations[Stations Page]
        StationDetail[Station Detail Page]
        Analytics[Analytics Page]
        Docs[Documentation Page]
        Settings[Settings Page]
        Status[API Status Page]
        Account[Account Page]
    end

    subgraph CoreComponents
        LogoComponent[Logo Component]
        NavComponent[Navigation Component]
        LoadingState[Loading Component]
        ErrorBoundary[Error Component]
    end

    subgraph UIElements
        Card[Card Components]
        Button[Button Components]
        StatusBadge[Status Badges]
        Tables[Data Tables]
        Icons[Hero Icons]
    end

    RootLayout --> Navigation
    RootLayout --> MainContent
    Navigation --> LogoComponent
    MainContent --> Pages
    Pages --> UIElements
    Pages --> LoadingState
    Pages --> ErrorBoundary
    Welcome --> LogoComponent
              `}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Homepage Structure</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
graph TB
    subgraph HomePage
        HeroSection[Hero Section]
        NavGrid[Navigation Grid]
        APIStatus[API Status Section]
    end
    
    subgraph HeroSection
        CenteredLogo[Centered Logo]
        Title[App Title]
        Description[App Description]
    end
    
    subgraph NavGrid
        HomeCard[Home Card]
        RunsCard[Test Runs Card]
        ProceduresCard[Procedures Card]
        StationsCard[Stations Card]
        AnalyticsCard[Analytics Card]
        DocsCard[Documentation Card]
        SettingsCard[Settings Card]
        APIStatusCard[API Status Card]
    end
    
    HeroSection --> CenteredLogo
    HeroSection --> Title
    HeroSection --> Description
    NavGrid --> HomeCard & RunsCard & ProceduresCard & StationsCard
    NavGrid --> AnalyticsCard & DocsCard & SettingsCard & APIStatusCard
    HomePage --> HeroSection
    HomePage --> NavGrid
    HomePage --> APIStatus
              `}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Next.js CORS Configuration</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
graph TD
    subgraph "Next.js CORS Configuration"
        Config["next.config.js<br>Main Configuration"]
        Middleware["middleware.js<br>CORS Handling"]
        API["API Routes"]
    end
    
    Request[API Request] --> Middleware
    Middleware --> API
    Config --> Middleware
    
    style Middleware fill:#f9f,stroke:#333,stroke-width:2px
              `}
            </pre>
          </div>
        </section>

        {/* Data Model Section */}
        <section id="data-model" className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Model</h2>
          <p className="text-gray-600 mb-6">
            The entity-relationship diagram below shows the core data models and their relationships.
          </p>
          
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
erDiagram
    TestRun {
        string id PK
        string name
        string status
        date startTime
        date endTime
        string procedureId FK
        string stationId FK
    }
    TestPhase {
        string id PK
        string name
        string status
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
        string testPhaseId FK
    }
    Station {
        string id PK
        string name
        string location
        string status
    }
    Procedure {
        string id PK
        string name
        string description
        string version
    }

    TestRun }|--|| Station : "runs on"
    TestRun }|--|| Procedure : "follows"
    TestRun ||--|{ TestPhase : "contains"
    TestPhase ||--|{ Measurement : "records"
              `}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Relationships Flow</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
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
              `}
            </pre>
          </div>
        </section>

        {/* API Flow Section */}
        <section id="api-flow" className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">API Flow</h2>
          <p className="text-gray-600 mb-6">
            The diagram below illustrates the API endpoints and data flow between frontend and backend.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">API Sequence Diagram</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
sequenceDiagram
    participant Client as NotTofu Frontend
    participant API as API Service
    participant DB as Database

    %% Test Runs List Flow
    Client->>API: GET /api/runs
    API->>DB: Query test runs with pagination
    DB-->>API: Return test runs data
    API-->>Client: JSON response with test runs

    %% Test Run Detail Flow
    Client->>API: GET /api/runs/{id}
    API->>DB: Query test run by ID
    DB-->>API: Return test run data
    API->>DB: Query phases for this test run
    DB-->>API: Return phases data
    API-->>Client: JSON response with test run and phases

    %% Station Detail Flow
    Client->>API: GET /api/stations/{id}
    API->>DB: Query station by ID
    DB-->>API: Return station data
    API->>DB: Query recent test runs for this station
    DB-->>API: Return test runs data
    API-->>Client: JSON response with station and test runs
    
    %% API Status Check
    Client->>API: GET /api/status
    API-->>Client: Return API health status
              `}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">API Endpoint Structure</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
graph TB
    API[API Root]
    
    Runs["/runs"]
    RunById["/runs/{id}"]
    RunPhases["/runs/{id}/phases"]
    
    Stations["/stations"]
    StationById["/stations/{id}"]
    StationRuns["/stations/{id}/runs"]
    
    Procedures["/procedures"]
    ProcedureById["/procedures/{id}"]
    
    Status["/status"]
    
    API --> Runs
    API --> RunById
    API --> RunPhases
    
    API --> Stations
    API --> StationById
    API --> StationRuns
    
    API --> Procedures
    API --> ProcedureById
    
    API --> Status
              `}
            </pre>
          </div>
        </section>

        {/* Deployment Architecture Section */}
        <section id="deployment" className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Deployment Architecture</h2>
          <p className="text-gray-600 mb-6">
            NotTofu can be deployed using various script combinations for different operating systems.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Installation Process</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
flowchart TD
    Start([Start]) --> Clone[Clone Repository]
    Clone --> Setup[Run Setup Script]
    Setup --> InstallBackend[Install Backend Dependencies]
    Setup --> InstallFrontend[Install Frontend Dependencies]
    InstallBackend --> CreateVenv[Create Python Virtual Environment]
    CreateVenv --> InstallPython[Install Python Dependencies]
    InstallFrontend --> InstallNode[Install Node.js Dependencies]
    InstallPython --> DBSetup[Initialize Database]
    InstallNode --> Complete([Setup Complete])
    DBSetup --> Complete
    
    style Setup fill:#f9f,stroke:#333,stroke-width:2px
    style Complete fill:#bfb,stroke:#333,stroke-width:2px
              `}
            </pre>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Script Architecture</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
graph TD
    subgraph "Start Scripts"
        start.bat["start.bat<br>Windows Batch"]
        start.ps1["start.ps1<br>PowerShell"]
        start.sh["start.sh<br>Bash"]
    end
    
    subgraph "Run Scripts"
        run_b_bat["run_backend.bat"]
        run_b_ps1["run_backend.ps1"]
        run_b_sh["run_backend.sh"]
        
        run_f_bat["run_frontend.bat"]
        run_f_ps1["run_frontend.ps1"]
        run_f_sh["run_frontend.sh"]
    end
    
    subgraph "Core Scripts"
        run_api["run_api.py<br>Python Backend Runner"]
        next_dev["next dev<br>Next.js Dev Command"]
    end
    
    start.bat --> run_b_bat & run_f_bat
    start.ps1 --> run_b_ps1 & run_f_ps1
    start.sh --> run_b_sh & run_f_sh
    
    run_b_bat & run_b_ps1 & run_b_sh --> run_api
    run_f_bat & run_f_ps1 & run_f_sh --> next_dev
    
    style run_api fill:#bfb,stroke:#333,stroke-width:2px
    style next_dev fill:#bbf,stroke:#333,stroke-width:2px
              `}
            </pre>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Startup Sequence</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
sequenceDiagram
    participant User
    participant Script as Start Script
    participant Backend
    participant Frontend
    
    User->>Script: Run start.bat/start.sh
    Script->>Script: Check ports 8000 and 3000
    Script->>Backend: Start backend (Port 8000)
    Note over Backend: Activates venv & runs FastAPI
    Script->>Frontend: Start frontend (Port 3000)
    Note over Frontend: Runs Next.js dev server
    Backend-->>User: API available at http://localhost:8000
    Frontend-->>User: UI available at http://localhost:3000
              `}
            </pre>
          </div>
        </section>

        {/* Project Roadmap Section */}
        <section id="roadmap" className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Roadmap</h2>
          <p className="text-gray-600 mb-6">
            Below is the planned development roadmap for NotTofu.
          </p>
          
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
gantt
    title NotTofu Test Management Platform Development Roadmap
    dateFormat  YYYY-MM
    section Foundation
    Core UI Components            :done,      foundation1, 2024-03, 1M
    Test Run Management           :done,      foundation2, 2024-03, 1M
    Station & Procedure Views     :done,      foundation3, 2024-04, 1M
    Logo & Navigation Updates     :done,      foundation4, 2024-04, 1M

    section Phase 1: Enhanced UI
    User Experience Improvements  :active,    phase1_1,    2024-05, 2M
    Advanced Filtering & Search   :active,    phase1_2,    2024-05, 1M
    Mobile Responsiveness         :active,    phase1_3,    2024-06, 1M
    
    section Phase 2: Core Features
    Documentation System          :active,    phase2_0,    2024-05, 1M
    Analytics Dashboard           :active,    phase2_1,    2024-05, 2M
    Authentication System         :           phase2_2,    2024-06, 2M
    Export & Reporting            :           phase2_3,    2024-07, 1M
    Notifications                 :           phase2_4,    2024-07, 1M
    
    section Phase 3: Advanced Features
    Settings Management           :active,    phase3_0,    2024-05, 1M
    Account Management            :active,    phase3_1,    2024-05, 1M
    Real-time Updates             :           phase3_2,    2024-08, 1M
    API Integration               :           phase3_3,    2024-09, 2M
              `}
            </pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Feature Roadmap by Area</h3>
          <div className="mb-8 overflow-auto p-4 bg-gray-50 rounded-lg">
            <pre className="mermaid">
              {`
graph TD
    subgraph "UI and User Experience"
        UI_Nav[Navigation System] --> UI_Mobile[Mobile Responsiveness]
        UI_Nav --> UI_Theme[Theming Options]
        UI_Mobile --> UI_Access[Accessibility Features]
        UI_Theme --> UI_Custom[Custom UI Settings]
    end
    
    subgraph "Data Management"
        DM_Runs[Test Runs] --> DM_Export[Data Export]
        DM_Runs --> DM_Import[Data Import]
        DM_Export --> DM_Reports[Custom Reports]
        DM_Import --> DM_Bulk[Bulk Operations]
    end
    
    subgraph "User Management"
        UM_Auth[Authentication] --> UM_Roles[Role-Based Access]
        UM_Auth --> UM_Profiles[User Profiles]
        UM_Roles --> UM_Perms[Fine-grained Permissions]
        UM_Profiles --> UM_Prefs[User Preferences]
    end
    
    subgraph "Analytics and Insights"
        AN_Dash[Analytics Dashboard] --> AN_Custom[Custom Metrics]
        AN_Dash --> AN_Visual[Data Visualizations]
        AN_Custom --> AN_Alerts[Alerts & Thresholds]
        AN_Visual --> AN_Export[Exportable Reports]
    end
              `}
            </pre>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          For more details, explore the full documentation in our <a href="https://github.com/scuba/code/tofu/tree/main/docs" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">GitHub repository</a>.
        </p>
      </div>
    </div>
  );
} 