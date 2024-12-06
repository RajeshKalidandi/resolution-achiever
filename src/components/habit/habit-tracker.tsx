'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { format, differenceInDays, isSameDay } from 'date-fns'
import { supabase } from '@/lib/supabase'
import { AppError } from '@/lib/errors'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import type { Resolution, HabitLog, Streak } from '@/types/database.types'

interface HabitTrackerProps {
  resolution: Resolution
  onUpdate: () => void
}

export function HabitTracker({ resolution, onUpdate }: HabitTrackerProps) {
  const [logs, setLogs] = useState<HabitLog[]>([])
  const [streak, setStreak] = useState<Streak | null>(null)
  const [loading, setLoading] = useState(true)
  const [showTriggerForm, setShowTriggerForm] = useState(false)
  const [triggerNotes, setTriggerNotes] = useState('')
  const [copingStrategy, setCopingStrategy] = useState('')

  useEffect(() => {
    const loadHabitData = async () => {
      try {
        // Load habit logs
        const { data: habitLogs, error: logsError } = await supabase
          .from('habit_logs')
          .select('*')
          .eq('resolution_id', resolution.id)
          .order('check_in_date', { ascending: false })
          .limit(30)

        if (logsError) throw new AppError(logsError.message, logsError.code, 500)

        // Load current streak
        const { data: streakData, error: streakError } = await supabase
          .from('streaks')
          .select('*')
          .eq('resolution_id', resolution.id)
          .eq('is_active', true)
          .single()

        if (streakError && streakError.code !== 'PGRST116') {
          throw new AppError(streakError.message, streakError.code, 500)
        }

        setLogs(habitLogs || [])
        setStreak(streakData || null)
      } catch (error) {
        if (error instanceof AppError) {
          toast.error(error.message)
        } else {
          toast.error('Failed to load habit data')
        }
      } finally {
        setLoading(false)
      }
    }

    loadHabitData()
  }, [resolution.id])

  const handleCheckIn = async (mood: HabitLog['mood']) => {
    try {
      setLoading(true)
      const today = new Date().toISOString().split('T')[0]

      // Get current logs first
      const { data: currentLogs, error: logsError } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('resolution_id', resolution.id)
        .order('check_in_date', { ascending: false })
        .limit(7)

      if (logsError) throw new AppError(logsError.message, logsError.code, 500)
      
      // Check if already checked in today
      const existingLog = currentLogs.find(log => 
        isSameDay(new Date(log.check_in_date), new Date(today))
      )
      
      if (existingLog) {
        toast.error('Already checked in today')
        return
      }

      // Create new log
      const { error: createError } = await supabase
        .from('habit_logs')
        .insert([{
          resolution_id: resolution.id,
          check_in_date: today,
          mood,
          trigger_notes: triggerNotes,
          coping_strategy: copingStrategy
        }])

      if (createError) throw new AppError(createError.message, createError.code, 500)

      // Fetch updated logs
      const { data: updatedLogs, error: updateError } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('resolution_id', resolution.id)
        .order('check_in_date', { ascending: false })
        .limit(7)

      if (updateError) throw new AppError(updateError.message, updateError.code, 500)

      setLogs(updatedLogs)
      setShowTriggerForm(false)
      setTriggerNotes('')
      setCopingStrategy('')
      toast.success('Check-in recorded!')
      onUpdate()
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to record check-in')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTriggerLog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const { error } = await supabase
        .from('habit_logs')
        .insert({
          resolution_id: resolution.id,
          check_in_date: new Date().toISOString(),
          mood: 'bad',
          trigger_notes: formData.get('trigger_notes'),
          coping_strategy: formData.get('coping_strategy'),
        })

      if (error) throw new AppError(error.message, error.code, 500)

      form.reset()
      setShowTriggerForm(false)
      toast.success('Trigger logged successfully. Stay strong!')
      const { data: logs, error: logsError } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('resolution_id', resolution.id)
        .order('check_in_date', { ascending: false })
        .limit(7)

      if (logsError) throw new AppError(logsError.message, logsError.code, 500)
      setLogs(logs)
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to log trigger')
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Check-in</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-zinc-400">Current Streak</h3>
            <p className="text-4xl font-bold text-blue-500">
              {resolution.streak_count} {resolution.streak_count === 1 ? 'day' : 'days'}
            </p>
            {streak && (
              <p className="mt-1 text-sm text-zinc-400">
                Started on {format(new Date(streak.start_date), 'MMM d, yyyy')}
              </p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">How are you feeling today?</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => handleCheckIn('great')}
                className="flex-1"
              >
                😄 Great
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCheckIn('good')}
                className="flex-1"
              >
                🙂 Good
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCheckIn('neutral')}
                className="flex-1"
              >
                😐 Okay
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCheckIn('bad')}
                className="flex-1"
              >
                😟 Struggling
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowTriggerForm(!showTriggerForm)}
              className="w-full"
            >
              {showTriggerForm ? 'Hide Form' : '🆘 Need Help / Log Trigger'}
            </Button>

            {showTriggerForm && (
              <form onSubmit={handleTriggerLog} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="trigger_notes" className="block text-sm font-medium text-zinc-400">
                    What triggered you?
                  </label>
                  <textarea
                    id="trigger_notes"
                    name="trigger_notes"
                    rows={3}
                    className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white placeholder-zinc-400"
                    placeholder="Describe what happened..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="coping_strategy" className="block text-sm font-medium text-zinc-400">
                    What will you do instead?
                  </label>
                  <textarea
                    id="coping_strategy"
                    name="coping_strategy"
                    rows={3}
                    className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white placeholder-zinc-400"
                    placeholder="Your coping strategy..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Log & Get Back on Track
                </Button>
              </form>
            )}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-zinc-400">Recent Check-ins</h3>
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">
                      {format(new Date(log.check_in_date), 'MMM d, yyyy')}
                    </span>
                    <span className="text-sm">
                      {log.mood === 'great' && '😄'}
                      {log.mood === 'good' && '🙂'}
                      {log.mood === 'neutral' && '😐'}
                      {log.mood === 'bad' && '😟'}
                      {log.mood === 'terrible' && '😢'}
                    </span>
                  </div>
                  {log.trigger_notes && (
                    <div className="mt-2 text-sm">
                      <p className="text-zinc-400">Trigger: {log.trigger_notes}</p>
                      {log.coping_strategy && (
                        <p className="mt-1 text-green-400">
                          Strategy: {log.coping_strategy}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
