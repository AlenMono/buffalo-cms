import { Access, AccessResult } from 'payload'

export const isAdminOrHasSiteAccessOrPublished: Access = ({ req }) => {
  const user = req.user as any
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user?.roles?.includes('admin')) return true as AccessResult

    // If user has role of 'editor' and has access to a site,
    // return a query constraint to restrict the documents this user can edit
    // to only those that are assigned to a site, or have no site assigned
    if (user?.roles?.includes('editor') && (user.sites?.length ?? 0) > 0) {
      return {
        or: [
          {
            site: {
              in: user.sites as string[],
            },
          },
          {
            site: {
              exists: false,
            },
          },
        ],
      } as AccessResult
    }
  }

  // Non-logged in users can only read published docs
  return {
    _status: {
      equals: 'published',
    },
  } as AccessResult
}
