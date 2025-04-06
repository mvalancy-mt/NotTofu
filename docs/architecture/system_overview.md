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

## Application Structure

```mermaid
graph TB
    subgraph "Frontend Application"
        HPage[Home Page]
        RunsPage[Test Runs Page]
        ProcPage[Procedures Page]
        StatPage[Stations Page]
        AnalPage[Analytics Page]
        DocPage[Documentation Page]
        SetPage[Settings Page]
        ApiPage[API Status Page]
        AccPage[Account Page]
        
        Nav[Navigation Component]
        Logo[Logo Component]
        
        Nav --> HPage & RunsPage & ProcPage & StatPage & AnalPage & DocPage & SetPage & ApiPage & AccPage
        Logo --> Nav
    end

    subgraph "Page Structure"
        MainLayout[Main Layout]
        ContentArea[Content Area]
        ErrorBoundary[Error Handling]
        LoadingState[Loading States]
        
        MainLayout --> Nav
        MainLayout --> ContentArea
        ContentArea --> ErrorBoundary
        ContentArea --> LoadingState
    end
```

## Data Flow

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
    
    Note over UI,API: API Status Check
    UI->>API: GET /status
    API-->>UI: System Health Status
```

## Current Architecture Implementation

```mermaid
graph TB
    subgraph "Frontend Structure"
        Layout[layout.tsx]
        HomePage[page.tsx]
        LoadingPage[loading.tsx]
        ErrorPage[error.tsx]
        ConfigFile[config.ts]
        
        subgraph "Page Routes"
            Runs["/runs"]
            Procedures["/procedures"]
            Stations["/stations"]
            Analytics["/analytics"]
            Docs["/docs"]
            Settings["/settings"]
            Status["/status"]
            Account["/account"]
        end
        
        subgraph "Components"
            LogoComp[Logo.tsx]
            NavComp[Navigation.tsx]
        end
        
        Layout --> HomePage
        Layout --> Runs & Procedures & Stations & Analytics & Docs & Settings & Status & Account
        Layout --> NavComp
        NavComp --> LogoComp
        HomePage --> LogoComp
    end
    
    style Layout fill:#f9f,stroke:#333,stroke-width:2px
    style HomePage fill:#bbf,stroke:#333,stroke-width:2px
    style NavComp fill:#bfb,stroke:#333,stroke-width:2px
    style LogoComp fill:#bfb,stroke:#333,stroke-width:2px
```

## Implementation Status

### Frontend (Active Development)
1. **Completed**
   - ✅ Page layout with navigation
   - ✅ Welcome page with centered logo
   - ✅ Test runs list and detail view
   - ✅ Procedures page
   - ✅ Stations page and detail view
   - ✅ API Status page
   - ✅ Consistent styling with Tailwind

2. **In Progress**
   - 🔄 Account management
   - 🔄 Analytics dashboard
   - 🔄 Documentation system
   - 🔄 Settings page
   - 🔄 Mobile optimizations

3. **Planned**
   - Authentication and user management
   - Export and reporting
   - Customizable dashboard
   - Real-time updates

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