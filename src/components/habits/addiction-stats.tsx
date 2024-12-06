'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { differenceInDays, format } from 'date-fns'
import { SavingsCalculator } from './savings-calculator'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import type { Addiction } from '@/lib/habit-service'

interface AddictionStatsProps {
  addiction: Addiction
}

interface SavingsBreakdown {
  daily: number
  weekly: number
  monthly: number
  yearly: number
}

interface ProgressMetric {
  name: string
  value: number
  target: number
  description: string
}

interface TimelineData {
  date: string
  streak: number
  savings: number
}

export function AddictionStats({ addiction }: AddictionStatsProps) {
  const [successRate, setSuccessRate] = useState<number>(0)
  const [averageStreak, setAverageStreak] = useState<number>(0)
  const [savingsBreakdown, setSavingsBreakdown] = useState<SavingsBreakdown>({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
  })
  const [progressMetrics, setProgressMetrics] = useState<ProgressMetric[]>([])
  const [timelineData, setTimelineData] = useState<TimelineData[]>([])
  const [nextMilestone, setNextMilestone] = useState<{ days: number; milestone: number }>({
    days: 0,
    milestone: 0
  })

  const generateTimelineData = useCallback(() => {
    const data = []
    const startDate = new Date(addiction.quit_date)
    const today = new Date()
    let currentDate = startDate

    while (currentDate <= today) {
      data.push({
        date: format(currentDate, 'MMM d'),
        streak: differenceInDays(currentDate, startDate),
        savings: differenceInDays(currentDate, startDate) * (addiction.money_saved_per_day || 0)
      })
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
    }
    return data
  }, [addiction.quit_date, addiction.money_saved_per_day])

  useEffect(() => {
    // Calculate success rate
    const totalDays = differenceInDays(new Date(), new Date(addiction.quit_date))
    const successDays = totalDays - addiction.relapse_count
    const rate = (successDays / totalDays) * 100
    setSuccessRate(isNaN(rate) ? 0 : rate)

    // Calculate average streak
    const avgStreak = addiction.relapse_count === 0 
      ? addiction.current_streak 
      : totalDays / (addiction.relapse_count + 1)
    setAverageStreak(avgStreak)

    // Calculate savings breakdown
    const dailySavings = addiction.money_saved_per_day || 0
    setSavingsBreakdown({
      daily: dailySavings,
      weekly: dailySavings * 7,
      monthly: dailySavings * 30,
      yearly: dailySavings * 365
    })

    // Calculate milestones and progress metrics
    const milestones = [7, 30, 90, 180, 365]
    const nextMile = milestones.find(m => m > addiction.current_streak) || milestones[milestones.length - 1]
    const daysToMilestone = nextMile - addiction.current_streak
    setNextMilestone({ days: daysToMilestone, milestone: nextMile })

    // Set progress metrics
    setProgressMetrics([
      {
        name: 'Weekly Goal',
        value: addiction.current_streak % 7,
        target: 7,
        description: 'Days this week'
      },
      {
        name: 'Monthly Goal',
        value: addiction.current_streak % 30,
        target: 30,
        description: 'Days this month'
      },
      {
        name: 'Milestone Progress',
        value: addiction.current_streak,
        target: nextMile,
        description: `Progress to ${nextMile} days`
      }
    ])

    // Generate timeline data
    setTimelineData(generateTimelineData())
  }, [addiction, generateTimelineData])

  const handleSavingsUpdate = (newDailyAmount: number) => {
    setSavingsBreakdown({
      daily: newDailyAmount,
      weekly: newDailyAmount * 7,
      monthly: newDailyAmount * 30,
      yearly: newDailyAmount * 365
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progress Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-500">Success Rate</span>
                <span className="text-sm font-medium">{successRate.toFixed(1)}%</span>
              </div>
              <Progress value={successRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">Average Streak</p>
                <p className="text-xl font-bold">{Math.round(averageStreak)} days</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Next Milestone</p>
                <p className="text-xl font-bold">{nextMilestone.days} days</p>
                <p className="text-xs text-zinc-500">until {nextMilestone.milestone} days</p>
              </div>
            </div>

            <div className="space-y-4">
              {progressMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-500">{metric.name}</span>
                    <span className="text-sm font-medium">
                      {metric.value} / {metric.target}
                    </span>
                  </div>
                  <Progress 
                    value={(metric.value / metric.target) * 100} 
                    className="h-2" 
                  />
                  <p className="text-xs text-zinc-500 mt-1">{metric.description}</p>
                </div>
              ))}
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="streak" 
                    stroke="#2563eb" 
                    name="Streak Days"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Savings Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="projected">Projected</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-500">Total Saved</p>
                    <p className="text-2xl font-bold">
                      ${(addiction.current_streak * (addiction.money_saved_per_day || 0)).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Daily Rate</p>
                    <p className="text-2xl font-bold">${addiction.money_saved_per_day || 0}/day</p>
                  </div>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineData.slice(-7)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="savings" fill="#22c55e" name="Savings ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="projected">
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-500">Weekly</p>
                    <p className="text-xl font-bold">${savingsBreakdown.weekly.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Monthly</p>
                    <p className="text-xl font-bold">${savingsBreakdown.monthly.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Yearly Projection</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${savingsBreakdown.yearly.toFixed(2)}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="customize">
              <div className="pt-4">
                <SavingsCalculator 
                  initialDailyAmount={addiction.money_saved_per_day || 0}
                  onUpdate={handleSavingsUpdate}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
