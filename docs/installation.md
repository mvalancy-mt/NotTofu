# NotTofu Installation & Setup Guide

This guide provides detailed instructions for setting up and running the NotTofu application on various operating systems.

## System Overview

```mermaid
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
```

## Prerequisites

Before installing NotTofu, ensure your system meets the following requirements:

- **Node.js** v16 or later
- **Python** 3.9 or later
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## Installation Process

```mermaid
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
```

## Available Scripts

NotTofu provides multiple script options for different operating systems:

```mermaid
graph TB
    subgraph "Script Types"
        Setup["Setup Scripts"]
        Start["Start Scripts"]
        Run["Run Scripts"]
    end
    
    subgraph "Operating Systems"
        Windows["Windows<br>(.bat/.ps1)"]
        Unix["Unix/Linux/macOS<br>(.sh)"]
    end
    
    Setup --> setup.bat & setup.ps1 & setup.sh
    Start --> start.bat & start.ps1 & start.sh
    Run --> run_backend.bat & run_backend.ps1 & run_backend.sh
    Run --> run_frontend.bat & run_frontend.ps1 & run_frontend.sh
    
    setup.bat & start.bat & run_backend.bat & run_frontend.bat --> Windows
    setup.ps1 & start.ps1 & run_backend.ps1 & run_frontend.ps1 --> Windows
    setup.sh & start.sh & run_backend.sh & run_frontend.sh --> Unix
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nottofu.git
cd nottofu
```

### 2. Run the Setup Script

#### Windows (Command Prompt)
```
setup.bat
```

#### Windows (PowerShell)
```
.\setup.ps1
```

#### Linux/macOS
```
chmod +x setup.sh
./setup.sh
```

## Running the Application

NotTofu can be started with a single command that launches both the frontend and backend:

```mermaid
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
```

### Start with Default Ports

#### Windows
```
start.bat
```

#### Linux/macOS
```
./start.sh
```

### Start with Custom Ports

You can specify custom ports for both the backend and frontend:

#### Windows
```
start.bat 9000 4000
```

#### Linux/macOS
```
./start.sh 9000 4000
```

This will start the backend on port 9000 and the frontend on port 4000.

## Starting Components Individually

If you prefer to start each component separately:

### Backend Server

#### Windows
```
run_backend.bat [port]
```

#### Linux/macOS
```
./run_backend.sh [port]
```

### Frontend Server

#### Windows
```
run_frontend.bat [port]
```

#### Linux/macOS
```
./run_frontend.sh [port]
```

## Script Architecture

```mermaid
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
```

## Troubleshooting

### Port Conflicts

If you see an error about ports already in use:

```
Error: Address already in use: bind
```

Use custom ports when starting the application:

```
start.bat 9000 4000  # Windows
./start.sh 9000 4000  # Linux/macOS
```

### Python Environment Issues

If you encounter Python module import errors:

1. Ensure the virtual environment is activated:
   ```
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/macOS
   ```

2. Reinstall Python dependencies:
   ```
   pip install -r requirements.txt
   ```

### Next.js Configuration

If you see warnings about Next.js configuration:

```
⚠ Invalid next.config.js options detected
```

Check the `frontend/next.config.js` file to ensure it's compatible with your Next.js version.

## Directory Structure

```
/
├── app/                    # Backend API application
├── frontend/               # Next.js frontend application
├── docs/                   # Documentation
├── setup.bat               # Windows setup script
├── setup.ps1               # PowerShell setup script
├── setup.sh                # Unix setup script
├── start.bat               # Windows start script
├── start.ps1               # PowerShell start script
├── start.sh                # Unix start script
├── run_backend.bat         # Windows backend script
├── run_backend.ps1         # PowerShell backend script
├── run_backend.sh          # Unix backend script
├── run_frontend.bat        # Windows frontend script
├── run_frontend.ps1        # PowerShell frontend script
├── run_frontend.sh         # Unix frontend script
├── run_api.py              # Python API runner
├── requirements.txt        # Python dependencies
└── README.md               # Project overview
```

## Next.js 14 Configuration

Next.js 14 introduced some changes to configuration options, particularly around CORS handling. The NotTofu application uses Next.js middleware to manage CORS settings:

```mermaid
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
```

### CORS Configuration

In previous versions of Next.js, `allowedDevOrigins` could be specified in the experimental section of the configuration. In Next.js 14, this is handled via middleware:

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', '*');
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  return response;
}
```

This middleware runs on all API routes and sets the appropriate CORS headers, enabling cross-origin access to your API endpoints. 