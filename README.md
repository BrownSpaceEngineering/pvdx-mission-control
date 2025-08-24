# Monorepo for Brown Space Engineering's PVDX Mission Control Repo and Ground Station Services

## Project Structure

- `/webapp` - Frontend and backend for the PVDX Mission Control Web App
- `/ground_station` - Services for web app integration with the PVDX ground station
                    NOTE: Ground station code is separate, this repo only concerns
                    itself with web app-ground station interaction
- `/services` - Service configs for running web app deployment, frontend, backend, database

## Running/Building the Project (IN PROGRESS)

### `/webapp`

- `/webapp/frontend`
Run `npm install` to install dependencies, `npm run dev`
to launch next.js development server.

- `/webapp/backend`
Run `uv sync` to synchronize dependencies
then activate the virtual environment with
`source .venv/bin/activate`.

### `/ground_station`

Run `uv sync` to synchronize dependencies
then activate the virtual environment with
`source .venv/bin/activate`.
