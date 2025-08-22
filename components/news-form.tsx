"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createNewsAction, updateNewsAction } from "@/app/actions/news"
import type { NewsItem } from "@/lib/database"

interface NewsFormProps {
  news?: NewsItem
  onSuccess?: () => void
  onCancel?: () => void
}

export default function NewsForm({ news, onSuccess, onCancel }: NewsFormProps) {
  const isEditing = !!news

  const [createState, createFormAction, createPending] = useActionState(createNewsAction, null)
  const [updateState, updateFormAction, updatePending] = useActionState(
    updateNewsAction.bind(null, news?.id || ""),
    null,
  )

  const state = isEditing ? updateState : createState
  const formAction = isEditing ? updateFormAction : createFormAction
  const pending = isEditing ? updatePending : createPending

  const handleSubmit = async (formData: FormData) => {
    console.log("🔄 NewsForm: Submitting form...")

    try {
      const result = await formAction(formData)
      console.log("📝 NewsForm: Form result:", result)

      if (result?.success) {
        console.log("✅ NewsForm: Form submitted successfully")
        onSuccess?.()
      } else if (result?.error) {
        console.error("❌ NewsForm: Form submission failed:", result.error)
      }
    } catch (error) {
      console.error("❌ NewsForm: Form submission failed:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Noticia" : "Nueva Noticia"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={news?.title || ""}
              required
              placeholder="Ingrese el título de la noticia"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Descripción Corta *</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={news?.shortDescription || ""}
              required
              placeholder="Ingrese una descripción breve"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido *</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={news?.content || ""}
              required
              placeholder="Ingrese el contenido completo de la noticia"
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL de Imagen</Label>
            <Input
              id="image"
              name="image"
              type="url"
              defaultValue={news?.image || ""}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha *</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={news?.date || new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          {state?.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{state.error}</p>
            </div>
          )}

          {state?.success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">{state.message}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={pending}>
              {pending ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
