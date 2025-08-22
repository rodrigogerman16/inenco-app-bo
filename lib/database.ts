// Mock data store for development/testing
class MockDataStore {
  private static instance: MockDataStore
  private news: NewsItem[] = []
  private users: User[] = []
  private clients: any[] = []

  private constructor() {
    this.initializeData()
  }

  public static getInstance(): MockDataStore {
    if (!MockDataStore.instance) {
      MockDataStore.instance = new MockDataStore()
    }
    return MockDataStore.instance
  }

  private initializeData() {
    // Initialize with sample news data
    this.news = [
      {
        id: "1",
        title: "Nueva Actualización de Sistema",
        shortDescription:
          "Hemos lanzado una nueva actualización con mejoras significativas en rendimiento y seguridad.",
        content:
          "Esta actualización incluye optimizaciones importantes que mejoran la velocidad de procesamiento en un 30% y nuevas características de seguridad que protegen mejor los datos de nuestros clientes.",
        image: "/placeholder.svg?height=300&width=500&text=Sistema",
        date: "2024-01-15",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        title: "Expansión de Servicios",
        shortDescription: "Ampliamos nuestra cobertura de servicios para atender mejor a nuestros clientes.",
        content:
          "Con esta expansión, ahora ofrecemos soporte 24/7 y nuevos servicios de consultoría especializada en transformación digital para empresas de todos los tamaños.",
        image: "/placeholder.svg?height=300&width=500&text=Servicios",
        date: "2024-01-10",
        createdAt: "2024-01-10T09:00:00Z",
        updatedAt: "2024-01-10T09:00:00Z",
      },
      {
        id: "3",
        title: "Certificación ISO Obtenida",
        shortDescription: "Hemos obtenido la certificación ISO 27001 para gestión de seguridad de la información.",
        content:
          "Esta certificación demuestra nuestro compromiso con los más altos estándares de seguridad y calidad en el manejo de información confidencial de nuestros clientes.",
        image: "/placeholder.svg?height=300&width=500&text=ISO",
        date: "2024-01-05",
        createdAt: "2024-01-05T08:00:00Z",
        updatedAt: "2024-01-05T08:00:00Z",
      },
    ]

    // Initialize with sample user data
    this.users = [
      {
        id: "1",
        email: "admin@inenco.com",
        password: "admin123",
        name: "Administrador",
        role: "admin",
        createdAt: "2024-01-01T00:00:00Z",
      },
    ]

    console.log(`🔄 MockDataStore: Initialized with ${this.news.length} news items and ${this.users.length} users`)
  }

  // News methods
  async getAllNews(): Promise<NewsItem[]> {
    console.log(`📰 MockDataStore: Getting all news (${this.news.length} items)`)
    return [...this.news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  async createNews(data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">): Promise<NewsItem> {
    const newNews: NewsItem = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.news.push(newNews)
    console.log(`✅ MockDataStore: Created news with ID ${newNews.id}`)
    return newNews
  }

  async updateNews(id: string, data: Partial<Omit<NewsItem, "id" | "createdAt">>): Promise<NewsItem> {
    const index = this.news.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error(`News item with ID ${id} not found`)
    }

    this.news[index] = {
      ...this.news[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    console.log(`✅ MockDataStore: Updated news with ID ${id}`)
    return this.news[index]
  }

  async deleteNews(id: string): Promise<void> {
    const index = this.news.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error(`News item with ID ${id} not found`)
    }

    this.news.splice(index, 1)
    console.log(`✅ MockDataStore: Deleted news with ID ${id}`)
  }

  // User methods
  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email)
    console.log(`👤 MockDataStore: Getting user by email ${email}: ${user ? "found" : "not found"}`)
    return user || null
  }

  async createUser(data: Omit<User, "id" | "createdAt">): Promise<User> {
    const newUser: User = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    this.users.push(newUser)
    console.log(`✅ MockDataStore: Created user with ID ${newUser.id}`)
    return newUser
  }

  // Client methods
  async getAllClients(): Promise<any[]> {
    return [...this.clients]
  }

  async createClient(data: any): Promise<any> {
    const newClient = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    this.clients.push(newClient)
    return newClient
  }
}

// Types
export interface NewsItem {
  id: string
  title: string
  shortDescription: string
  content: string
  image: string
  date: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: string
  createdAt: string
}

// Supabase client (optional)
let supabase: any = null

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { createClient } = require("@supabase/supabase-js")
    supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    console.log("✅ Supabase client initialized")
  } else {
    console.log("⚠️ Supabase not configured, using mock data")
  }
} catch (error) {
  console.log("⚠️ Supabase not available, using mock data")
}

// Get the mock data store instance
const mockStore = MockDataStore.getInstance()

// News functions
export async function getAllNews(): Promise<NewsItem[]> {
  try {
    if (supabase) {
      console.log("🔄 Database: Getting news from Supabase...")
      const { data, error } = await supabase.from("news").select("*").order("date", { ascending: false })

      if (error) throw error
      console.log(`✅ Database: Retrieved ${data.length} news items from Supabase`)
      return data
    }
  } catch (error) {
    console.log("⚠️ Database: Supabase error, falling back to mock data:", error)
  }

  return await mockStore.getAllNews()
}

export async function createNews(data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">): Promise<NewsItem> {
  try {
    if (supabase) {
      console.log("🔄 Database: Creating news in Supabase...")
      const { data: newNews, error } = await supabase.from("news").insert([data]).select().single()

      if (error) throw error
      console.log(`✅ Database: Created news in Supabase with ID ${newNews.id}`)
      return newNews
    }
  } catch (error) {
    console.log("⚠️ Database: Supabase error, falling back to mock data:", error)
  }

  return await mockStore.createNews(data)
}

export async function updateNews(id: string, data: Partial<Omit<NewsItem, "id" | "createdAt">>): Promise<NewsItem> {
  try {
    if (supabase) {
      console.log(`🔄 Database: Updating news ${id} in Supabase...`)
      const { data: updatedNews, error } = await supabase.from("news").update(data).eq("id", id).select().single()

      if (error) throw error
      console.log(`✅ Database: Updated news in Supabase with ID ${updatedNews.id}`)
      return updatedNews
    }
  } catch (error) {
    console.log("⚠️ Database: Supabase error, falling back to mock data:", error)
  }

  return await mockStore.updateNews(id, data)
}

export async function deleteNews(id: string): Promise<void> {
  try {
    if (supabase) {
      console.log(`🔄 Database: Deleting news ${id} from Supabase...`)
      const { error } = await supabase.from("news").delete().eq("id", id)

      if (error) throw error
      console.log(`✅ Database: Deleted news from Supabase with ID ${id}`)
      return
    }
  } catch (error) {
    console.log("⚠️ Database: Supabase error, falling back to mock data:", error)
  }

  return await mockStore.deleteNews(id)
}

// User functions
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    if (supabase) {
      console.log(`🔄 Database: Getting user by email from Supabase: ${email}`)
      const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

      if (error && error.code !== "PGRST116") throw error
      console.log(`✅ Database: User ${email} ${data ? "found" : "not found"} in Supabase`)
      return data || null
    }
  } catch (error) {
    console.log("⚠️ Database: Supabase error, falling back to mock data:", error)
  }

  return await mockStore.getUserByEmail(email)
}

export async function createUser(data: Omit<User, "id" | "createdAt">): Promise<User> {
  try {
    if (supabase) {
      console.log("🔄 Database: Creating user in Supabase...")
      const { data: newUser, error } = await supabase.from("users").insert([data]).select().single()

      if (error) throw error
      console.log(`✅ Database: Created user in Supabase with ID ${newUser.id}`)
      return newUser
    }
  } catch (error) {
    console.log("⚠️ Database: Supabase error, falling back to mock data:", error)
  }

  return await mockStore.createUser(data)
}

// Client functions
export async function getAllClients(): Promise<any[]> {
  try {
    if (supabase) {
      console.log("🔄 Database: Getting clients from Supabase...")
      const { data, error } = await supabase.from("clients").select("*").order("name", { ascending: true })

      if (error) throw error
      console.log(`✅ Database: Retrieved ${data.length} clients from Supabase`)
      return data
    }
  } catch (error) {
    console.log("⚠️ Database: Supabase error, falling back to mock data:", error)
  }

  return await mockStore.getAllClients()
}

export async function createClient(data: any): Promise<any> {
  try {
    if (supabase) {
      console.log("🔄 Database: Creating client in Supabase...")
      const { data: newClient, error } = await supabase.from("clients").insert([data]).select().single()

      if (error) throw error
      console.log(`✅ Database: Created client in Supabase with ID ${newClient.id}`)
      return newClient
    }
  } catch (error) {
    console.log("⚠️ Database: Supabase error, falling back to mock data:", error)
  }

  return await mockStore.createClient(data)
}
