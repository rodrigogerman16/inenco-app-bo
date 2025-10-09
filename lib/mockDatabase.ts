// Mock database using in-memory storage
interface User {
  id: string
  email: string
  password: string
}

interface Client {
  id: string
  name: string
  image: string
}

interface NewsItem {
  id: string
  title: string
  shortDescription: string
  content: string
  image: string
  createdAt: string
}

class MockDatabase {
  private users: User[] = [
    {
      id: "1",
      email: "admin@inenco.com",
      password: "admin123",
    },
  ]

  private clients: Client[] = [
    { id: "1", name: "YPF", image: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Pampa Energía", image: "/placeholder.svg?height=100&width=100" },
    { id: "3", name: "Tecpetrol", image: "/placeholder.svg?height=100&width=100" },
    { id: "4", name: "Pan American Energy", image: "/placeholder.svg?height=100&width=100" },
    { id: "5", name: "Total Austral", image: "/placeholder.svg?height=100&width=100" },
    { id: "6", name: "Pluspetrol", image: "/placeholder.svg?height=100&width=100" },
  ]

  private news: NewsItem[] = [
    {
      id: "1",
      title: "Nueva implementación de SINCO en sector energético",
      shortDescription: "Exitosa implementación del sistema SINCO en importante empresa del sector.",
      content:
        "Hemos completado con éxito la implementación de nuestro sistema SINCO en una de las principales empresas del sector energético...",
      image: "/placeholder.svg?height=400&width=600",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Actualización ActuaPlus 2024",
      shortDescription: "Nueva versión con características mejoradas de reportería y análisis.",
      content:
        "Lanzamos la última versión de ActuaPlus con mejoras significativas en el módulo de reportería y nuevas herramientas de análisis...",
      image: "/placeholder.svg?height=400&width=600",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Webinar gratuito sobre optimización de procesos",
      shortDescription: "Únete a nuestro próximo webinar sobre optimización industrial.",
      content:
        "Te invitamos a participar en nuestro webinar gratuito donde hablaremos sobre las mejores prácticas en optimización de procesos industriales...",
      image: "/placeholder.svg?height=400&width=600",
      createdAt: new Date().toISOString(),
    },
  ]

  // User methods
  async getUserByEmail(email: string): Promise<User | null> {
    console.log(`📊 Database: Looking for user with email: ${email}`)
    const user = this.users.find((u) => u.email === email) || null
    console.log(`📊 Database: User found:`, user ? "yes" : "no")
    return user
  }

  // Client methods
  async getClients(): Promise<Client[]> {
    console.log(`📊 Database: Fetching ${this.clients.length} clients`)
    return [...this.clients]
  }

  async getClientById(id: string): Promise<Client | null> {
    return this.clients.find((c) => c.id === id) || null
  }

  async createClient(data: Omit<Client, "id">): Promise<Client> {
    const newClient: Client = {
      id: Date.now().toString(),
      ...data,
    }
    this.clients.push(newClient)
    console.log(`📊 Database: Created client:`, newClient)
    return newClient
  }

  async updateClient(id: string, data: Partial<Client>): Promise<Client | null> {
    const index = this.clients.findIndex((c) => c.id === id)
    if (index === -1) return null

    this.clients[index] = { ...this.clients[index], ...data }
    console.log(`📊 Database: Updated client:`, this.clients[index])
    return this.clients[index]
  }

  async deleteClient(id: string): Promise<boolean> {
    const index = this.clients.findIndex((c) => c.id === id)
    if (index === -1) return false

    this.clients.splice(index, 1)
    console.log(`📊 Database: Deleted client with id: ${id}`)
    return true
  }

  // News methods
  async getNews(): Promise<NewsItem[]> {
    console.log(`📊 Database: Fetching ${this.news.length} news items`)
    return [...this.news].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  async getNewsById(id: string): Promise<NewsItem | null> {
    return this.news.find((n) => n.id === id) || null
  }

  async createNews(data: Omit<NewsItem, "id" | "createdAt">): Promise<NewsItem> {
    const newNews: NewsItem = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    }
    this.news.push(newNews)
    console.log(`📊 Database: Created news:`, newNews)
    return newNews
  }

  async updateNews(id: string, data: Partial<NewsItem>): Promise<NewsItem | null> {
    const index = this.news.findIndex((n) => n.id === id)
    if (index === -1) return null

    this.news[index] = { ...this.news[index], ...data }
    console.log(`📊 Database: Updated news:`, this.news[index])
    return this.news[index]
  }

  async deleteNews(id: string): Promise<boolean> {
    const index = this.news.findIndex((n) => n.id === id)
    if (index === -1) return false

    this.news.splice(index, 1)
    console.log(`📊 Database: Deleted news with id: ${id}`)
    return true
  }
}

// Singleton instance
const db = new MockDatabase()

// Export functions
export const getUserByEmail = (email: string) => db.getUserByEmail(email)
export const getClients = () => db.getClients()
export const getClientById = (id: string) => db.getClientById(id)
export const createClient = (data: Omit<Client, "id">) => db.createClient(data)
export const updateClient = (id: string, data: Partial<Client>) => db.updateClient(id, data)
export const deleteClient = (id: string) => db.deleteClient(id)
export const getNews = () => db.getNews()
export const getNewsById = (id: string) => db.getNewsById(id)
export const createNews = (data: Omit<NewsItem, "id" | "createdAt">) => db.createNews(data)
export const updateNews = (id: string, data: Partial<NewsItem>) => db.updateNews(id, data)
export const deleteNews = (id: string) => db.deleteNews(id)

// Export types
export type { User, Client, NewsItem }
