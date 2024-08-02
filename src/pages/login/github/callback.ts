import { github, lucia } from '@/lib/auth'
import { OAuth2RequestError } from 'arctic'
import { generateIdFromEntropySize } from 'lucia'

import { db } from '@/db'
import { providerTable, sessionTable, userTable } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

import type { APIContext } from 'astro'

export async function GET (context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get('code')
  const state = context.url.searchParams.get('state')
  const storedState = context.cookies.get('github_oauth_state')?.value ?? null
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    })
  }

  try {
    const tokens = await github.validateAuthorizationCode(code)
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    })
    const githubUser: GitHubUser = await githubUserResponse.json()

    // const existingUser = await db.query.userTable.findFirst({
    //   where: eq(userTable.githubId, githubUser.id)
    // })

    const existingUser = await db
      .query.providerTable.findFirst({
        where: (
          and(
            eq(providerTable.provider_id, 'github'),
            eq(providerTable.provider_user_id, githubUser.id)
          )
        )
      })

    console.log(existingUser)

    if (existingUser != null) {
      const session = await lucia.createSession(existingUser.user_id, {})
      await db.update(userTable)
        .set({
          lastAccess: new Date()
        })
        .where(eq(userTable.id, existingUser.user_id))
      // const sessionCookie = lucia.createSessionCookie(session.id)
      const sessionCookie = lucia.createSessionCookie(session.userId)
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      return context.redirect('/admin')
    }

    const userId = generateIdFromEntropySize(10)

    await db.insert(userTable).values({
      id: userId,
      githubId: githubUser.id,
      username: githubUser.login
    })

    await db.insert(providerTable).values({
      user_id: userId,
      provider_id: 'github',
      provider_user_id: githubUser.id
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return context.redirect('/admin')
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      })
    }
    return new Response(null, {
      status: 500
    })
  }
}

interface GitHubUser {
  id: string
  login: string
}
