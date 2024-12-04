'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Trophy, Clock, DollarSign } from 'lucide-react'
import type { Addiction } from '@/lib/habit-service'
import { habitService } from '@/lib/habit-service'
import { toast } from 'react-hot-toast'

interface AddictionCardProps {
  addiction: Addiction
  onRelapse: () => void
}

export function AddictionCard({ addiction, onRelapse }: AddictionCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [moneySaved, setMoneySaved] = useState<number | null>(null)

  const handleRelapse = async () => {
    if (!window.confirm('Are you sure you want to log a relapse?')) return

    try {
      setIsLoading(true)
      await habitService.logRelapse(addiction.id)
      toast.success('Stay strong! Every setback is a setup for a comeback.')
      onRelapse()
    } catch (error) {
      toast.error('Failed to log relapse')
    } finally {
      setIsLoading(false)
    }
  }

  const loadMoneySaved = async () => {
    if (addiction.money_saved_per_day) {
      const saved = await habitService.calculateMoneySaved(addiction.id)
      setMoneySaved(saved)
    }
  }

  useState(() => {
    loadMoneySaved()
  }, [addiction.id])

  const quitDate = new Date(addiction.quit_date)
  const now = new Date()
  const daysSinceQuitting = Math.floor(
    (now.getTime() - quitDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Card className="bg-white/50 dark:bg-zinc-800/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          {addiction.name}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          disabled={isLoading}
          onClick={handleRelapse}
          className="h-8 w-8"
        >
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          {addiction.description}
        </p>
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          <div className="space-y-1">
            <Trophy className="mx-auto h-4 w-4 text-yellow-500" />
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {addiction.longest_streak}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Best Streak</p>
          </div>
          <div className="space-y-1">
            <Clock className="mx-auto h-4 w-4 text-blue-500" />
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {addiction.current_streak}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Current Streak</p>
          </div>
          <div className="space-y-1">
            <AlertTriangle className="mx-auto h-4 w-4 text-red-500" />
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {addiction.relapse_count}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Relapses</p>
          </div>
          {moneySaved !== null && (
            <div className="space-y-1">
              <DollarSign className="mx-auto h-4 w-4 text-green-500" />
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                ${moneySaved.toFixed(2)}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Money Saved</p>
            </div>
          )}
        </div>
        {addiction.triggers && addiction.triggers.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Common Triggers:
            </p>
            <div className="flex flex-wrap gap-2">
              {addiction.triggers.map((trigger, index) => (
                <span
                  key={index}
                  className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500"
                >
                  {trigger}
                </span>
              ))}
            </div>
          </div>
        )}
        {addiction.coping_strategies && addiction.coping_strategies.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Coping Strategies:
            </p>
            <div className="flex flex-wrap gap-2">
              {addiction.coping_strategies.map((strategy, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500"
                >
                  {strategy}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
