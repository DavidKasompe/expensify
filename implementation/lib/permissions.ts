import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';


/**
 * Get the current session and return the user, or return a 401 response.
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { user: session.user as { id: string; email: string; name: string; role: string }, error: null };
}

/**
 * Require a specific role (or one of multiple roles).
 */
export async function requireRole(...roles: string[]) {
  const { user, error } = await requireAuth();
  if (error) return { user: null, error };
  if (!roles.includes((user as any).role)) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    };
  }
  return { user, error: null };
}

/**
 * Check if user can view transactions:
 * - ADMIN and FINANCE_OFFICER see all
 * - FIELD_OFFICER sees only own
 */
export function canViewAllTransactions(role: string): boolean {
  return role === 'ADMIN' || role === 'FINANCE_OFFICER';
}

/**
 * Check if user can approve/reject transactions.
 */
export function canApproveTransactions(role: string): boolean {
  return role === 'ADMIN' || role === 'FINANCE_OFFICER';
}

/**
 * Check if user can manage projects and users.
 */
export function isAdmin(role: string): boolean {
  return role === 'ADMIN';
}
