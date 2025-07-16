import Link from "next/link"
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-950 text-gray-300 dark:bg-gray-950 dark:text-gray-400">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-sm">&copy; {"2024 InencoApp. Todos los derechos reservados."}</p>
        <nav className="flex gap-4">
          <Link
            href="#"
            className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            prefetch={false}
          >
            <TwitterIcon className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            prefetch={false}
          >
            <FacebookIcon className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            prefetch={false}
          >
            <LinkedinIcon className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </nav>
      </div>
    </footer>
  )
}
