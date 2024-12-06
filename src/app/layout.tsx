import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Providers } from './providers'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Resolution Achiever - Reach Your Goals',
  description: 'Track and achieve your New Year resolutions and personal goals with our modern goal-tracking platform.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  try {
    await supabase.auth.getSession()
  } catch (error) {
    console.error('Failed to get auth session:', error)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange
          >
            <Toaster position="bottom-right" />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
