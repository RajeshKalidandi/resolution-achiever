'use client'

import Link from 'next/link'
import { ShareIcon, LockIcon, Calendar, Tag, Users2 } from 'lucide-react'
import type { Resolution } from '@/types/database.types'

interface ResolutionCardProps {
  resolution: Resolution & { shared?: boolean; sharePermission?: 'view' | 'edit' }
}

export function ResolutionCard({ resolution }: ResolutionCardProps) {
  return (
    <Link href={`/resolutions/${resolution.id}`}>
      <div className="group relative overflow-hidden transition-colors hover:border-zinc-400 dark:hover:border-zinc-600 bg-white/50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-800 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            resolution.status === 'completed'
              ? 'bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-500'
              : resolution.status === 'in_progress'
              ? 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-500'
              : resolution.status === 'abandoned'
              ? 'bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-500'
              : 'bg-zinc-500/10 text-zinc-500 dark:bg-zinc-500/20 dark:text-zinc-500'
          }`}>
            {resolution.status.replace('_', ' ')}
          </span>
          <div className="flex items-center gap-2">
            {resolution.shared && (
              <div className="flex items-center gap-1 rounded-full bg-zinc-700/50 dark:bg-zinc-700 px-2 py-1 text-xs font-medium text-zinc-300 dark:text-zinc-500">
                {resolution.sharePermission === 'view' ? (
                  <LockIcon className="h-3 w-3" />
                ) : (
                  <ShareIcon className="h-3 w-3" />
                )}
                {resolution.sharePermission === 'view' ? 'View Only' : 'Can Edit'}
              </div>
            )}
            <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-zinc-700 dark:bg-zinc-700 text-zinc-300 dark:text-zinc-500">
              {resolution.category}
            </span>
          </div>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {resolution.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
          {resolution.description}
        </p>
        <div className="mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">Progress</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {resolution.progress || 0}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${resolution.progress || 0}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {/* formatDate(resolution.due_date) */}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {resolution.category}
                </span>
              </div>
            </div>
          </div>
        </div>
        {resolution.shared && (
          <div className="absolute right-4 top-4">
            <Users2 className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        )}
      </div>
    </Link>
  )
}
