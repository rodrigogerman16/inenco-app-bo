import { getNewsAction } from "@/app/actions/news"
import NewsManager from "@/components/news-manager"

export default async function DashboardPage() {
  const news = await getNewsAction()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Gestiona el contenido de tu sitio web</p>
      </div>

      <NewsManager initialNews={news} />
    </div>
  )
}
