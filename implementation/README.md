# Tora Implementation Folder

This folder contains the full-stack Next.js implementation for the **Tora Field Finance Tracker**.

## Folder Structure

```
implementation/
  prisma/
    schema.prisma       ← Complete DB schema (User, Project, Transaction, AuditLog)
  app/
    (auth)/
      login/page.tsx    ← Login page
    (dashboard)/
      layout.tsx        ← Protected layout with sidebar
      dashboard/page.tsx
      projects/
        page.tsx        ← Projects list
        new/page.tsx    ← Create project form
        [id]/page.tsx   ← Single project detail
      transactions/
        page.tsx        ← Transactions list
        new/page.tsx    ← Create transaction form
        [id]/page.tsx   ← Transaction detail + approve/reject
      reports/page.tsx  ← Reports & CSV export
      audit-logs/page.tsx ← Admin audit log viewer
    api/
      auth/[...nextauth]/route.ts
      projects/route.ts
      projects/[id]/route.ts
      transactions/route.ts
      transactions/[id]/route.ts
      transactions/[id]/approve/route.ts
      transactions/[id]/reject/route.ts
      reports/summary/route.ts
      reports/monthly/route.ts
      audit-logs/route.ts
  lib/
    auth.ts             ← NextAuth config
    db.ts               ← Prisma client singleton
    permissions.ts      ← Role guard helpers
  middleware.ts         ← Route protection
  seed.ts               ← Demo data seed script
```

## How to Run

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Fill in: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# Run migrations
npx prisma migrate dev --name init

# Seed demo data
npx ts-node seed.ts

# Start dev server
npm run dev
```

## Demo Users (after seeding)

| Role            | Email             | Password |
| --------------- | ----------------- | -------- |
| Admin           | admin@tora.demo   | demo1234 |
| Finance Officer | finance@tora.demo | demo1234 |
| Field Officer   | field@tora.demo   | demo1234 |
