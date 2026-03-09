# Tora – Roles & Permissions

## Role Definitions

| Role              | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `ADMIN`           | Full system access — manage users, projects, transactions, reports, audit logs |
| `FINANCE_OFFICER` | Approve/reject transactions, view all reports, manage budgets                  |
| `FIELD_OFFICER`   | Create transactions only, view own submissions                                 |

---

## Permission Matrix

| Action                 | ADMIN | FINANCE_OFFICER | FIELD_OFFICER |
| ---------------------- | ----- | --------------- | ------------- |
| Login                  | ✅    | ✅              | ✅            |
| Create project         | ✅    | ❌              | ❌            |
| Edit project           | ✅    | ❌              | ❌            |
| Delete project         | ✅    | ❌              | ❌            |
| Create transaction     | ✅    | ✅              | ✅            |
| Approve transaction    | ✅    | ✅              | ❌            |
| Reject transaction     | ✅    | ✅              | ❌            |
| View all transactions  | ✅    | ✅              | Own only      |
| View reports/dashboard | ✅    | ✅              | ❌            |
| View audit logs        | ✅    | ❌              | ❌            |
| Manage users           | ✅    | ❌              | ❌            |

---

## Role Enum (Prisma)

```prisma
enum Role {
  ADMIN
  FINANCE_OFFICER
  FIELD_OFFICER
}
```

---

## How Roles Are Enforced

### 1. Server-side (API Routes)

```typescript
// Every protected route does:
const session = await getServerSession(authOptions);
if (!session)
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
if (session.user.role !== "FINANCE_OFFICER") {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

### 2. Middleware

```typescript
// middleware.ts guards all /dashboard routes
// redirects to /login if no session cookie
```

### 3. UI (conditional rendering)

```tsx
// Components conditionally render actions based on role
{
  session.user.role === "FINANCE_OFFICER" && (
    <ApproveButton transactionId={tx.id} />
  );
}
```
