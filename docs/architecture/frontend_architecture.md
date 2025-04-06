# Frontend Architecture

## Component Structure

```mermaid
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
```

## Navigation and Layout

```mermaid
graph TB
    subgraph Navigation
        MainNav[Top Navigation Bar]
        Logo[Logo + App Name]
        NavLinks[Navigation Links]
        NavIcons[Navigation Icons]
    end

    subgraph NavItems
        Home[Home]
        Runs[Test Runs]
        Procedures[Procedures]
        Stations[Stations]
        Analytics[Analytics]
        Docs[Documentation]
        Settings[Settings]
        Status[API Status]
        Account[Account]
    end

    MainNav --> Logo
    MainNav --> NavLinks
    NavLinks --> NavIcons
    NavLinks --> NavItems
```

## File Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Welcome page with centered logo
│   ├── loading.tsx          # Global loading component
│   ├── error.tsx            # Global error component
│   ├── config.ts            # Configuration including API URL
│   ├── globals.css          # Global styles
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
│   ├── analytics/
│   │   └── page.tsx         # Analytics dashboard
│   ├── docs/
│   │   └── page.tsx         # Documentation page
│   ├── settings/
│   │   └── page.tsx         # Settings page
│   ├── status/
│   │   └── page.tsx         # API status page
│   └── account/
│       └── page.tsx         # Account management
├── components/
│   ├── Logo.tsx             # Logo component
│   └── Navigation.tsx       # Navigation component
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies
```

## Component Hierarchy

```mermaid
graph TB
    subgraph Core Components
        Layout[layout.tsx]
        Navigation[Navigation.tsx]
        Logo[Logo.tsx]
        Loading[loading.tsx]
        Error[error.tsx]
    end

    subgraph Page Components
        Home[page.tsx]
        Runs[runs/page.tsx]
        RunDetail[runs/[id]/page.tsx]
        Procedures[procedures/page.tsx]
        Stations[stations/page.tsx]
        StationDetail[stations/[id]/page.tsx]
        Analytics[analytics/page.tsx]
        Docs[docs/page.tsx]
        Settings[settings/page.tsx]
        Status[status/page.tsx]
        Account[account/page.tsx]
    end

    Layout --> Navigation
    Navigation --> Logo
    Layout --> Home
    Layout --> Runs
    Layout --> RunDetail
    Layout --> Procedures
    Layout --> Stations
    Layout --> StationDetail
    Layout --> Analytics
    Layout --> Docs
    Layout --> Settings
    Layout --> Status
    Layout --> Account
    Layout --> Loading
    Layout --> Error
    Home --> Logo
```

## Homepage Structure

```mermaid
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
```

## UI Interaction Flow

```mermaid
stateDiagram-v2
    [*] --> HomePage
    HomePage --> Runs: Navigate
    HomePage --> Procedures: Navigate
    HomePage --> Stations: Navigate
    HomePage --> Analytics: Navigate
    HomePage --> Docs: Navigate
    HomePage --> Settings: Navigate
    HomePage --> Status: Navigate
    HomePage --> Account: Navigate
    
    state Runs {
        [*] --> RunsList
        RunsList --> RunDetail: Select Run
    }
    
    state Stations {
        [*] --> StationsList
        StationsList --> StationDetail: Select Station
    }
```

## Styling System

```mermaid
graph TB
    subgraph Styles
        Tailwind[Tailwind CSS]
        Global[Global Styles]
        ThemeColors[Theme Colors]
        HeroIcons[Hero Icons]
    end

    subgraph Components
        Cards[Card Styles]
        Buttons[Button Styles]
        Forms[Form Elements]
        Tables[Table Styles]
        NavStyles[Navigation Styles]
        LogoStyles[Logo Styles]
    end

    Tailwind --> Global
    Tailwind --> ThemeColors
    ThemeColors --> Cards
    ThemeColors --> Buttons
    ThemeColors --> Forms
    ThemeColors --> Tables
    ThemeColors --> NavStyles
    ThemeColors --> LogoStyles
    HeroIcons --> NavStyles
    HeroIcons --> Cards
```

## Implementation Status

1. **Completed Features**
   - ✅ Navigation system with all page links
   - ✅ Logo component with adjustable size
   - ✅ Home page with centered logo and navigation grid
   - ✅ Test runs pages
   - ✅ Procedures page
   - ✅ Stations pages
   - ✅ API Status page
   - ✅ Error and loading states

2. **In Progress**
   - 🔄 Analytics dashboard
   - 🔄 Documentation system
   - 🔄 Settings page
   - 🔄 Account management
   - 🔄 Mobile responsiveness

3. **Planned Features**
   - Authentication system
   - Advanced filtering
   - Data export
   - Real-time updates
   - Customizable dashboard 