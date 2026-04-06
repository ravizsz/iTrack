# iTrack

A hacker-themed global tracking dashboard with simulated data. Features an interactive world map, terminal-style boot sequence, AI scan interface, and real-time activity feed.

**All data is mock/simulated. No real tracking functionality.**

![iTrack Dashboard](https://img.shields.io/badge/Status-OPERATIONAL-00ff00?style=flat-square&labelColor=0a0a0a)

## Features

- **Interactive World Map** - Dark-themed Leaflet map with target markers, location trails, and fly-to animations
- **Boot Sequence** - Hacker-style terminal animation with typing effects and progress bar
- **Global Scanner** - Search interface with 6 scan types (Phone, Email, Face, Voice, Behavior, Network)
- **Live Activity Feed** - Real-time simulated intercepts, alerts, and location updates
- **Target Profiles** - Detailed dossiers with AI analysis (behavior score, voice/face match, emotional state)
- **Location Trails** - Movement history with dashed polylines on the map
- **System Stats** - Live system metrics with animated progress bars

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Leaflet / react-leaflet (maps)
- Lucide React (icons)

### Backend
- Python / FastAPI
- In-memory mock data (no database required)

## Project Structure

```
itrack/
├── README.md
├── itrack-frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx              # Main app component (state + layout)
│       ├── index.css            # Global styles + hacker effects
│       ├── types/
│       │   └── index.ts         # TypeScript interfaces (Target, ScanResult, ActivityItem)
│       ├── config/
│       │   └── index.ts         # API URL + boot sequence lines
│       ├── utils/
│       │   └── colors.ts        # Threat/status color mapping
│       └── components/
│           ├── BootScreen.tsx    # Terminal boot animation
│           ├── StatsBar.tsx      # System statistics display
│           ├── ActivityFeed.tsx  # Real-time activity log
│           ├── ScanPanel.tsx     # Search/scan interface
│           ├── ScanResults.tsx   # Scan results grid
│           ├── TargetDetail.tsx  # Full target profile modal
│           ├── TargetList.tsx    # Sidebar target list
│           ├── TypingText.tsx    # Animated typing effect
│           └── MapFlyTo.tsx      # Leaflet map fly-to helper
└── itrack-backend/
    ├── pyproject.toml
    └── app/
        ├── main.py              # FastAPI app + CORS + router registration
        ├── data/
        │   └── targets.py       # Mock targets, stats, activities data
        └── routes/
            ├── targets.py       # GET /api/targets, /api/targets/{id}
            ├── stats.py         # GET /api/stats
            ├── scan.py          # GET /api/scan?q=...
            └── activity.py      # GET /api/activity-feed
```

## Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm

### Backend

```bash
cd itrack-backend
pip install fastapi uvicorn
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at `http://localhost:8000`

### Frontend

```bash
cd itrack-frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

### Environment Variables

Create a `.env` file in `itrack-frontend/`:

```
VITE_API_URL=http://localhost:8000
```

For production, set this to your deployed backend URL.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/healthz` | Health check |
| GET | `/api/targets` | List all targets (summary) |
| GET | `/api/targets/{id}` | Get full target details |
| GET | `/api/stats` | System statistics |
| GET | `/api/scan?q=query` | Run simulated scan |
| GET | `/api/activity-feed` | Get activity feed |

## Build for Production

```bash
cd itrack-frontend
npm run build
```

Output is in `itrack-frontend/dist/`.

## Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#0a0a0a` | Background |
| Green | `#00ff00` | Active/Low threat |
| Red | `#ff0000` | Critical/Alerts |
| White | `#e0e0e0` | Text |
| Amber | `#ffaa00` | Medium/Dormant |
| Blue | `#4488ff` | Monitoring |

## License

MIT
