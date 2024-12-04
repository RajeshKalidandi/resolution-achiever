'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { AppError } from '@/lib/errors'

interface ShareDialogProps {
  resolutionId: string
  isOpen: boolean
  onClose: () => void
}

export function ShareDialog({ resolutionId, isOpen, onClose }: ShareDialogProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Check if user exists
      const { data: users, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (userError) {
        throw new AppError('User not found', 'USER_NOT_FOUND', 404)
      }

      // Create share record
      const { error: shareError } = await supabase
        .from('resolution_shares')
        .insert({
          resolution_id: resolutionId,
          shared_with_id: users.id,
          permission: 'view',
        })

      if (shareError) {
        if (shareError.code === '23505') {
          throw new AppError('Resolution already shared with this user', 'ALREADY_SHARED', 400)
        }
        throw shareError
      }

      toast.success('Resolution shared successfully')
      setEmail('')
      onClose()
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to share resolution')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>Share Resolution</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Share your resolution with other users to get support and accountability.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleShare}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-zinc-700"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sharing...' : 'Share'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
