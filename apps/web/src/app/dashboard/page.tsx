'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Project {
  id: number
  name: string
  createdAt: string
}

const getCookie = (name: string): string | undefined => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newProjectName, setNewProjectName] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.href = '/signin'
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = getCookie('token');
        if (!token) {
          setLoading(false);
          // The middleware will redirect, but we stop fetching if no token is found client-side.
          return;
        }

        const response = await fetch('http://localhost:3000/project', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          // If the token is invalid (e.g., expired), the API will return 401.
          // We log out the user.
          handleLogout();
          throw new Error('Session expired. Please sign in again.')
        }

        const data = await response.json()
        setProjects(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleCreateProject = async () => {
    try {
      const token = getCookie('token');
      if (!token) {
        throw new Error('No token found')
      }

      const response = await fetch('http://localhost:3000/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newProjectName }),
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      const newProject = await response.json()
      setProjects([...projects, newProject])
      setNewProjectName('')
      setIsDialogOpen(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Give your new project a name. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateProject}>Save project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}