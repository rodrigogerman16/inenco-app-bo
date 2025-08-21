"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientAction, updateClientAction } from "@/app/actions/clients"
import type { Client } from "@/lib/database"
import { Loader2 } from "lucide-react"

interface ClientFormProps {
  client?: Client
  onSuccess?: () => void
}

export default function ClientForm({ client, onSuccess }: ClientFormProps) {
  const isEditing = !!client
  const [state, formAction, isPending] = useActionState(isEditing ? updateClientAction : createClientAction, null)

  // Handle success with useEffect to avoid state updates during render
  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess()
    }
  }, [state?.success, onSuccess])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Cliente" : "Nuevo Cliente"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {isEditing && <input type="hidden" name="id" value={client.id} />}

          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              defaultValue={client?.name}
              placeholder="Nombre del cliente"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={client?.email}
              placeholder="email@ejemplo.com"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={client?.phone}
              placeholder="+1234567890"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              name="company"
              defaultValue={client?.company}
              placeholder="Nombre de la empresa"
              disabled={isPending}
            />
          </div>

          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state?.success && (
            <Alert>
              <AlertDescription>{state.success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Actualizando..." : "Creando..."}
              </>
            ) : isEditing ? (
              "Actualizar Cliente"
            ) : (
              "Crear Cliente"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
