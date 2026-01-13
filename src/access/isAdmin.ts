import { Access, FieldAccess } from 'payload'
import { User } from '../payload-types'

export const isAdmin: Access = ({ req }) => {
  // Return true or false based on if the user has an admin role
  const user = req.user as User & { roles?: string[] }
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ req }) => {
  // Return true or false based on if the user has an admin role
  const user = req.user as User & { roles?: string[] }
  return Boolean(user?.roles?.includes('admin'))
}
