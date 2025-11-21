# CinePulse

CinePulse is a MERN-stack movie reviews & info site scaffold with a stylish, film-focused UI.

This repo contains two main folders:

- `backend` — Express + MongoDB API
- `frontend` — Vite + React (Tailwind + Framer Motion)

Quick start

1. Install and run MongoDB locally (or provide `MONGO_URI` in `.env`).

Backend

```cmd
cd backend
npm install
copy .env.example .env
:: edit .env to set MONGO_URI if needed
npm run seed    :: optional - seed sample movies
npm run dev
```

Frontend

```cmd
cd frontend
npm install
npm run dev
```

The frontend Vite dev server proxies `/api` to `http://localhost:5000` by default.

What I scaffolded

- Backend: Express server, `Movie` and `Review` models, CRUD routes, seed script.
- Frontend: Vite React app with Tailwind, Framer Motion; pages for home and movie details; embedded trailers.

Next steps (suggested)

- Add authentication (JWT) and user accounts
- Add image uploads (Cloud storage) and richer media pages
- Add search, filters, pagination, ratings breakdown
- Improve UI with custom artwork, animations and transitions

If you want, I can now:

- implement auth and protected admin CRUD
- add full CRUD UI for adding/editing movies
- connect to a managed MongoDB and deploy

CinePulse
