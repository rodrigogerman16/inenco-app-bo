"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { createClientAction, updateClientAction } from "@/app/actions/clients"
import type { Client } from "@/lib/database"

interface ClientFormProps {
  client?: Client
  onSuccess?: () => void
}

export default function ClientForm({ client, onSuccess }: ClientFormProps) {
  const action = client ? updateClientAction : createClientAction
  const [state, formAction, isPending] = useActionState(action, null)

  if (state?.success && onSuccess) {
    onSuccess()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{client ? "Editar" : "Crear"} Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {client && <input type="hidden" name="id" value={client.id} />}

          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              required
              disabled={isPending}
              defaultValue={client?.name}
              placeholder="Nombre del cliente"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL de Imagen</Label>
            <Input
              id="image"
              name="image"
              type="url"
              required
              disabled={isPending}
              defaultValue={client?.image}
              placeholder="https://ejemplo.com/logo.png"
            />
            <p className="text-xs text-muted-foreground">Ingresa la URL completa del logo del cliente</p>
          </div>

          {state?.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {client ? "Actualizando..." : "Creando..."}
              </>
            ) : client ? (
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
