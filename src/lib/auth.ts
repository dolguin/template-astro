import { Lucia } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { db } from '@/db'
import { sessionTable, userTable } from '@/db/schema'
// import { cognito } from '@lucia-auth/oauth/providers'

import { GitHub } from 'arctic'

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

// export const lucia = new Lucia(adapter, {
//   sessionCookie: {
//     attributes: {
//       // set to `true` when using HTTPS
//       secure: import.meta.env.PROD
//     }
//   }
// })

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: false
    }
  },
  getUserAttributes: (attributes) => {
    return {
      githubId: attributes.github_id,
      username: attributes.username
    }
  }
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  github_id: number
  username: string
}

export const github = new GitHub(
  import.meta.env.GITHUB_CLIENT_ID,
  import.meta.env.GITHUB_CLIENT_SECRET
)
