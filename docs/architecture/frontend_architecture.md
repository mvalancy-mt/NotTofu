# Frontend Architecture

## Component Structure

```mermaid
graph TB
    subgraph Root
        RootLayout[RootLayout]
        Navigation[Navigation]
        MainContent[MainContent]
    end

    subgraph NavigationLinks
        PrimaryNav[Primary Navigation]
        SecondaryNav[Secondary Navigation]
        Navigation --> PrimaryNav
        Navigation --> SecondaryNav
    end

    subgraph Pages
        Welcome[Welcome Page]
        Runs[Test Runs Page]
        RunDetail[Run Detail Page]
        Procedures[Procedures Page]
        Stations[Stations Page]
        StationDetail[Station Detail Page]
    end

    subgraph Components
        Card[Card Components]
        Button[Button Components]
        StatusBadge[Status Badges]
        Tables[Data Tables]
    end

    RootLayout --> Navigation
    RootLayout --> MainContent
    MainContent --> Pages
    Pages --> Components
```

## Layout Structure

```mermaid
graph TB
    subgraph HTML Structure
        HTML[html]
        Body[body]
        Root[Root Div]
        Navigation[Navigation]
        Main[Main Content]
    end

    HTML --> Body
    Body --> Root
    Root --> Navigation
    Root --> Main
```

## File Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Welcome page
│   ├── runs/
│   │   ├── page.tsx         # Test runs list
│   │   └── [id]/
│   │       └── page.tsx     # Test run detail
│   ├── procedures/
│   │   └── page.tsx         # Procedures page
│   ├── stations/
│   │   ├── page.tsx         # Stations page
│   │   └── [id]/
│   │       └── page.tsx     # Station detail
│   └── globals.css          # Global styles
├── components/
│   └── Navigation.tsx       # Navigation component
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies
```

## Component Dependencies

```mermaid
graph TB
    subgraph Core Components
        Navigation[Navigation]
        Card[Card Components]
        Button[Button Components]
        StatusBadge[Status Badges]
    end

    subgraph Page Components
        Welcome[Welcome Page]
        Runs[Test Runs Page]
        RunDetail[Run Detail]
        Procedures[Procedures Page]
        Stations[Stations Page]
        StationDetail[Station Detail]
    end

    Welcome --> Card
    Welcome --> Button
    
    Runs --> Card
    Runs --> Button
    Runs --> StatusBadge
    
    RunDetail --> Card
    RunDetail --> Button
    RunDetail --> StatusBadge
    
    Procedures --> Card
    Procedures --> Button
    Procedures --> StatusBadge
    
    Stations --> Card
    Stations --> Button
    Stations --> StatusBadge
    
    StationDetail --> Card
    StationDetail --> Button
    StationDetail --> StatusBadge
```

## Styling System

```mermaid
graph TB
    subgraph Styles
        Tailwind[Tailwind CSS]
        Global[Global Styles]
        ThemeColors[Theme Colors]
    end

    subgraph Components
        Cards[Card Styles]
        Buttons[Button Styles]
        Forms[Form Elements]
        Tables[Table Styles]
    end

    Tailwind --> Global
    Tailwind --> ThemeColors
    ThemeColors --> Cards
    ThemeColors --> Buttons
    ThemeColors --> Forms
    ThemeColors --> Tables
```

## Key Features

1. **Layout System**
   - Top navigation bar with responsive design
   - Consistent page layout with proper spacing
   - Content sections with cards and containers

2. **Navigation**
   - Primary navigation links with icons
   - Active state highlighting
   - Secondary navigation for settings

3. **Components**
   - Card components for content grouping
   - Status badges (success, error, active)
   - Button components with different variants
   - Form input components

4. **Pages**
   - Welcome page with feature overview
   - Test runs list with filtering
   - Detailed run view with phases and logs
   - Procedures overview with categorization
   - Stations list and detailed station view

## UI State Flow

```mermaid
stateDiagram-v2
    [*] --> Welcome
    Welcome --> Runs: Navigate
    Welcome --> Procedures: Navigate
    Welcome --> Stations: Navigate
    
    state Runs {
        [*] --> RunsList
        RunsList --> RunDetail: Select Run
    }
    
    state Stations {
        [*] --> StationsList
        StationsList --> StationDetail: Select Station
    }
    
    state Procedures {
        [*] --> ProceduresList
        ProceduresList --> ProcedureDetail: Select Procedure
    }
```

## Development Priorities

1. **Current Status**
   - ✅ Page layout with navigation
   - ✅ Welcome page
   - ✅ Test runs list and detail view
   - ✅ Procedures page
   - ✅ Stations page and detail view
   - ✅ Consistent styling with Tailwind

2. **Next Steps**
   - Improved form components
   - Advanced filtering and search
   - Data visualization components
   - Mobile responsiveness enhancements

3. **Upcoming Features**
   - Authentication and user profiles
   - Real-time updates
   - Customizable dashboards
   - Export and report generation 