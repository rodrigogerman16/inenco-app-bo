"use server"

import { redirect } from "next/navigation"
import { getUserByEmail } from "@/lib/database"
import { createSession, destroySession } from "@/lib/auth"

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()

  console.log("Login attempt:", { email, password })

  if (!email || !password) {
    return { error: "Email y contraseña son requeridos" }
  }

  try {
    const user = await getUserByEmail(email)
    console.log("User found:", user)

    if (!user) {
      return { error: "Credenciales inválidas" }
    }

    // Simple password comparison (in production, use bcrypt)
    const isValidPassword = user.password === password
    console.log("Password valid:", isValidPassword)

    if (!isValidPassword) {
      return { error: "Credenciales inválidas" }
    }

    await createSession(user.id, user.email)
    console.log("Session created successfully")
  } catch (error) {
    console.error("Login error:", error)
    return { error: "Error interno del servidor" }
  }

  redirect("/dashboard")
}

export async function logoutAction() {
  await destroySession()
  redirect("/admin")
}
