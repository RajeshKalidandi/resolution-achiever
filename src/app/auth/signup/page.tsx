import AuthForm from '@/components/auth/auth-form'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Start your journey towards achieving your goals
          </p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
