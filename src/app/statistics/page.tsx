'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { supabase } from '@/lib/supabase'
import { AppError } from '@/lib/errors'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import type { Resolution, ResolutionCategory } from '@/types/database.types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface CategoryStats {
  category: ResolutionCategory
  count: number
  completed: number
  avgProgress: number
}

interface Statistics {
  totalResolutions: number
  completedResolutions: number
  upcomingMilestones: number
  avgProgress: number
  categoryStats: CategoryStats[]
  monthlyProgress: {
    month: string
    progress: number
  }[]
}

export default function StatisticsPage() {
  const [stats, setStats] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new AppError('User not found', 'AUTH_ERROR', 404)

      // Fetch resolutions
      const { data: resolutions, error: resolutionsError } = await supabase
        .from('resolutions')
        .select('*')
        .eq('user_id', user.id)

      if (resolutionsError) throw new AppError(resolutionsError.message, resolutionsError.code, 500)

      // Fetch upcoming milestones
      const { data: milestones, error: milestonesError } = await supabase
        .from('milestones')
        .select('*')
        .gte('target_date', new Date().toISOString().split('T')[0])
        .order('target_date')
        .limit(5)

      if (milestonesError) throw new AppError(milestonesError.message, milestonesError.code, 500)

      // Calculate statistics
      const categoryStats = calculateCategoryStats(resolutions)
      const monthlyProgress = calculateMonthlyProgress(resolutions)
      
      setStats({
        totalResolutions: resolutions.length,
        completedResolutions: resolutions.filter(r => r.status === 'completed').length,
        upcomingMilestones: milestones.length,
        avgProgress: calculateAverageProgress(resolutions),
        categoryStats,
        monthlyProgress,
      })
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to load statistics')
      }
    } finally {
      setLoading(false)
    }
  }

  const calculateCategoryStats = (resolutions: Resolution[]): CategoryStats[] => {
    const stats = {} as Record<ResolutionCategory, CategoryStats>
    
    resolutions.forEach(resolution => {
      if (!stats[resolution.category]) {
        stats[resolution.category] = {
          category: resolution.category,
          count: 0,
          completed: 0,
          avgProgress: 0,
        }
      }
      
      stats[resolution.category].count++
      if (resolution.status === 'completed') {
        stats[resolution.category].completed++
      }
      stats[resolution.category].avgProgress += resolution.progress
    })

    return Object.values(stats).map(stat => ({
      ...stat,
      avgProgress: stat.count > 0 ? Math.round(stat.avgProgress / stat.count) : 0,
    }))
  }

  const calculateMonthlyProgress = (resolutions: Resolution[]) => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      return date.toLocaleString('default', { month: 'short' })
    }).reverse()

    const monthlyProgress = last6Months.map(month => ({
      month,
      progress: Math.round(
        resolutions.reduce((acc, resolution) => {
          const resolutionMonth = new Date(resolution.updated_at || resolution.created_at)
            .toLocaleString('default', { month: 'short' })
          return resolutionMonth === month ? acc + resolution.progress : acc
        }, 0) / resolutions.length || 0
      ),
    }))

    return monthlyProgress
  }

  const calculateAverageProgress = (resolutions: Resolution[]): number => {
    if (resolutions.length === 0) return 0
    const totalProgress = resolutions.reduce((acc, resolution) => acc + resolution.progress, 0)
    return Math.round(totalProgress / resolutions.length)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900">
        <div className="text-lg text-white">Loading statistics...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900">
        <div className="text-lg text-white">No data available</div>
      </div>
    )
  }

  const categoryChartData = {
    labels: stats.categoryStats.map(stat => stat.category),
    datasets: [
      {
        label: 'Total',
        data: stats.categoryStats.map(stat => stat.count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Completed',
        data: stats.categoryStats.map(stat => stat.completed),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
    ],
  }

  const progressChartData = {
    labels: stats.monthlyProgress.map(item => item.month),
    datasets: [
      {
        label: 'Average Progress',
        data: stats.monthlyProgress.map(item => item.progress),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-2xl font-bold text-white sm:text-3xl">Statistics Dashboard</h1>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Resolutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalResolutions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">
                {stats.completedResolutions}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">{stats.avgProgress}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">
                {stats.upcomingMilestones}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Resolutions by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar
                data={categoryChartData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: 'rgb(161, 161, 170)' },
                      grid: { color: 'rgb(39, 39, 42)' },
                    },
                    x: {
                      ticks: { color: 'rgb(161, 161, 170)' },
                      grid: { color: 'rgb(39, 39, 42)' },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: { color: 'rgb(161, 161, 170)' },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar
                data={progressChartData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: { color: 'rgb(161, 161, 170)' },
                      grid: { color: 'rgb(39, 39, 42)' },
                    },
                    x: {
                      ticks: { color: 'rgb(161, 161, 170)' },
                      grid: { color: 'rgb(39, 39, 42)' },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: { color: 'rgb(161, 161, 170)' },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {stats.categoryStats.map((stat) => (
            <Card key={stat.category}>
              <CardHeader>
                <CardTitle className="capitalize">{stat.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Total: {stat.count}</p>
                    <p className="text-sm text-zinc-400">Completed: {stat.completed}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-500">
                      {stat.avgProgress}%
                    </p>
                    <p className="text-sm text-zinc-400">Average Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
