# Tora – Project Overview

## What is Tora?

**Tora** is a Field Finance Tracker application — a demo MVP designed to showcase how
organizations (NGOs, development agencies, field-based teams) can:

- Capture **real-time financial transactions** from distributed field locations
- Link expenses to **specific projects and activities**
- Run a **structured approval workflow** (Field Officer → Finance Officer)
- Monitor **budget utilization** across multiple projects
- Generate **audit-ready financial reports**

---

## Problem Being Solved

Organizations managing field operations often struggle with:

| Problem                        | Impact                             |
| ------------------------------ | ---------------------------------- |
| Paper-based expense capture    | Delays, data loss, errors          |
| No real-time budget visibility | Over-spending goes undetected      |
| Informal approval chains       | Fraud risk, lack of accountability |
| Manual reporting               | Slow, inaccurate, time-consuming   |

**Tora** solves all four with a clean, role-based digital system.

---

## Project Name

**Tora – Financial Activity Monitoring System**
(Previously internally referenced as FieldTrack Lite)

---

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | Next.js 14 + TypeScript + Tailwind CSS          |
| Backend    | Next.js API Routes (App Router)                 |
| Database   | PostgreSQL (via Prisma ORM)                     |
| Auth       | NextAuth.js (JWT sessions)                      |
| Deployment | Vercel (frontend + API) + Supabase (PostgreSQL) |

> **Note:** The user confirmed: use **Next.js for both frontend and backend** (API Routes,
> no separate Django backend needed for this MVP).

---

## Timeline (7-Day MVP)

| Day | Focus                                                 |
| --- | ----------------------------------------------------- |
| 1   | DB schema (Prisma), auth setup (NextAuth), seed roles |
| 2   | Projects CRUD API + UI                                |
| 3   | Transactions API + approval logic + budget guard      |
| 4   | Dashboard (totals, charts)                            |
| 5   | Finance approval UI + Field Officer form              |
| 6   | Audit logs, reports page, polish                      |
| 7   | Deploy, README, demo video                            |
