import { cookies } from "next/headers"

export interface Session {
  userId: string
  email: string
}

export async function createSession(userId: string, email: string): Promise<void> {
  const session = { userId, email }
  const cookieStore = await cookies()
  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")
    if (!sessionCookie) return null
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
