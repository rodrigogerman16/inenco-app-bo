import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

export interface User {
  id: string
  email: string
  password: string
}

export interface NewsItem {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  date: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  createdAt: string
  updatedAt: string
}

// File paths for data persistence
const DATA_DIR = join(process.cwd(), "data")
const USERS_FILE = join(DATA_DIR, "users.json")
const NEWS_FILE = join(DATA_DIR, "news.json")
const CLIENTS_FILE = join(DATA_DIR, "clients.json")

// Ensure data directory exists
if (typeof window === "undefined") {
  try {
    const fs = require("fs")
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
  } catch (error) {
    console.log("Data directory creation skipped in browser environment")
  }
}

// Default data
const defaultUsers: User[] = [
  {
    id: "1",
    email: "admin@inenco.com",
    password: "admin123", // In production, this should be hashed
  },
]

const defaultNews: NewsItem[] = [
  {
    id: "1",
    title: "Innovación en Soluciones Cloud para Empresas",
    shortDescription:
      "Descubra cómo nuestras nuevas herramientas basadas en la nube están revolucionando la gestión de datos.",
    fullDescription:
      "Descubra cómo nuestras nuevas herramientas basadas en la nube están revolucionando la gestión de datos y la colaboración en equipos remotos. Adaptamos la tecnología para impulsar su negocio hacia el futuro.",
    date: "2024-07-15",
    image: "/placeholder.svg?height=300&width=500&text=Cloud+Solutions",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Seguridad Cibernética: Protegiendo sus Activos Digitales",
    shortDescription: "En un mundo digital cada vez más complejo, la seguridad es primordial.",
    fullDescription:
      "En un mundo digital cada vez más complejo, la seguridad es primordial. Conozca nuestras estrategias avanzadas de ciberseguridad para proteger su información valiosa de amenazas emergentes.",
    date: "2024-07-10",
    image: "/placeholder.svg?height=300&width=500&text=Cybersecurity",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const defaultClients: Client[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@empresa.com",
    phone: "+1234567890",
    company: "Empresa ABC",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "María García",
    email: "maria@empresa.com",
    phone: "+0987654321",
    company: "Empresa XYZ",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Helper functions for file operations
function readDataFile<T>(filePath: string, defaultData: T[]): T[] {
  if (typeof window !== "undefined") {
    // Browser environment - return default data
    return defaultData
  }

  try {
    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, "utf-8")
      const data = JSON.parse(fileContent)
      console.log(`📖 Loaded ${data.length} items from ${filePath}`)
      return data
    } else {
      console.log(`📝 Creating new data file: ${filePath}`)
      writeDataFile(filePath, defaultData)
      return defaultData
    }
  } catch (error) {
    console.error(`❌ Error reading data file ${filePath}:`, error)
    return defaultData
  }
}

function writeDataFile<T>(filePath: string, data: T[]): void {
  if (typeof window !== "undefined") {
    // Browser environment - skip file operations
    return
  }

  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
    console.log(`💾 Saved ${data.length} items to ${filePath}`)
  } catch (error) {
    console.error(`❌ Error writing data file ${filePath}:`, error)
  }
}

// Load initial data
const users = readDataFile(USERS_FILE, defaultUsers)
let news = readDataFile(NEWS_FILE, defaultNews)
let clients = readDataFile(CLIENTS_FILE, defaultClients)

// User functions
export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email === email) || null
}

// News functions
export async function getAllNews(): Promise<NewsItem[]> {
  // Reload from file to get latest data
  news = readDataFile(NEWS_FILE, defaultNews)
  console.log("📰 Getting all news, total items:", news.length)
  console.log(
    "📋 News items:",
    news.map((n) => ({ id: n.id, title: n.title })),
  )
  return [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  news = readDataFile(NEWS_FILE, defaultNews)
  return news.find((item) => item.id === id) || null
}

export async function createNews(data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">): Promise<NewsItem> {
  // Reload from file to get latest data
  news = readDataFile(NEWS_FILE, defaultNews)

  const newItem: NewsItem = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  news.push(newItem)
  writeDataFile(NEWS_FILE, news)

  console.log("✅ News created successfully:", newItem)
  console.log("📊 Total news items in database:", news.length)
  console.log(
    "📋 All news items:",
    news.map((n) => ({ id: n.id, title: n.title })),
  )
  return newItem
}

export async function updateNews(
  id: string,
  data: Partial<Omit<NewsItem, "id" | "createdAt" | "updatedAt">>,
): Promise<NewsItem | null> {
  // Reload from file to get latest data
  news = readDataFile(NEWS_FILE, defaultNews)

  const index = news.findIndex((item) => item.id === id)
  if (index === -1) return null

  news[index] = {
    ...news[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  writeDataFile(NEWS_FILE, news)
  console.log("✅ News updated successfully:", news[index])
  return news[index]
}

export async function deleteNews(id: string): Promise<boolean> {
  // Reload from file to get latest data
  news = readDataFile(NEWS_FILE, defaultNews)

  const index = news.findIndex((item) => item.id === id)
  if (index === -1) return false

  const deletedItem = news[index]
  news.splice(index, 1)
  writeDataFile(NEWS_FILE, news)

  console.log("🗑️ News deleted successfully:", deletedItem.title)
  console.log("📊 Remaining news items:", news.length)
  return true
}

// Client functions
export async function getAllClients(): Promise<Client[]> {
  clients = readDataFile(CLIENTS_FILE, defaultClients)
  return [...clients].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getClientById(id: string): Promise<Client | null> {
  clients = readDataFile(CLIENTS_FILE, defaultClients)
  return clients.find((client) => client.id === id) || null
}

export async function createClient(data: Omit<Client, "id" | "createdAt" | "updatedAt">): Promise<Client> {
  clients = readDataFile(CLIENTS_FILE, defaultClients)

  const newClient: Client = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  clients.push(newClient)
  writeDataFile(CLIENTS_FILE, clients)
  return newClient
}

export async function updateClient(
  id: string,
  data: Partial<Omit<Client, "id" | "createdAt" | "updatedAt">>,
): Promise<Client | null> {
  clients = readDataFile(CLIENTS_FILE, defaultClients)

  const index = clients.findIndex((client) => client.id === id)
  if (index === -1) return null

  clients[index] = {
    ...clients[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  writeDataFile(CLIENTS_FILE, clients)
  return clients[index]
}

export async function deleteClient(id: string): Promise<boolean> {
  clients = readDataFile(CLIENTS_FILE, defaultClients)

  const index = clients.findIndex((client) => client.id === id)
  if (index === -1) return false

  clients.splice(index, 1)
  writeDataFile(CLIENTS_FILE, clients)
  return true
}
