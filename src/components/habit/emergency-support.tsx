'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { AppError } from '@/lib/errors'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import type { EmergencyContact } from '@/types/database.types'

interface EmergencySupportProps {
  userId: string
}

export function EmergencySupport({ userId }: EmergencySupportProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const loadContacts = useCallback(async () => {
    try {
      const { data: contacts, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at')

      if (error) throw new AppError(error.message, error.code, 500)
      setContacts(contacts || [])
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to load emergency contacts')
      }
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  const handleAddContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .insert({
          user_id: userId,
          name: formData.get('name'),
          relationship: formData.get('relationship'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          is_notified_on_relapse: formData.get('notify') === 'on',
        })

      if (error) throw new AppError(error.message, error.code, 500)

      form.reset()
      setShowForm(false)
      toast.success('Emergency contact added successfully')
      await loadContacts()
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to add emergency contact')
      }
    }
  }

  const handleDeleteContact = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', contactId)

      if (error) throw new AppError(error.message, error.code, 500)

      toast.success('Contact removed')
      await loadContacts()
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('Failed to remove contact')
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="mb-4 space-y-2">
            <p className="text-zinc-400">
              Having support is crucial for recovery. Add trusted contacts who can help you in difficult moments.
            </p>
            <p className="text-sm text-zinc-500">
              💡 Tip: Choose people who understand and support your journey
            </p>
          </div>

          {contacts.length > 0 && (
            <div className="mb-6 space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 p-3"
                >
                  <div>
                    <p className="font-medium text-white">{contact.name}</p>
                    <p className="text-sm text-zinc-400">{contact.relationship}</p>
                    <div className="mt-1 space-x-4 text-sm text-zinc-500">
                      <span>📞 {contact.phone}</span>
                      {contact.email && <span>✉️ {contact.email}</span>}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteContact(contact.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              className="w-full"
            >
              Add Emergency Contact
            </Button>
          ) : (
            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-zinc-400">
                  Relationship
                </label>
                <input
                  type="text"
                  id="relationship"
                  name="relationship"
                  required
                  className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-400">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notify"
                  name="notify"
                  className="rounded border-zinc-700 bg-zinc-800"
                />
                <label htmlFor="notify" className="text-sm text-zinc-400">
                  Notify this contact if I relapse
                </label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="flex-1">
                  Add Contact
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="rounded-lg bg-blue-500/10 p-4">
          <h3 className="mb-2 font-medium text-blue-400">Need immediate help?</h3>
          <div className="space-y-2 text-sm text-zinc-400">
            <p>🌟 Remember: Every moment of resistance makes you stronger</p>
            <p>
              📞 24/7 Support Hotline: <a href="tel:1-800-662-4357" className="text-blue-400">1-800-662-4357</a>
            </p>
            <p>
              💬 Crisis Text Line: Text HOME to <span className="text-blue-400">741741</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
