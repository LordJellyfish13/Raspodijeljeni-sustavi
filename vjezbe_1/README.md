# The Little Honda Museum

A little museum of iconic Honda road cars, built for a distributed systems course. The frontend and backend are separate services that deploy independently and talk over a public REST API.

| Part | Stack | Folder |
| --- | --- | --- |
| Frontend | Vue 3, TypeScript, Vite | `frontend_app/` |
| Backend | Python, FastAPI | `backend_app/` |

## Run it locally

You need Python 3.12, Node 24 and two terminals. Both sets of commands start in this folder.

**Backend**, on http://localhost:8000 (interactive API docs at `/docs`):

```powershell
cd backend_app
python -m venv .venv
.\.venv\Scripts\python -m pip install -r requirements-dev.txt
.\.venv\Scripts\python -m uvicorn app.main:app --reload
```

**Frontend**, on http://localhost:5173:

```powershell
cd frontend_app
npm install
npm run dev
```

Run the backend tests from `backend_app/` with `.\.venv\Scripts\python -m pytest`. In VS Code, choose `backend_app/.venv` with **Python: Select Interpreter** so the editor can see the packages.

## Add the photos

Put one photo per car in `frontend_app/public/images/cars/`, using exactly these names:

`s800.jpg`, `civic.jpg`, `crx.jpg`, `nsx.jpg`, `ek9.jpg`, `s2000.jpg`

- File names are case-sensitive once deployed, so use `.jpg` rather than `.JPG` or `.jpeg`. To use another format, change that car's `image` in `backend_app/app/data/cars.json`.
- Photos are center-cropped to fill their frame. Landscape shots around 3:2 and 1600 px wide work best. Keep each one under about 500 KB so pages load quickly.
- A car without a photo shows "Photo coming soon".
- Each car's specs describe one version, named under "Specs for". If a photo shows a different version, update the car's details to match.

## Change the cars

All car data lives in `backend_app/app/data/cars.json`. Restart the backend after editing it. The file is checked at startup, so a missing or misspelled field stops the backend with an error that names it.

## API

| Method | Path | Returns |
| --- | --- | --- |
| GET | `/api/cars` | Every car, oldest first |
| GET | `/api/cars/{id}` | One car, or a 404 if the id is unknown |
| GET | `/health` | Service status, used by Render's health check |
| GET | `/docs` | Interactive API docs |

## Deploy to Render

The frontend and backend are two separate services, each with its own URL and deploys. Render builds from GitHub, so push your changes first. After that, each push to `main` redeploys automatically.

Create the backend with **New > Web Service**:

| Setting | Value |
| --- | --- |
| Name | `honda-museum-api` |
| Branch | `main` |
| Region | Frankfurt |
| Root Directory | `vjezbe_1/backend_app` |
| Language | Python |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| Instance Type | Free |
| Health Check Path (under **Advanced**) | `/health` |
| `PYTHON_VERSION` variable | `3.12.16` |
| `CORS_ORIGINS` variable | The frontend's URL, such as `https://honda-museum.onrender.com` |

Create the frontend with **New > Static Site**:

| Setting | Value |
| --- | --- |
| Name | `honda-museum` |
| Branch | `main` |
| Root Directory | Leave empty |
| Build Command | `cd vjezbe_1/frontend_app && npm ci --include=dev && npm run build` |
| Publish Directory | `vjezbe_1/frontend_app/dist` |
| `NODE_VERSION` variable | `24.22.1` |
| `VITE_API_URL` variable | The backend's URL, such as `https://honda-museum-api.onrender.com` |

Compare both variables with the real URLs in the dashboard, because Render changes a name that's already taken. If either differs, correct the variable on that service and redeploy it. The frontend reads `VITE_API_URL` while building, so it needs a rebuild to pick up a change.

To stop unrelated pushes from rebuilding the frontend, add `vjezbe_1/frontend_app/**` to its included paths under **Settings > Build & Deploy > Build Filters**.

On Render's free plan:

- The backend sleeps after 15 minutes without traffic and takes about a minute to wake. The frontend shows a notice and keeps retrying, but open the site a minute before a demo.
- The backend's disk is wiped on every restart, so don't keep uploads or a SQLite database there.
