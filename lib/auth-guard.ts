import { auth } from '@/lib/auth'

/**
 * Validates that the current user has an active session.
 * Throws an error if not authenticated.
 */
export async function requireAuth() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized: Authentication required.')
  }
  return session
}

/**
 * Validates that the current user has an ADMIN or SUPER_ADMIN role.
 * Throws an error if not authorized.
 */
export async function requireAdmin() {
  const session = await requireAuth()
  const role = session.user.role

  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden: Admin access required.')
  }

  return session
}
