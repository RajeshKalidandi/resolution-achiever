import { supabase } from './supabase'
import { AppError } from './errors'
import type { Resolution, Milestone, ResolutionShare, SharePermission } from '@/types/database.types'

type CreateResolutionInput = Omit<Resolution, 'id' | 'created_at' | 'user_id' | 'milestones'>
type UpdateResolutionInput = Partial<Omit<Resolution, 'id' | 'created_at' | 'user_id' | 'milestones'>>
type CreateMilestoneInput = Omit<Milestone, 'id' | 'created_at' | 'completed' | 'completed_at'>

export const resolutionService = {
  async createResolution(data: CreateResolutionInput): Promise<Resolution> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw new AppError(userError.message, 'AUTH_ERROR', 401)
    if (!user) throw new AppError('User not found', 'AUTH_ERROR', 404)

    const { data: resolution, error } = await supabase
      .from('resolutions')
      .insert([{ ...data, user_id: user.id }])
      .select('*')
      .single()

    if (error) throw new AppError(error.message, error.code, 500)
    return resolution
  },

  async updateResolution(id: string, data: UpdateResolutionInput): Promise<Resolution> {
    const { data: resolution, error } = await supabase
      .from('resolutions')
      .update(data)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return resolution
  },

  async deleteResolution(id: string): Promise<void> {
    const { error } = await supabase
      .from('resolutions')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async getResolution(id: string): Promise<Resolution & { milestones: Milestone[] }> {
    const { data: resolution, error } = await supabase
      .from('resolutions')
      .select(`
        *,
        milestones (*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return resolution
  },

  async getUserResolutions(): Promise<Resolution[]> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw new AppError(userError.message, 'AUTH_ERROR', 401)
    if (!user) throw new AppError('User not found', 'AUTH_ERROR', 404)

    const { data: resolutions, error } = await supabase
      .from('resolutions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return resolutions
  },

  async addMilestone(data: CreateMilestoneInput): Promise<Milestone> {
    const { data: milestone, error } = await supabase
      .from('milestones')
      .insert([data])
      .select('*')
      .single()

    if (error) throw error
    return milestone
  },

  async updateMilestone(id: string, data: Partial<Milestone>): Promise<Milestone> {
    const { data: milestone, error } = await supabase
      .from('milestones')
      .update(data)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return milestone
  },

  async deleteMilestone(id: string): Promise<void> {
    const { error } = await supabase
      .from('milestones')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async toggleMilestoneCompletion(id: string, completed: boolean): Promise<Milestone> {
    const now = new Date().toISOString()
    const { data: milestone, error } = await supabase
      .from('milestones')
      .update({
        status: completed ? 'completed' : 'in_progress',
        completed_at: completed ? now : null,
        updated_at: now,
      })
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return milestone
  },

  async getSharedResolutions(): Promise<Resolution[]> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw new AppError(userError.message, 'AUTH_ERROR', 401)
    if (!user) throw new AppError('User not found', 'AUTH_ERROR', 404)

    const { data: resolutions, error } = await supabase
      .from('resolutions')
      .select(`
        *,
        resolution_shares!inner (
          shared_with_email,
          permission
        )
      `)
      .eq('resolution_shares.shared_with_email', user.email)

    if (error) throw error
    return resolutions
  },

  async shareResolution(resolutionId: string, email: string, permission: SharePermission = 'view'): Promise<void> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw new AppError(userError.message, 'AUTH_ERROR', 401)
    if (!user) throw new AppError('User not found', 'AUTH_ERROR', 404)

    // Check if resolution exists and belongs to user
    const { data: resolution, error: resolutionError } = await supabase
      .from('resolutions')
      .select('user_id')
      .eq('id', resolutionId)
      .single()

    if (resolutionError) throw new AppError(resolutionError.message, resolutionError.code, 500)
    if (!resolution) throw new AppError('Resolution not found', 'NOT_FOUND', 404)
    if (resolution.user_id !== user.id) throw new AppError('Not authorized', 'UNAUTHORIZED', 403)

    // Create share record
    const { error: shareError } = await supabase
      .from('resolution_shares')
      .insert({
        resolution_id: resolutionId,
        shared_with_email: email,
        shared_by: user.id,
        permission,
      })

    if (shareError) {
      if (shareError.code === '23505') {
        throw new AppError('Resolution already shared with this user', 'ALREADY_SHARED', 400)
      }
      throw new AppError(shareError.message, shareError.code, 500)
    }
  },

  async removeShare(resolutionId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('resolution_shares')
      .delete()
      .eq('resolution_id', resolutionId)
      .eq('shared_with_id', userId)

    if (error) throw error
  },

  async getSharedUsers(resolutionId: string): Promise<{ id: string; email: string; permission: SharePermission }[]> {
    const { data: shares, error } = await supabase
      .from('resolution_shares')
      .select(`
        shared_with_id,
        shared_with_email,
        permission
      `)
      .eq('resolution_id', resolutionId)

    if (error) throw error
    return shares.map(share => ({
      id: share.shared_with_id,
      email: share.shared_with_email,
      permission: share.permission,
    }))
  },
}
