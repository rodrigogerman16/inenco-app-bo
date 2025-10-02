import "server-only"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const secretKey = process.env.JWT_SECRET || "your-secret-key-change-this-in-production"
const key = new TextEncoder().encode(secretKey)

export interface SessionData {
  userId: string
  email: string
  expiresAt: Date
}

export async function encrypt(payload: SessionData): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(key)
}

export async function decrypt(session: string | undefined = ""): Promise<SessionData | null> {
  if (!session) return null

  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    })
    return payload as unknown as SessionData
  } catch (error) {
    console.error("Failed to verify session:", error)
    return null
  }
}

export async function createSession(userId: string, email: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, email, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  return decrypt(session)
}
