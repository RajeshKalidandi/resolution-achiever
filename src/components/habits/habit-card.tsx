'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Trophy, Calendar, BarChart2 } from 'lucide-react'
import type { Habit } from '@/lib/habit-service'
import { habitService } from '@/lib/habit-service'
import { toast } from 'react-hot-toast'

interface HabitCardProps {
  habit: Habit
  onComplete: () => void
}

export function HabitCard({ habit, onComplete }: HabitCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleComplete = async () => {
    try {
      setIsLoading(true)
      await habitService.logHabitCompletion(habit.id)
      toast.success('Habit completed!')
      onComplete()
    } catch (error) {
      toast.error('Failed to complete habit')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white/50 dark:bg-zinc-800/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          {habit.name}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          disabled={isLoading}
          onClick={handleComplete}
          className="h-8 w-8"
        >
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          {habit.description}
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <Trophy className="mx-auto h-4 w-4 text-yellow-500" />
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {habit.longest_streak}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Best Streak</p>
          </div>
          <div className="space-y-1">
            <BarChart2 className="mx-auto h-4 w-4 text-blue-500" />
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {habit.current_streak}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Current Streak</p>
          </div>
          <div className="space-y-1">
            <Calendar className="mx-auto h-4 w-4 text-purple-500" />
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {habit.frequency}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Frequency</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
