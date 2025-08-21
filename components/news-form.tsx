"use client"

import { useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createNewsAction, updateNewsAction } from "@/app/actions/news"
import type { NewsItem } from "@/lib/database"
import { Loader2, X } from "lucide-react"

interface NewsFormProps {
  news?: NewsItem | null
  onClose: () => void
  onSuccess: () => void
}

export default function NewsForm({ news, onClose, onSuccess }: NewsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!news

  const [createState, createAction] = useActionState(createNewsAction, null)
  const [updateState, updateAction] = useActionState(updateNewsAction, null)

  const currentState = isEditing ? updateState : createState
  const currentAction = isEditing ? updateAction : createAction

  const handleSubmit = async (formData: FormData) => {
    console.log("📤 Form submitted with data:", {
      title: formData.get("title"),
      shortDescription: formData.get("shortDescription")?.toString().substring(0, 50) + "...",
      fullDescription: formData.get("fullDescription")?.toString().substring(0, 50) + "...",
      date: formData.get("date"),
      image: formData.get("image"),
      isEditing,
    })

    setIsSubmitting(true)

    try {
      const result = await currentAction(formData)

      if (result?.success) {
        console.log("✅ Form submission successful:", result.success)

        // Wait a moment for the server action to complete
        setTimeout(() => {
          console.log("🎉 Calling onSuccess callback")
          onSuccess()
        }, 500)
      } else if (result?.error) {
        console.error("❌ Form submission error:", result.error)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("❌ Form submission exception:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isEditing ? "Editar Noticia" : "Nueva Noticia"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            {isEditing && <input type="hidden" name="id" value={news.id} />}

            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={news?.title || ""}
                required
                placeholder="Ingrese el título de la noticia"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Descripción Corta *</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                defaultValue={news?.shortDescription || ""}
                required
                placeholder="Descripción breve que aparecerá en el carousel"
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Descripción Completa *</Label>
              <Textarea
                id="fullDescription"
                name="fullDescription"
                defaultValue={news?.fullDescription || ""}
                required
                placeholder="Descripción completa de la noticia"
                rows={5}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de Imagen (opcional)</Label>
              <Input
                id="image"
                name="image"
                type="url"
                defaultValue={news?.image || ""}
                placeholder="https://ejemplo.com/imagen.jpg"
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500">Deja vacío para usar imagen por defecto</p>
            </div>

            {currentState?.error && (
              <Alert variant="destructive">
                <AlertDescription>{currentState.error}</AlertDescription>
              </Alert>
            )}

            {currentState?.success && (
              <Alert>
                <AlertDescription>{currentState.success}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Actualizando..." : "Creando..."}
                  </>
                ) : isEditing ? (
                  "Actualizar"
                ) : (
                  "Crear Noticia"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
