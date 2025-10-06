"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getClients, createClient, updateClient, deleteClient } from "@/lib/clients"
import { uploadClientImage } from "@/lib/uploadClientImage"

export default function ClientsDashboard() {
  const [clients, setClients] = useState<any[]>([])
  const [newName, setNewName] = useState("")
  const [newFile, setNewFile] = useState<File | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editFile, setEditFile] = useState<File | null>(null)
  const [editImage, setEditImage] = useState<string>("")

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    try {
      const data = await getClients()
      setClients(data)
    } catch (error) {
      console.error("Error loading clients:", error)
    }
  }

  async function handleCreate() {
    if (!newName) return

    let imageUrl = null
    if (newFile) {
      imageUrl = await uploadClientImage(newFile)
    }

    await createClient(newName, imageUrl)
    setNewName("")
    setNewFile(null)
    loadClients()
  }

  async function handleUpdate(id: string) {
    let imageUrl = editImage

    if (editFile) {
      imageUrl = await uploadClientImage(editFile)
    }

    await updateClient(id, { name: editName, image: imageUrl })
    setEditing(null)
    setEditFile(null)
    setEditImage("")
    loadClients()
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this client?")) {
      await deleteClient(id)
      loadClients()
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Clients Dashboard</h1>

      {/* Create new client */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Client name"
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewFile(e.target.files?.[0] || null)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-1/3"
        >
          Add
        </button>
      </div>

      {/* Clients list */}
      <ul className="divide-y border rounded">
        {clients.map((client) => (
          <li key={client.id} className="p-3 flex flex-col sm:flex-row sm:items-center gap-4">
            {editing === client.id ? (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-2 rounded w-full sm:w-1/3"
                  placeholder="Edit name"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                  className="border p-2 rounded w-full sm:w-1/3"
                />
                <button
                  onClick={() => handleUpdate(client.id)}
                  className="bg-blue-600 text-white px-3 py-2 rounded w-full sm:w-1/3"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 flex-1">
                  <Image
                    src={client.image || "/placeholder.svg"}
                    alt={client.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <span>{client.name}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(client.id)
                      setEditName(client.name)
                      setEditImage(client.image || "")
                      setEditFile(null)
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}

        {clients.length === 0 && (
          <li className="p-3 text-gray-500 text-center">No clients yet</li>
        )}
      </ul>
    </div>
  )
}
