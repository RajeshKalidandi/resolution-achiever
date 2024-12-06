'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Trophy, Star, Shield } from 'lucide-react'
import type { Resolution, Habit, Addiction } from '@/types/database.types'

interface QuickStatsProps {
  personalResolutions: Resolution[]
  sharedResolutions: Resolution[]
  habits: Habit[]
  addictions: Addiction[]
}

const calculateStats = (
  personalResolutions: Resolution[], 
  sharedResolutions: Resolution[],
  habits: Habit[],
  addictions: Addiction[]
) => {
  const allResolutions = [...personalResolutions, ...sharedResolutions]
  
  return {
    totalResolutions: allResolutions.length,
    completedResolutions: allResolutions.filter(r => r.status === 'completed').length,
    totalHabits: habits.filter(h => !h.archived).length,
    streakingHabits: habits.filter(h => !h.archived && h.current_streak > 0).length,
    recoveryStrength: addictions.reduce((acc, a) => acc + (a.current_streak || 0), 0) / (addictions.filter(a => !a.archived).length || 1)
  }
}

export function QuickStats({ personalResolutions, sharedResolutions, habits, addictions }: QuickStatsProps) {
  const {
    totalResolutions,
    completedResolutions,
    totalHabits,
    streakingHabits,
    recoveryStrength
  } = calculateStats(personalResolutions, sharedResolutions, habits, addictions)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white/50 dark:bg-zinc-800/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Active Goals</CardTitle>
          <Target className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalResolutions + totalHabits}</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Total resolutions and habits</p>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-zinc-800/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Completed</CardTitle>
          <Trophy className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{completedResolutions}</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Achieved resolutions</p>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-zinc-800/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Streaking Habits</CardTitle>
          <Star className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{streakingHabits}</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Habits with active streaks</p>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-zinc-800/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Recovery Strength</CardTitle>
          <Shield className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{Math.round(recoveryStrength)}</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Average addiction recovery streak</p>
        </CardContent>
      </Card>
    </div>
  )
}
