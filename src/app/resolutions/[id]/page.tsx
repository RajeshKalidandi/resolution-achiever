'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { ShareDialog } from '@/components/resolution/share-dialog'
import { resolutionService } from '@/lib/resolution-service'
import type { Resolution, Milestone, ResolutionStatus } from '@/types/database.types'
import { LockIcon, ShareIcon } from '@/components/icons'
import { AppError } from '@/lib/errors'

const statusOptions: ResolutionStatus[] = ['not_started', 'in_progress', 'completed', 'abandoned']

export default function ResolutionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [resolution, setResolution] = useState<(Resolution & { 
    shared?: boolean; 
    sharePermission?: 'view' | 'edit';
    milestones?: Milestone[];
  }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [showMilestoneForm, setShowMilestoneForm] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)

  const canEdit = !resolution?.shared || resolution?.sharePermission === 'edit'

  const loadResolution = useCallback(async () => {
    try {
      const data = await resolutionService.getResolution(params.id)
      setResolution(data)
    } catch (error: unknown) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to load resolution')
      }
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }, [params.id, router])

  useEffect(() => {
    loadResolution()
  }, [loadResolution])

  const handleStatusChange = async (status: ResolutionStatus) => {
    if (!resolution || !canEdit) return
    try {
      await resolutionService.updateResolution(params.id, { status })
      toast.success('Status updated successfully')
      await loadResolution()
    } catch (error: unknown) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to update status')
      }
    }
  }

  const handleAddMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canEdit) return

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const target_date = formData.get('target_date') as string
    const description = formData.get('description') as string || null
    const now = new Date().toISOString()
    
    if (!title || !target_date) {
      toast.error('Please fill in all fields')
      return
    }
    
    try {
      await resolutionService.addMilestone({
        resolution_id: params.id,
        title,
        description,
        target_date,
        status: 'not_started',
        updated_at: now,
      })
      toast.success('Milestone added successfully')
      setShowMilestoneForm(false)
      await loadResolution()
    } catch (error: unknown) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to add milestone')
      }
    }
  }

  const toggleMilestoneCompletion = async (milestoneId: string, completed: boolean) => {
    if (!canEdit) return
    try {
      await resolutionService.toggleMilestoneCompletion(milestoneId, completed)
      toast.success(completed ? 'Milestone completed!' : 'Milestone uncompleted')
      await loadResolution()
    } catch (error: unknown) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to update milestone')
      }
    }
  }

  if (loading || !resolution) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-900 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {resolution.title}
              {resolution.shared && (
                <span className="ml-3 inline-flex items-center gap-1 rounded-full bg-zinc-700/50 px-3 py-1 text-sm font-medium text-zinc-300">
                  {resolution.sharePermission === 'view' ? (
                    <>
                      <LockIcon className="h-4 w-4" />
                      View Only
                    </>
                  ) : (
                    <>
                      <ShareIcon className="h-4 w-4" />
                      Can Edit
                    </>
                  )}
                </span>
              )}
            </h1>
            <div className="flex space-x-4">
              {canEdit && (
                <select
                  value={resolution.status}
                  onChange={(e) => handleStatusChange(e.target.value as ResolutionStatus)}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              )}
              {!resolution.shared && (
                <Button
                  variant="outline"
                  onClick={() => setShowShareDialog(true)}
                  className="border-zinc-700"
                >
                  Share
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="border-zinc-700"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-6">
                <h2 className="text-lg font-semibold text-white">Details</h2>
                <div className="mt-4 space-y-4">
                  <p className="text-zinc-300">{resolution.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Category:</span>
                    <span className="text-white">{resolution.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Target Date:</span>
                    <span className="text-white">
                      {new Date(resolution.target_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Progress:</span>
                    <span className="text-white">{resolution.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Milestones</h2>
                  {canEdit && (
                    <Button
                      size="sm"
                      onClick={() => setShowMilestoneForm(!showMilestoneForm)}
                    >
                      Add Milestone
                    </Button>
                  )}
                </div>

                {showMilestoneForm && (
                  <form onSubmit={handleAddMilestone} className="mt-4 space-y-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Milestone title"
                      required
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      name="target_date"
                      required
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                    <textarea
                      name="description"
                      placeholder="Milestone description"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMilestoneForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" size="sm">
                        Add
                      </Button>
                    </div>
                  </form>
                )}

                <div className="mt-4 space-y-4">
                  {resolution.milestones?.map((milestone: Milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={milestone.status === 'completed'}
                          onChange={(e) =>
                            toggleMilestoneCompletion(milestone.id, e.target.checked)
                          }
                          disabled={!canEdit}
                          className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 text-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <div>
                          <p className="text-white">{milestone.title}</p>
                          <p className="text-sm text-zinc-400">
                            Due: {new Date(milestone.target_date).toLocaleDateString()}
                          </p>
                          {milestone.completed_at && (
                            <p className="text-sm text-green-400">
                              Completed: {new Date(milestone.completed_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-6">
                <h2 className="text-lg font-semibold text-white">Progress</h2>
                <div className="mt-4">
                  <div className="h-4 w-full rounded-full bg-zinc-700">
                    <div
                      className="h-4 rounded-full bg-blue-500 transition-all"
                      style={{ width: `${resolution.progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-sm text-zinc-400">
                    {resolution.progress}% Complete
                  </p>
                </div>
              </div>

              {resolution.reflection && (
                <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-6">
                  <h2 className="text-lg font-semibold text-white">Reflection</h2>
                  <p className="mt-4 text-zinc-300">{resolution.reflection}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ShareDialog
        resolutionId={params.id}
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
      />
    </>
  )
}
