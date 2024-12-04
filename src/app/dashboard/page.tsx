'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { resolutionService } from '@/lib/resolution-service'
import { habitService } from '@/lib/habit-service'
import { AppError } from '@/lib/errors'
import type { Resolution, Habit, Addiction } from '@/types/database.types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ResolutionCard } from '@/components/resolution/resolution-card'
import { HabitCard } from '@/components/habits/habit-card'
import { AddictionCard } from '@/components/habits/addiction-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QuickStats } from '@/components/dashboard/quick-stats'
import { SearchFilter } from '@/components/dashboard/search-filter'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/components/user-menu'

export default function DashboardPage() {
  const [personalResolutions, setPersonalResolutions] = useState<Resolution[]>([])
  const [sharedResolutions, setSharedResolutions] = useState<Resolution[]>([])
  const [habits, setHabits] = useState<Habit[]>([])
  const [addictions, setAddictions] = useState<Addiction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [personal, shared, habitsData, addictionsData] = await Promise.all([
        resolutionService.getUserResolutions(),
        resolutionService.getSharedResolutions(),
        habitService.getHabits(),
        habitService.getAddictions(),
      ])
      setPersonalResolutions(personal)
      setSharedResolutions(shared)
      setHabits(habitsData)
      setAddictions(addictionsData)
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to load data')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleHabitComplete = async () => {
    await loadData()
  }

  const handleAddictionRelapse = async () => {
    await loadData()
  }

  const filterResolutions = (resolutions: Resolution[]) => {
    return resolutions.filter((resolution) => {
      const matchesSearch = resolution.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || resolution.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || resolution.status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900 dark:bg-white">
        <div className="text-lg text-white dark:text-zinc-900">Loading your data...</div>
      </div>
    )
  }

  const hasNoData = !personalResolutions.length && !sharedResolutions.length && !habits.length && !addictions.length

  if (hasNoData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 dark:bg-white px-4">
        <h1 className="mb-4 text-2xl font-bold text-white dark:text-zinc-900">Welcome to Resolution Achiever</h1>
        <p className="text-center text-zinc-400 dark:text-zinc-500">
          You haven&apos;t created any resolutions, habits or addictions yet. Start by creating your first one!
        </p>
        <Link href="/resolutions/new">
          <Button className="mt-4">Create Resolution</Button>
        </Link>
      </div>
    )
  }

  const filteredPersonalResolutions = filterResolutions(personalResolutions)
  const filteredSharedResolutions = filterResolutions(sharedResolutions)

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Your Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserMenu />
            <Link href="/resolutions/new">
              <Button>New Resolution</Button>
            </Link>
          </div>
        </div>

        <QuickStats
          personalResolutions={personalResolutions}
          sharedResolutions={sharedResolutions}
          habits={habits}
          addictions={addictions}
        />

        <SearchFilter
          onSearch={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onStatusChange={setSelectedStatus}
        />

        <Tabs defaultValue="resolutions" className="space-y-6">
          <TabsList className="bg-white dark:bg-zinc-800">
            <TabsTrigger value="resolutions" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-700">
              Resolutions
            </TabsTrigger>
            <TabsTrigger value="habits" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-700">
              Habits
              {habits.length > 0 && (
                <span className="ml-2 rounded-full bg-zinc-200 dark:bg-zinc-600 px-2 py-0.5 text-xs">
                  {habits.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="addictions" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-700">
              Recovery
              {addictions.length > 0 && (
                <span className="ml-2 rounded-full bg-zinc-200 dark:bg-zinc-600 px-2 py-0.5 text-xs">
                  {addictions.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resolutions">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="bg-zinc-800 dark:bg-zinc-700">
                <TabsTrigger value="personal" className="data-[state=active]:bg-zinc-700 dark:bg-zinc-600">
                  Personal
                  {filteredPersonalResolutions.length > 0 && (
                    <span className="ml-2 rounded-full bg-zinc-700 dark:bg-zinc-600 px-2 py-0.5 text-xs">
                      {filteredPersonalResolutions.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="shared" className="data-[state=active]:bg-zinc-700 dark:bg-zinc-600">
                  Shared
                  {filteredSharedResolutions.length > 0 && (
                    <span className="ml-2 rounded-full bg-zinc-700 dark:bg-zinc-600 px-2 py-0.5 text-xs">
                      {filteredSharedResolutions.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {filteredPersonalResolutions.map((resolution) => (
                    <ResolutionCard key={resolution.id} resolution={resolution} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shared" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {filteredSharedResolutions.map((resolution) => (
                    <ResolutionCard key={resolution.id} resolution={resolution} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="habits">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onComplete={handleHabitComplete}
                />
              ))}
              {habits.length === 0 && (
                <div className="col-span-full text-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    You haven't created any habits yet. Start building good habits today!
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => {
                      // TODO: Add habit creation dialog
                      toast.success('Coming soon!')
                    }}
                  >
                    Create Habit
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="addictions">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {addictions.map((addiction) => (
                <AddictionCard
                  key={addiction.id}
                  addiction={addiction}
                  onRelapse={handleAddictionRelapse}
                />
              ))}
              {addictions.length === 0 && (
                <div className="col-span-full text-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Start your recovery journey by tracking addictions you want to overcome.
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => {
                      // TODO: Add addiction creation dialog
                      toast.success('Coming soon!')
                    }}
                  >
                    Start Recovery
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <RecentActivity resolutions={[...personalResolutions, ...sharedResolutions]} habits={habits} addictions={addictions} />
      </div>
    </div>
  )
}
