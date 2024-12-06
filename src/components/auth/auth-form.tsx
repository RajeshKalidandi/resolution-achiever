'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AppError } from '@/lib/errors'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'

interface AuthFormProps {
  mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw new AppError(error.message, error.code, 400)
        toast.success('Check your email to confirm your account!')
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw new AppError(error.message, error.code, 400)
        if (data.session) {
          toast.success('Welcome back!')
          router.push('/dashboard')
          router.refresh()
        }
      }
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Welcome back' : 'Create account'}</CardTitle>
        <CardDescription>
          {mode === 'login'
            ? 'Enter your email to sign in to your account'
            : 'Enter your email to create your account'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-200">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-zinc-200">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
          <p className="text-center text-sm text-zinc-400">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-500 hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
