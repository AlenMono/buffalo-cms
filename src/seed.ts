import { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  // Local API methods skip all access control by default
  // so we can easily create an admin user directly in init
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@payloadcms.com',
      password: 'buffaloAdmin.123',
      name: 'Admin User',
      roles: ['admin'],
    },
  })

  // This user will be created with the default role of `editor`
  await payload.create({
    collection: 'users',
    data: {
      email: 'editor@payloadcms.com',
      password: 'buffaloEditor.123',
      name: 'Editor User',
    },
  })
}
