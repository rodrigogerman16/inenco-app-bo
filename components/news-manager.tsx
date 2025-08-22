"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react"
import NewsForm from "./news-form"
import DeleteConfirmDialog from "./delete-confirm-dialog"
import { getNewsAction, deleteNewsAction } from "@/app/actions/news"
import type { NewsItem } from "@/lib/database"

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [deletingNews, setDeletingNews] = useState<NewsItem | null>(null)

  const fetchNews = async () => {
    try {
      console.log("🔄 NewsManager: Fetching news...")
      setLoading(true)
      const newsData = await getNewsAction()
      console.log(`✅ NewsManager: Fetched ${newsData.length} news items`)
      setNews(newsData)
    } catch (error) {
      console.error("❌ NewsManager: Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingNews(null)
    fetchNews()
  }

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem)
    setShowForm(true)
  }

  const handleDelete = async (newsItem: NewsItem) => {
    try {
      console.log(`🔄 NewsManager: Deleting news ${newsItem.id}...`)
      const result = await deleteNewsAction(newsItem.id)

      if (result.success) {
        console.log("✅ NewsManager: News deleted successfully")
        setDeletingNews(null)
        fetchNews()
      } else {
        console.error("❌ NewsManager: Error deleting news:", result.error)
      }
    } catch (error) {
      console.error("❌ NewsManager: Error deleting news:", error)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{editingNews ? "Editar Noticia" : "Nueva Noticia"}</h1>
        </div>
        <NewsForm
          news={editingNews || undefined}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingNews(null)
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Noticias</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchNews} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Noticia
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : news.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">No hay noticias disponibles</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Crear Primera Noticia
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {news.map((newsItem) => (
            <Card key={newsItem.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{newsItem.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{formatDate(newsItem.date)}</Badge>
                      <span className="text-sm text-gray-500">Creado: {formatDate(newsItem.createdAt)}</span>
                      {newsItem.updatedAt !== newsItem.createdAt && (
                        <span className="text-sm text-gray-500">• Actualizado: {formatDate(newsItem.updatedAt)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(newsItem)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setDeletingNews(newsItem)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{newsItem.shortDescription}</p>
                <div className="text-sm text-gray-500">
                  <p className="line-clamp-3">{newsItem.content}</p>
                </div>
                {newsItem.image && (
                  <div className="mt-4">
                    <img
                      src={newsItem.image || "/placeholder.svg"}
                      alt={newsItem.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={!!deletingNews}
        onOpenChange={(open) => !open && setDeletingNews(null)}
        onConfirm={() => deletingNews && handleDelete(deletingNews)}
        title="Eliminar Noticia"
        description={`¿Estás seguro de que deseas eliminar la noticia "${deletingNews?.title}"? Esta acción no se puede deshacer.`}
      />
    </div>
  )
}
