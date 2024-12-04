import { supabase } from './supabase'
import { AppError } from './errors'
import type { Resolution, Milestone } from '@/types/database.types'

interface ProgressUpdate {
  resolutionId: string
  progress: number
  status: Resolution['status']
}

class ProgressService {
  /**
   * Calculate progress based on completed milestones and weights
   */
  async calculateProgress(resolutionId: string): Promise<ProgressUpdate> {
    try {
      // Fetch all milestones for the resolution
      const { data: milestones, error: milestonesError } = await supabase
        .from('milestones')
        .select('*')
        .eq('resolution_id', resolutionId)

      if (milestonesError) throw new AppError(milestonesError.message, milestonesError.code, 500)

      // If there are no milestones, return current progress
      if (!milestones || milestones.length === 0) {
        const { data: resolution, error: resolutionError } = await supabase
          .from('resolutions')
          .select('progress, status')
          .eq('id', resolutionId)
          .single()

        if (resolutionError) throw new AppError(resolutionError.message, resolutionError.code, 500)

        return {
          resolutionId,
          progress: resolution.progress,
          status: resolution.status,
        }
      }

      // Calculate progress based on completed milestones
      const completedMilestones = milestones.filter(m => m.status === 'completed')
      const progress = Math.round((completedMilestones.length / milestones.length) * 100)

      // Determine status based on progress
      let status: Resolution['status'] = 'in_progress'
      if (progress === 0) status = 'not_started'
      else if (progress === 100) status = 'completed'

      return { resolutionId, progress, status }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Failed to calculate progress', 'PROGRESS_ERROR', 500)
    }
  }

  /**
   * Update resolution progress and status
   */
  async updateProgress(update: ProgressUpdate): Promise<void> {
    try {
      const { error } = await supabase
        .from('resolutions')
        .update({
          progress: update.progress,
          status: update.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', update.resolutionId)

      if (error) throw new AppError(error.message, error.code, 500)
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Failed to update progress', 'PROGRESS_ERROR', 500)
    }
  }

  /**
   * Get progress history for a resolution
   */
  async getProgressHistory(resolutionId: string) {
    try {
      const { data: milestones, error } = await supabase
        .from('milestones')
        .select('*')
        .eq('resolution_id', resolutionId)
        .order('completed_at', { ascending: true })

      if (error) throw new AppError(error.message, error.code, 500)

      return milestones.reduce((history: { date: string; progress: number }[], milestone) => {
        if (milestone.completed_at) {
          const completedMilestones = milestones.filter(
            m => m.completed_at && m.completed_at <= milestone.completed_at
          )
          const progress = Math.round((completedMilestones.length / milestones.length) * 100)
          
          history.push({
            date: milestone.completed_at,
            progress,
          })
        }
        return history
      }, [])
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Failed to get progress history', 'PROGRESS_ERROR', 500)
    }
  }

  /**
   * Get upcoming milestones
   */
  async getUpcomingMilestones(userId: string, limit = 5) {
    try {
      const { data: milestones, error } = await supabase
        .from('milestones')
        .select(`
          *,
          resolutions!inner (
            title,
            user_id
          )
        `)
        .eq('resolutions.user_id', userId)
        .gte('target_date', new Date().toISOString().split('T')[0])
        .neq('status', 'completed')
        .order('target_date', { ascending: true })
        .limit(limit)

      if (error) throw new AppError(error.message, error.code, 500)

      return milestones
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Failed to get upcoming milestones', 'PROGRESS_ERROR', 500)
    }
  }
}

export const progressService = new ProgressService()
