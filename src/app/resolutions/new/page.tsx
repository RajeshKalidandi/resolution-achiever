'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { resolutionService } from '@/lib/resolution-service'
import { AppError } from '@/lib/errors'
import type { ResolutionCategory } from '@/types/database.types'

const categories: ResolutionCategory[] = [
  'health',
  'career',
  'education',
  'financial',
  'personal',
  'relationships',
  'other',
]

export default function NewResolutionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || null,
      category: formData.get('category') as ResolutionCategory,
      target_date: formData.get('target_date') as string,
      status: 'not_started' as const,
      progress: 0,
      reflection: null,
      updated_at: new Date().toISOString(),
      is_private: true,
      streak_count: 0,
      last_check_in: null
    }

    try {
      await resolutionService.createResolution(data)
      toast.success('Resolution created successfully!')
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to create resolution')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Create New Resolution
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter your resolution title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Describe your resolution and what you want to achieve"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white">
                Category
              </label>
              <select
                name="category"
                id="category"
                required
                className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="target_date" className="block text-sm font-medium text-white">
                Target Date
              </label>
              <input
                type="date"
                name="target_date"
                id="target_date"
                required
                className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Resolution'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
