import { supabase } from './supabase'
import { AppError } from './errors'

class AuthService {
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new AppError('Failed to sign out', 'AUTH_ERROR')
    }
  }

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      throw new AppError('Failed to get user', 'AUTH_ERROR')
    }
    return user
  }
}

export const authService = new AuthService()
