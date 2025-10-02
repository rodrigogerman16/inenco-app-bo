"use client"

import { useActionState, useEffect } from "react"
import { createNewsAction, updateNewsAction } from "@/app/actions/news"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { NewsItem } from "@/lib/database"

interface NewsFormProps {
  news?: NewsItem
  onSuccess?: () => void
}

export function NewsForm({ news, onSuccess }: NewsFormProps) {
  const isEditing = !!news

  const action = isEditing ? updateNewsAction.bind(null, news.id) : createNewsAction

  const [state, formAction, isPending] = useActionState(action, null)

  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess()
    }
  }, [state, onSuccess])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Noticia" : "Nueva Noticia"}</CardTitle>
        <CardDescription>
          {isEditing ? "Modifica los datos de la noticia" : "Completa los datos de la nueva noticia"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título*</Label>
            <Input id="title" name="title" defaultValue={news?.title} required disabled={isPending} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Descripción Corta*</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={news?.shortDescription}
              required
              disabled={isPending}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido*</Label>
            <Textarea id="content" name="content" defaultValue={news?.content} required disabled={isPending} rows={6} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL de Imagen</Label>
            <Input
              id="image"
              name="image"
              type="url"
              defaultValue={news?.image}
              placeholder="/placeholder.svg?height=300&width=500&text=Noticia"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha*</Label>
            <Input id="date" name="date" type="date" defaultValue={news?.date} required disabled={isPending} />
          </div>

          {state?.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state?.success && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Guardando..." : isEditing ? "Actualizar Noticia" : "Crear Noticia"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
