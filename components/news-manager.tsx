"use client"

import { useState, useEffect } from "react"
import { NewsForm } from "./news-form"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getNewsAction, deleteNewsAction } from "@/app/actions/news"
import { Pencil, Trash2, Plus, RefreshCw } from "lucide-react"
import type { NewsItem } from "@/lib/database"

export function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const loadNews = async () => {
    try {
      setRefreshing(true)
      console.log("🔄 NewsManager: Loading news...")
      const data = await getNewsAction()
      console.log(`✅ NewsManager: Loaded ${data.length} news items`)
      setNews(data)
    } catch (error) {
      console.error("❌ NewsManager: Error loading news:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [])

  const handleEdit = (item: NewsItem) => {
    console.log("✏️ NewsManager: Editing news:", item.id)
    setEditingNews(item)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    try {
      console.log("🗑️ NewsManager: Deleting news:", id)
      const result = await deleteNewsAction(id)
      if (result.success) {
        console.log("✅ NewsManager: News deleted successfully")
        await loadNews()
        setDeletingId(null)
      }
    } catch (error) {
      console.error("❌ NewsManager: Error deleting news:", error)
    }
  }

  const handleFormSuccess = async () => {
    console.log("✅ NewsManager: Form submitted successfully")
    setShowForm(false)
    setEditingNews(null)
    await loadNews()
  }

  const handleNewNews = () => {
    console.log("➕ NewsManager: Creating new news")
    setEditingNews(null)
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Noticias</h2>
          <p className="text-muted-foreground">Administra las noticias que aparecen en la página principal</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadNews} variant="outline" disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button onClick={handleNewNews}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Noticia
          </Button>
        </div>
      </div>

      {showForm && <NewsForm news={editingNews || undefined} onSuccess={handleFormSuccess} />}

      <div className="grid gap-4">
        {news.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <p className="text-muted-foreground mb-4">No hay noticias publicadas</p>
              <Button onClick={handleNewNews}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Noticia
              </Button>
            </CardContent>
          </Card>
        ) : (
          news.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.shortDescription}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => setDeletingId(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{new Date(item.date).toLocaleDateString("es-ES")}</Badge>
                    <Badge variant="secondary">ID: {item.id}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <DeleteConfirmDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
        onConfirm={() => deletingId && handleDelete(deletingId)}
        title="¿Eliminar noticia?"
        description="Esta acción no se puede deshacer. La noticia será eliminada permanentemente."
      />
    </div>
  )
}
