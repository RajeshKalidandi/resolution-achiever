'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { AppError } from '@/lib/errors'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  notification_preferences: {
    email: boolean
    push: boolean
  }
  theme_preference: 'light' | 'dark' | 'system'
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new AppError('User not found', 'AUTH_ERROR', 404)

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw new AppError(error.message, error.code, 500)
      
      setProfile({
        id: user.id,
        email: user.email!,
        full_name: profile?.full_name || null,
        avatar_url: profile?.avatar_url || null,
        notification_preferences: profile?.notification_preferences || { email: true, push: false },
        theme_preference: profile?.theme_preference || 'system'
      })
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to load profile')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile!.id,
          full_name: profile!.full_name,
          avatar_url: profile!.avatar_url,
          notification_preferences: profile!.notification_preferences,
          theme_preference: profile!.theme_preference,
          updated_at: new Date().toISOString()
        })

      if (error) throw new AppError(error.message, error.code, 500)
      toast.success('Profile updated successfully!')
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to update profile')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900">
        <div className="text-lg text-white">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-white">Profile Settings</h1>
        
        <form onSubmit={handleSave}>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={profile?.email || ''}
                  disabled
                  className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="full_name" className="block text-sm font-medium text-zinc-200">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  value={profile?.full_name || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev!, full_name: e.target.value }))}
                  className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-zinc-200">Notification Preferences</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile?.notification_preferences.email}
                      onChange={(e) => setProfile(prev => ({
                        ...prev!,
                        notification_preferences: {
                          ...prev!.notification_preferences,
                          email: e.target.checked
                        }
                      }))}
                      className="rounded border-zinc-700 bg-zinc-800"
                    />
                    <span className="text-sm text-zinc-200">Email Notifications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile?.notification_preferences.push}
                      onChange={(e) => setProfile(prev => ({
                        ...prev!,
                        notification_preferences: {
                          ...prev!.notification_preferences,
                          push: e.target.checked
                        }
                      }))}
                      className="rounded border-zinc-700 bg-zinc-800"
                    />
                    <span className="text-sm text-zinc-200">Push Notifications</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="theme" className="block text-sm font-medium text-zinc-200">
                  Theme Preference
                </label>
                <select
                  id="theme"
                  value={profile?.theme_preference}
                  onChange={(e) => setProfile(prev => ({
                    ...prev!,
                    theme_preference: e.target.value as UserProfile['theme_preference']
                  }))}
                  className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
