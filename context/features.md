# Tora – Feature Specifications

## 1. Authentication & Role Management

- Email/password login via NextAuth (credentials provider)
- JWT session with embedded `role` field
- Auto-redirect to `/dashboard` on login success
- Auto-redirect to `/login` when session expires
- Seed script for 3 demo users (one per role)

---

## 2. Projects

**Fields:**

- `name` — string
- `location` — string
- `budget` — decimal (total allocated budget)
- `start_date` — date
- `end_date` — date
- `created_by` — User FK
- `created_at` — timestamp

**API Endpoints:**

- `GET /api/projects` — list all
- `POST /api/projects` — create (Admin only)
- `GET /api/projects/:id` — single project details + budget utilization
- `PUT /api/projects/:id` — update (Admin only)
- `DELETE /api/projects/:id` — delete (Admin only)

---

## 3. Transactions

**Fields:**

- `project` — Project FK
- `amount` — decimal
- `category` — enum: `TRANSPORT | SUPPLIES | ALLOWANCE | ACCOMMODATION | COMMUNICATION | OTHER`
- `description` — string
- `date` — date
- `status` — enum: `PENDING | APPROVED | REJECTED`
- `receipt_url` — string (optional file upload)
- `created_by` — User FK
- `approved_by` — User FK (nullable)
- `approved_at` — timestamp (nullable)
- `created_at`, `updated_at` — timestamps

**API Endpoints:**

- `GET /api/transactions` — list (Finance/Admin: all; Field: own)
- `POST /api/transactions` — create (all roles)
- `GET /api/transactions/:id` — single
- `PATCH /api/transactions/:id/approve` — Finance/Admin only
- `PATCH /api/transactions/:id/reject` — Finance/Admin only

**Budget Guard:** Before creating a transaction, check:

```
project.budget - sum(approved transactions for project) >= amount
```

---

## 4. Dashboard

**Cards:**

- Total Budget (across all projects)
- Total Spent (approved transactions)
- Remaining Budget
- Pending Transactions Count
- Approved This Month
- Rejected Total

**Chart:**

- Monthly spending bar chart (last 6 months)
- Per-project budget utilization bar chart

---

## 5. Reports Page

- Filter by project, date range, category, status
- Export to CSV (basic)
- Summary table: total by category

---

## 6. Audit Logs (Admin only)

**Recorded events:**

- User login
- Transaction created
- Transaction approved/rejected
- Project created/updated

**Fields:** `user`, `action`, `entity_type`, `entity_id`, `meta`, `created_at`

---

## 7. Receipt Upload

- File input on transaction form
- Stored as URL (can use Vercel Blob or local public path for MVP)
- Displayed as link/thumbnail in transaction detail

---

## 8. Approval Workflow UI

Finance Officer dashboard panel:

- Table of PENDING transactions
- One-click Approve / Reject with optional note
- Status badge updates in real time (optimistic UI via React state)
