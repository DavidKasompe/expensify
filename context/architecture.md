# Tora – System Architecture

## High-Level Design

```
┌─────────────────────────────────────────────────────────┐
│                      VERCEL (Deployment)                │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Next.js 14 (App Router)              │   │
│  │                                                 │   │
│  │  ┌─────────────────┐  ┌────────────────────┐   │   │
│  │  │   Frontend Pages │  │   API Routes        │   │   │
│  │  │   (RSC + Client) │  │   /api/auth/*       │   │   │
│  │  │                  │  │   /api/projects/*   │   │   │
│  │  │  / (landing)     │  │   /api/transactions │   │   │
│  │  │  /dashboard      │  │   /api/reports/*    │   │   │
│  │  │  /projects       │  │   /api/audit-logs/* │   │   │
│  │  │  /transactions   │  └────────────────────┘   │   │
│  │  │  /reports        │                            │   │
│  │  └─────────────────┘                            │   │
│  └─────────────────────────────────────────────────┘   │
│                           │                             │
│                    Prisma ORM                           │
│                           │                             │
│  ┌────────────────────────▼───────────────────────┐    │
│  │          PostgreSQL (Supabase)                  │    │
│  │   users | projects | transactions | audit_logs  │    │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Auth Flow

```
User Login (email + password)
         │
         ▼
  NextAuth.js Credentials Provider
         │
         ▼
  Validate against DB (bcrypt)
         │
         ▼
  JWT Session (role embedded)
         │
   ┌─────┴──────────────────┐
   │                        │
ADMIN             FINANCE_OFFICER / FIELD_OFFICER
Full access       Scoped API access via middleware
```

---

## Middleware (Role Guards)

```typescript
// middleware.ts
// protects /dashboard, /projects, /transactions, /reports
// redirects unauthenticated users to /login
// enforces role-based route rules server-side
```

---

## Database Schema Overview

```
users
  id, name, email, password_hash, role, created_at

projects
  id, name, location, budget, start_date, end_date, created_by, created_at

transactions
  id, project_id (FK), amount, category, description, date,
  status (PENDING|APPROVED|REJECTED), receipt_url,
  created_by (FK), approved_by (FK), approved_at, created_at, updated_at

audit_logs
  id, user_id (FK), action, entity_type, entity_id, meta (JSON), created_at
```

---

## API Routes Structure

```
app/
  api/
    auth/
      [...nextauth]/route.ts     ← NextAuth handler
    projects/
      route.ts                   ← GET (list) / POST (create)
      [id]/route.ts              ← GET / PUT / DELETE
    transactions/
      route.ts                   ← GET (list) / POST (create)
      [id]/route.ts              ← GET / PUT
      [id]/approve/route.ts      ← PATCH (Finance only)
      [id]/reject/route.ts       ← PATCH (Finance only)
    reports/
      summary/route.ts           ← totals + budget utilization
      monthly/route.ts           ← monthly spend aggregation
    audit-logs/
      route.ts                   ← GET (Admin only)
```

---

## Security Considerations

1. **JWT sessions** – tokens expire, scoped to user role
2. **Server-side role checks** – every API route validates `session.user.role`
3. **Prisma parameterized queries** – no SQL injection risk
4. **Budget guard** – transaction creation validates `project.budget - spent >= amount`
5. **Middleware protection** – all `/dashboard/*` routes require auth
6. **Password hashing** – bcryptjs, 12 salt rounds
