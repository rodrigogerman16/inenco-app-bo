"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { createNewsAction, updateNewsAction } from "@/app/actions/news"
import type { NewsItem } from "@/lib/database"

interface NewsFormProps {
  news?: NewsItem
  onSuccess?: () => void
}

export default function NewsForm({ news, onSuccess }: NewsFormProps) {
  const action = news ? updateNewsAction : createNewsAction
  const [state, formAction, isPending] = useActionState(action, null)

  if (state?.success && onSuccess) {
    onSuccess()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{news ? "Editar" : "Crear"} Noticia</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {news && <input type="hidden" name="id" value={news.id} />}

          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" required disabled={isPending} defaultValue={news?.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Descripción Corta</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              required
              disabled={isPending}
              defaultValue={news?.shortDescription}
              placeholder="Breve descripción que aparecerá en el carrusel"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              name="content"
              required
              disabled={isPending}
              defaultValue={news?.content}
              rows={6}
              placeholder="Contenido completo de la noticia"
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
              defaultValue={news?.image}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
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
                {news ? "Actualizando..." : "Creando..."}
              </>
            ) : news ? (
              "Actualizar Noticia"
            ) : (
              "Crear Noticia"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
