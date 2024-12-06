'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle2, Circle, Clock, Star, Shield } from 'lucide-react'
import type { Resolution, Habit, Addiction } from '@/types/database.types'

interface RecentActivityProps {
  resolutions: Resolution[]
  habits: Habit[]
  addictions: Addiction[]
}

type ActivityItem = {
  id: string
  title: string
  type: 'resolution' | 'habit' | 'addiction'
  status: string
  date: string
}

export function RecentActivity({ resolutions, habits, addictions }: RecentActivityProps) {
  const getActivityItems = (): ActivityItem[] => {
    const items: ActivityItem[] = [
      ...resolutions.map(r => ({
        id: r.id,
        title: r.title,
        type: 'resolution' as const,
        status: r.status,
        date: r.updated_at || r.created_at // Fallback to created_at if updated_at is undefined
      })),
      ...habits.filter(h => !h.archived).map(h => ({
        id: h.id,
        title: h.name,
        type: 'habit' as const,
        status: h.current_streak > 0 ? 'active' : 'inactive',
        date: h.updated_at || h.created_at
      })),
      ...addictions.filter(a => !a.archived).map(a => ({
        id: a.id,
        title: a.name,
        type: 'addiction' as const,
        status: a.current_streak > 0 ? 'recovery' : 'relapse',
        date: a.updated_at || a.created_at
      }))
    ]

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case 'resolution':
        switch (status) {
          case 'completed':
            return <CheckCircle2 className="h-4 w-4 text-green-400" />
          case 'in_progress':
            return <Clock className="h-4 w-4 text-yellow-400" />
          default:
            return <Circle className="h-4 w-4 text-zinc-400" />
        }
      case 'habit':
        return <Star className={`h-4 w-4 ${status === 'active' ? 'text-yellow-400' : 'text-zinc-400'}`} />
      case 'addiction':
        return <Shield className={`h-4 w-4 ${status === 'recovery' ? 'text-green-400' : 'text-red-400'}`} />
      default:
        return <Circle className="h-4 w-4 text-zinc-400" />
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const activityItems = getActivityItems()

  return (
    <Card className="col-span-3 bg-white/50 dark:bg-zinc-800/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {activityItems.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="mb-4 flex items-center space-x-4 rounded-lg bg-white dark:bg-zinc-800/50 p-3 border border-zinc-200 dark:border-zinc-700"
            >
              {getActivityIcon(item.type, item.status)}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.type === 'resolution' ? `Status: ${item.status}` :
                   item.type === 'habit' ? `Streak: ${item.status === 'active' ? 'Active' : 'Inactive'}` :
                   `Recovery: ${item.status === 'recovery' ? 'On Track' : 'Needs Support'}`}
                </p>
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {formatDate(item.date)}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
