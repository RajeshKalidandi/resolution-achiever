export type ResolutionCategory = 
  | 'health'
  | 'career'
  | 'education'
  | 'financial'
  | 'personal'
  | 'relationships'
  | 'addiction_recovery'
  | 'mental_health'
  | 'other'

export type ResolutionStatus = 'not_started' | 'in_progress' | 'completed' | 'abandoned'

export type HabitFrequency = 'daily' | 'weekly' | 'monthly'

export type SharePermission = 'view' | 'edit'

export interface Resolution {
  id: string
  user_id: string
  title: string
  description: string | null
  category: ResolutionCategory
  status: ResolutionStatus
  progress: number
  target_date: string
  reflection: string | null
  is_private: boolean
  streak_count: number
  last_check_in: string | null
  created_at: string
  updated_at?: string
}

export interface Milestone {
  id: string
  resolution_id: string
  title: string
  description: string | null
  status: ResolutionStatus
  target_date: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  notification_preferences: {
    email: boolean
    push: boolean
  }
  theme_preference: 'light' | 'dark' | 'system'
  created_at: string
  updated_at: string
}

export interface HabitLog {
  id: string
  resolution_id: string
  check_in_date: string
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible'
  trigger_notes: string | null
  coping_strategy: string | null
  created_at: string
}

export interface Streak {
  id: string
  resolution_id: string
  start_date: string
  end_date: string | null
  current_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface EmergencyContact {
  id: string
  user_id: string
  name: string
  relationship: string
  phone: string
  email: string | null
  is_notified_on_relapse: boolean
  created_at: string
  updated_at: string
}

export interface ResolutionShare {
  id: string
  resolution_id: string
  shared_by_id: string
  shared_with_id: string
  permission: SharePermission
  created_at: string
}

export interface Habit {
  id: string
  user_id: string
  name: string
  description: string | null
  frequency: HabitFrequency
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
