"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import NewsForm from "./news-form"
import DeleteConfirmDialog from "./delete-confirm-dialog"
import { getNewsAction, deleteNewsAction } from "@/app/actions/news"
import type { NewsItem } from "@/lib/database"
import Image from "next/image"

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNews()
  }, [])

  async function loadNews() {
    setLoading(true)
    const data = await getNewsAction()
    setNews(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await deleteNewsAction(id)
    loadNews()
  }

  function handleEdit(newsItem: NewsItem) {
    setSelectedNews(newsItem)
    setIsDialogOpen(true)
  }

  function handleSuccess() {
    setIsDialogOpen(false)
    setSelectedNews(null)
    loadNews()
  }

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Noticias</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedNews(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Noticia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedNews ? "Editar" : "Crear"} Noticia</DialogTitle>
            </DialogHeader>
            <NewsForm news={selectedNews || undefined} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="relative h-40 mb-2">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.shortDescription}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <DeleteConfirmDialog onConfirm={() => handleDelete(item.id)}>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DeleteConfirmDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {news.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No hay noticias. Crea una para comenzar.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
