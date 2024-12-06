'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { progressService } from '@/lib/progress-service'
import { AppError } from '@/lib/errors'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import type { Resolution, Milestone } from '@/types/database.types'

interface ProgressTrackerProps {
  resolution: Resolution
  milestones: Milestone[]
  onUpdate: () => void
}

export function ProgressTracker({ resolution, milestones, onUpdate }: ProgressTrackerProps) {
  const [updating, setUpdating] = useState(false)
  const [progressHistory, setProgressHistory] = useState<{ date: string; progress: number }[]>([])

  const loadProgressHistory = useCallback(async () => {
    try {
      const { data: history, error } = await supabase
        .from('progress_history')
        .select('*')
        .eq('resolution_id', resolution.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setProgressHistory(history || [])
    } catch (error) {
      console.error('Error loading progress history:', error)
    }
  }, [resolution.id])

  useEffect(() => {
    loadProgressHistory()
  }, [loadProgressHistory])

  const handleMilestoneToggle = async (milestone: Milestone) => {
    setUpdating(true)
    const newStatus = milestone.status === 'completed' ? 'in_progress' : 'completed'

    try {
      // Update milestone status
      const { error: milestoneError } = await supabase
        .from('milestones')
        .update({ 
          status: newStatus,
          completed_at: newStatus === 'completed' ? new Date().toISOString() : null
        })
        .eq('id', milestone.id)

      if (milestoneError) throw new AppError(milestoneError.message, milestoneError.code, 500)

      // Calculate and update resolution progress
      const progressUpdate = await progressService.calculateProgress(resolution.id)
      await progressService.updateProgress(progressUpdate)

      onUpdate()
      await loadProgressHistory()
      toast.success(newStatus === 'completed' ? 'Milestone completed!' : 'Milestone unchecked')
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to update milestone')
      }
    } finally {
      setUpdating(false)
    }
  }

  const addMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUpdating(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title') as string
    const target_date = formData.get('target_date') as string

    try {
      const { error } = await supabase
        .from('milestones')
        .insert({
          resolution_id: resolution.id,
          title,
          target_date,
          status: 'in_progress'
        })

      if (error) throw new AppError(error.message, error.code, 500)

      form.reset()
      onUpdate()
      toast.success('Milestone added successfully!')
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to add milestone')
      }
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-zinc-400">Overall Progress</span>
            <span className="text-zinc-400">{resolution.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-700">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all"
              style={{ width: `${resolution.progress}%` }}
            />
          </div>
        </div>

        {progressHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-zinc-400">Progress History</h3>
            <div className="space-y-2">
              {progressHistory.map((entry, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-zinc-400">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span className="text-blue-400">{entry.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-medium">Milestones</h3>
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 p-3"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={milestone.status === 'completed'}
                    onChange={() => handleMilestoneToggle(milestone)}
                    disabled={updating}
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-700"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{milestone.title}</p>
                    <p className="text-xs text-zinc-400">
                      Due: {new Date(milestone.target_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {milestone.status === 'completed' && milestone.completed_at && (
                  <div className="text-right">
                    <span className="text-xs text-green-400">Completed</span>
                    <p className="text-xs text-zinc-400">
                      {new Date(milestone.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={addMilestone} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-200">
              New Milestone
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Enter milestone title"
            />
          </div>
          <div>
            <label htmlFor="target_date" className="block text-sm font-medium text-zinc-200">
              Target Date
            </label>
            <input
              type="date"
              id="target_date"
              name="target_date"
              required
              className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <Button type="submit" disabled={updating}>
            Add Milestone
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
