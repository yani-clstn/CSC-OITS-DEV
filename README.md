# CS Clique — Org Management Platform

A management platform for Computer Science Clique: events, cross-committee
to-dos, MOTM logging, and a document repository, gated across three tiers
(public, member, officer).

## Stack

- **Frontend:** React 19 + Vite, React Router
- **Styling:** Tailwind CSS v4 (Watermelon UI–inspired: rounded-2xl cards,
  soft shadows, blue #1D4ED8 + white palette, Space Grotesk / Inter type)
- **Backend/data model:** Drizzle ORM schema targeting Neon (Postgres)

## What's here right now

Every page is real, interactive React — RSVPs toggle, to-do statuses cycle,
MOTM search/filter works, document uploads show a working form — but all of
it runs on **local component state and mock data** (`src/data/mockData.js`).
Nothing persists yet or hits a real database. The Drizzle schema
(`src/db/schema.js`) is fully modeled and ready to migrate against a real
Neon database, but nothing in the app calls it yet.

## Run it

```bash
npm install
npm run dev
```

Routes:
- `/` — public landing (hero, officers, events, Join Us form)
- `/member` — member dashboard (`/member/events`, `/member/todos`, `/member/documents`)
- `/officer` — officer dashboard (`/officer/events`, `/officer/todos`, `/officer/motm`, `/officer/documents`, `/officer/members`)

There's no auth yet, so all three are reachable directly by URL for now.

## Wiring up the real backend (next steps)

1. **Create a Neon project** at neon.tech and grab your connection string.
2. Create a `.env` file in the project root:
   ```
   DATABASE_URL=postgres://<user>:<password>@<host>/<db>?sslmode=require
   ```
3. Push the schema:
   ```bash
   npx drizzle-kit push
   ```
   This creates the `users`, `applications`, `events`, `rsvps`, `todos`,
   `motm`, and `documents` tables from `src/db/schema.js`.
4. **Add an API layer.** This Vite app is frontend-only — you'll need a
   backend (a few good fits: a small Express/Fastify server, or move the
   whole thing to Next.js/Remix for built-in API routes) to expose
   endpoints like `POST /api/events`, `POST /api/todos/:id/status`, etc.,
   which read/write through Drizzle.
5. **Auth & role-gating.** Options roughly in order of setup effort:
   - **Clerk** or **Auth.js (NextAuth)** — fastest to wire up, handles
     sessions for you; you'd map their user to your `users.role` column.
   - **Custom JWT** — more control, more to build (password hashing,
     session handling, refresh tokens).
   Once auth exists, wrap `/member/*` and `/officer/*` routes in a guard
   that checks `role`, and protect the corresponding API routes too.
6. **File uploads.** The upload UI in `/officer/documents` is currently a
   local-state stand-in. Wire the `<input type="file">` to a real storage
   provider (Vercel Blob, S3, or Cloudinary all work well with
   Neon/Vercel), save the returned URL into `documents.fileUrl`.

## Project structure

```
src/
  components/       shared UI (Logo, StatCard, StatusBadge, nav/sidebar)
  data/mockData.js  realistic placeholder data — swap for API calls
  db/schema.js       Drizzle schema (source of truth for the DB shape)
  pages/
    PublicLanding.jsx
    member/          member-tier pages + layout
    officer/          officer-tier pages + layout
drizzle.config.js    drizzle-kit config (reads DATABASE_URL)
```
