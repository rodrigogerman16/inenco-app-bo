"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { uploadImage } from "@/lib/news"
import { createNewsAction, updateNewsAction } from "@/app/actions/news"
import type { NewsItem } from "@/lib/mockDatabase"

interface NewsFormProps {
  news?: NewsItem
  onSuccess?: () => void
}

export default function NewsForm({ news, onSuccess }: NewsFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(news?.image || null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile)
      if (!uploadedUrl) {
        setError("No se pudo subir la imagen. Inténtalo nuevamente.")
        return
      }
      formData.set("image", uploadedUrl)
    }

    const action = news ? updateNewsAction : createNewsAction

    startTransition(async () => {
      const result = await action(formData)
      if (result?.success) {
        onSuccess?.()
      } else if (result?.error) {
        setError(result.error)
      }
    })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{news ? "Editar Noticia" : "Crear Noticia"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label>Imagen</Label>
            {preview ? (
              <div className="relative w-full h-48">
                <Image src={preview} alt="Vista previa" fill className="object-cover rounded-md" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 border border-dashed rounded-md text-muted-foreground">
                <ImageIcon className="w-8 h-8 opacity-50" />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isPending}
              />
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="o pega la URL de una imagen..."
                defaultValue={news?.image}
                disabled={isPending}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
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
