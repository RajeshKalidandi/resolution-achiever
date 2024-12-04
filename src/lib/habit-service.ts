import { supabase } from './supabase'
import { AppError } from './errors'

export interface Habit {
  id: string
  user_id: string
  name: string
  description: string | null
  frequency: 'daily' | 'weekly' | 'monthly'
  target_count: number
  current_streak: number
  longest_streak: number
  start_date: string
  last_completed: string | null
  mood_tracking: boolean
  trigger_tracking: boolean
  archived: boolean
  created_at: string
  updated_at: string
}

export interface HabitLog {
  id: string
  habit_id: string
  completed_at: string
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible' | null
  trigger_notes: string | null
  coping_strategy: string | null
  notes: string | null
  created_at: string
}

export interface Addiction {
  id: string
  user_id: string
  name: string
  description: string | null
  quit_date: string
  money_saved_per_day: number | null
  triggers: string[]
  coping_strategies: string[]
  current_streak: number
  longest_streak: number
  relapse_count: number
  emergency_contact_id: string | null
  archived: boolean
  created_at: string
  updated_at: string
}

export interface RelapseLog {
  id: string
  addiction_id: string
  relapse_date: string
  trigger: string | null
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible'
  intensity: number
  coping_strategies_used: string[]
  notes: string | null
  created_at: string
}

class HabitService {
  async getHabits() {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new AppError('Failed to fetch habits', 'DATABASE_ERROR')
    return data
  }

  async createHabit(habit: Omit<Habit, 'id' | 'current_streak' | 'longest_streak' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new AppError('User not found', 'AUTH_ERROR', 404)

    const { data, error } = await supabase
      .from('habits')
      .insert([{ ...habit, user_id: user.id }])
      .select()
      .single()

    if (error) throw new AppError('Failed to create habit', 'DATABASE_ERROR')
    return data
  }

  async logHabitCompletion(habitId: string, mood?: 'great' | 'good' | 'neutral' | 'bad' | 'terrible' | null, triggerNotes?: string | null, copingStrategy?: string | null, notes?: string | null) {
    const { data: habit, error: habitError } = await supabase
      .from('habits')
      .select('*')
      .eq('id', habitId)
      .single()

    if (habitError) throw new AppError('Habit not found', 'DATABASE_ERROR', 404)

    // Create the log entry
    const { error: logError } = await supabase
      .from('habit_logs')
      .insert([{ habit_id: habitId, mood, trigger_notes: triggerNotes, coping_strategy: copingStrategy, notes }])

    if (logError) throw new AppError('Failed to log completion', 'DATABASE_ERROR')

    // Update streak
    const lastCompleted = new Date(habit.last_completed || 0)
    const now = new Date()
    const daysSinceLastCompletion = Math.floor(
      (now.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24)
    )

    let newStreak = habit.current_streak
    if (daysSinceLastCompletion <= 1) {
      newStreak += 1
    } else {
      newStreak = 1
    }

    const { error: updateError } = await supabase
      .from('habits')
      .update({
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, habit.longest_streak),
        last_completed: new Date().toISOString(),
      })
      .eq('id', habitId)

    if (updateError) throw new AppError('Failed to update streak', 'DATABASE_ERROR')
  }

  async getAddictions() {
    const { data, error } = await supabase
      .from('addictions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new AppError('Failed to fetch addictions', 'DATABASE_ERROR')
    return data
  }

  async createAddiction(addiction: Omit<Addiction, 'id' | 'current_streak' | 'longest_streak' | 'relapse_count' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new AppError('User not found', 'AUTH_ERROR', 404)

    const { data, error } = await supabase
      .from('addictions')
      .insert([{ ...addiction, user_id: user.id }])
      .select()
      .single()

    if (error) throw new AppError('Failed to create addiction', 'DATABASE_ERROR')
    return data
  }

  async logRelapse(addictionId: string, trigger?: string | null, mood?: 'great' | 'good' | 'neutral' | 'bad' | 'terrible', intensity?: number, copingStrategiesUsed?: string[], notes?: string | null) {
    const { data: addiction, error: addictionError } = await supabase
      .from('addictions')
      .select('*')
      .eq('id', addictionId)
      .single()

    if (addictionError) throw new AppError('Addiction not found', 'DATABASE_ERROR', 404)

    // Create the relapse log
    const { error: logError } = await supabase
      .from('relapse_logs')
      .insert([{ addiction_id: addictionId, trigger, mood, intensity, coping_strategies_used: copingStrategiesUsed, notes }])

    if (logError) throw new AppError('Failed to log relapse', 'DATABASE_ERROR')

    // Update streak and relapse count
    const { error: updateError } = await supabase
      .from('addictions')
      .update({
        current_streak: 0,
        relapse_count: addiction.relapse_count + 1,
      })
      .eq('id', addictionId)

    if (updateError) throw new AppError('Failed to update addiction', 'DATABASE_ERROR')
  }

  async calculateMoneySaved(addictionId: string): Promise<number> {
    const { data: addiction, error } = await supabase
      .from('addictions')
      .select('*')
      .eq('id', addictionId)
      .single()

    if (error) throw new AppError('Addiction not found', 'DATABASE_ERROR', 404)
    if (!addiction.money_saved_per_day) return 0

    const quitDate = new Date(addiction.quit_date)
    const now = new Date()
    const daysSinceQuitting = Math.floor(
      (now.getTime() - quitDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    return daysSinceQuitting * addiction.money_saved_per_day
  }
}

export const habitService = new HabitService()
