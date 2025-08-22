import { Suspense } from "react"
import NewsManager from "@/components/news-manager"

export default function NewsPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <NewsManager />
      </Suspense>
    </div>
  )
}
