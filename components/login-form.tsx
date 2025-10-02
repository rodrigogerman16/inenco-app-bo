"use client"

import { useActionState } from "react"
import { loginAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>Ingrese sus credenciales para acceder al panel de administración</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="admin@inenco.com" required disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" required disabled={isPending} />
          </div>
          {state?.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Iniciando sesión..." : "Entrar"}
          </Button>
          <div className="text-sm text-muted-foreground text-center mt-4">
            <p>Credenciales de prueba:</p>
            <p className="font-mono">admin@inenco.com / admin123</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
