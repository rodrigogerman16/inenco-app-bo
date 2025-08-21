"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react"
import type { NewsItem } from "@/lib/database"
import NewsForm from "@/components/news-form"
import DeleteConfirmDialog from "@/components/delete-confirm-dialog"
import { deleteNewsAction, getNewsAction } from "@/app/actions/news"

interface NewsManagerProps {
  initialNews: NewsItem[]
}

export default function NewsManager({ initialNews }: NewsManagerProps) {
  const [news, setNews] = useState(initialNews)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [deletingNews, setDeletingNews] = useState<NewsItem | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem)
    setIsFormOpen(true)
  }

  const handleDelete = async (newsItem: NewsItem) => {
    const result = await deleteNewsAction(newsItem.id)
    if (result.success) {
      setNews(news.filter((item) => item.id !== newsItem.id))
      setDeletingNews(null)

      // Notify other components about the update
      console.log("📡 Broadcasting news update event...")
      window.dispatchEvent(new CustomEvent("newsUpdated"))

      // Also trigger storage event for cross-tab communication
      localStorage.setItem("newsLastUpdate", Date.now().toString())
    }
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingNews(null)
  }

  const handleFormSuccess = async () => {
    console.log("🔄 News form success - refreshing data...")
    setIsRefreshing(true)
    try {
      const updatedNews = await getNewsAction()
      setNews(updatedNews)
      console.log("✅ News data refreshed successfully, total items:", updatedNews.length)

      // Notify other components about the update
      console.log("📡 Broadcasting news update event...")
      window.dispatchEvent(new CustomEvent("newsUpdated"))

      // Also trigger storage event for cross-tab communication
      localStorage.setItem("newsLastUpdate", Date.now().toString())

      setIsFormOpen(false)
      setEditingNews(null)
    } catch (error) {
      console.error("❌ Error refreshing news:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const updatedNews = await getNewsAction()
      setNews(updatedNews)
      console.log("🔄 Manual refresh completed, total items:", updatedNews.length)
    } catch (error) {
      console.error("Error refreshing news:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Auto-refresh when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleRefresh()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Noticias Publicadas</h3>
          <p className="text-sm text-gray-500">Total: {news.length} noticias</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Noticia
          </Button>
        </div>
      </div>

      {news.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No hay noticias creadas aún.</p>
            <p className="text-sm text-gray-400 mt-2">Crea tu primera noticia haciendo clic en "Nueva Noticia"</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {news.map((newsItem) => (
            <Card key={newsItem.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{newsItem.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{newsItem.date}</Badge>
                      <Badge variant="outline">ID: {newsItem.id}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(newsItem)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setDeletingNews(newsItem)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{newsItem.shortDescription}</p>
                <p className="text-xs text-gray-400">Creado: {new Date(newsItem.createdAt).toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isFormOpen && <NewsForm news={editingNews} onClose={handleFormClose} onSuccess={handleFormSuccess} />}

      {deletingNews && (
        <DeleteConfirmDialog
          title="Eliminar Noticia"
          description={`¿Estás seguro de que quieres eliminar "${deletingNews.title}"? Esta acción no se puede deshacer.`}
          onConfirm={() => handleDelete(deletingNews)}
          onCancel={() => setDeletingNews(null)}
        />
      )}
    </div>
  )
}
