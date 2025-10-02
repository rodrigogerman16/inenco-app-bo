// Mock data store for development/testing
class MockDataStore {
  private static instance: MockDataStore
  private news: NewsItem[] = []
  private users: User[] = []
  private clients: Client[] = []

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

    // Initialize with sample client data
    this.clients = [
      {
        id: "1",
        name: "Empresa ABC",
        category: "A - F",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "2",
        name: "Corporación XYZ",
        category: "O - Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ]

    console.log(
      `🔄 MockDataStore: Initialized with ${this.news.length} news items, ${this.users.length} users, and ${this.clients.length} clients`,
    )
  }

  // News methods
  getAllNews(): NewsItem[] {
    console.log(`📰 MockDataStore: Getting all news (${this.news.length} items)`)
    return [...this.news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  createNews(data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">): NewsItem {
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

  updateNews(id: string, data: Partial<Omit<NewsItem, "id" | "createdAt">>): NewsItem {
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

  deleteNews(id: string): void {
    const index = this.news.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error(`News item with ID ${id} not found`)
    }

    this.news.splice(index, 1)
    console.log(`✅ MockDataStore: Deleted news with ID ${id}`)
  }

  // User methods
  getUserByEmail(email: string): User | null {
    const user = this.users.find((u) => u.email === email)
    console.log(`👤 MockDataStore: Getting user by email ${email}: ${user ? "found" : "not found"}`)
    return user || null
  }

  createUser(data: Omit<User, "id" | "createdAt">): User {
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
  getAllClients(): Client[] {
    return [...this.clients].sort((a, b) => a.name.localeCompare(b.name))
  }

  createClient(data: Omit<Client, "id" | "createdAt" | "updatedAt">): Client {
    const newClient: Client = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.clients.push(newClient)
    return newClient
  }

  updateClient(id: string, data: Partial<Client>): Client {
    const index = this.clients.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Client not found")

    this.clients[index] = { ...this.clients[index], ...data, updatedAt: new Date().toISOString() }
    return this.clients[index]
  }

  deleteClient(id: string): void {
    const index = this.clients.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Client not found")
    this.clients.splice(index, 1)
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

export interface Client {
  id: string
  name: string
  category: string
  createdAt: string
  updatedAt: string
}

// Get the mock data store instance
const mockStore = MockDataStore.getInstance()

// For now, we'll use mock data exclusively since Supabase is causing issues
console.log("ℹ️ Database: Using mock data store (Supabase disabled)")

// News functions
export async function getAllNews(): Promise<NewsItem[]> {
  console.log("🔄 Database: Getting all news from mock store...")
  return mockStore.getAllNews()
}

export async function createNews(data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">): Promise<NewsItem> {
  console.log("🔄 Database: Creating news in mock store...")
  return mockStore.createNews(data)
}

export async function updateNews(id: string, data: Partial<Omit<NewsItem, "id" | "createdAt">>): Promise<NewsItem> {
  console.log(`🔄 Database: Updating news ${id} in mock store...`)
  return mockStore.updateNews(id, data)
}

export async function deleteNews(id: string): Promise<void> {
  console.log(`🔄 Database: Deleting news ${id} from mock store...`)
  mockStore.deleteNews(id)
}

// User functions
export async function getUserByEmail(email: string): Promise<User | null> {
  console.log(`🔄 Database: Getting user by email from mock store: ${email}`)
  return mockStore.getUserByEmail(email)
}

export async function createUser(data: Omit<User, "id" | "createdAt">): Promise<User> {
  console.log("🔄 Database: Creating user in mock store...")
  return mockStore.createUser(data)
}

// Client functions
export async function getAllClients(): Promise<Client[]> {
  console.log("🔄 Database: Getting all clients from mock store...")
  return mockStore.getAllClients()
}

export async function createClient(data: Omit<Client, "id" | "createdAt" | "updatedAt">): Promise<Client> {
  console.log("🔄 Database: Creating client in mock store...")
  return mockStore.createClient(data)
}

export async function updateClient(id: string, data: Partial<Client>): Promise<Client> {
  console.log(`🔄 Database: Updating client ${id} in mock store...`)
  return mockStore.updateClient(id, data)
}

export async function deleteClient(id: string): Promise<void> {
  console.log(`🔄 Database: Deleting client ${id} from mock store...`)
  mockStore.deleteClient(id)
}
