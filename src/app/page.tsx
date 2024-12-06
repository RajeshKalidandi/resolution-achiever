'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const features = [
  {
    title: 'AI-Powered Insights',
    description: 'Advanced AI analytics to help you stay on track and optimize your goals.',
    icon: '🤖'
  },
  {
    title: 'Smart Habit Tracking',
    description: 'Build lasting habits with our intelligent tracking system and streak monitoring.',
    icon: '📈'
  },
  {
    title: 'Community Support',
    description: 'Connect with like-minded individuals and share your journey to success.',
    icon: '🤝'
  },
  {
    title: 'Recovery Dashboard',
    description: 'Track your recovery journey with comprehensive analytics and support systems.',
    icon: '🎯'
  }
]

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 pt-20 sm:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-7xl">
            Resolution <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Achiever</span>
            <span className="ml-2 rounded-full bg-blue-500/10 px-4 py-2 text-lg font-medium text-blue-400">2025</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg text-zinc-300"
          >
            Transform your goals into achievements with our next-generation resolution tracking platform. 
            Powered by AI, driven by your ambition.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/auth/signup">
              <Button size="lg" className="group relative w-full overflow-hidden rounded-lg bg-blue-500 px-8 py-3 transition-all hover:bg-blue-600 sm:w-auto">
                <span className="relative z-10">Get Started for 2025</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-zinc-700 bg-transparent text-zinc-300 transition-colors hover:bg-zinc-800 sm:w-auto"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="mt-32 grid w-full max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeIn}
              className="group relative rounded-2xl bg-zinc-800/50 p-6 backdrop-blur-sm transition-all hover:bg-zinc-800/70"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-32 grid w-full max-w-4xl grid-cols-2 gap-8 px-4 sm:grid-cols-4"
        >
          {[
            { label: 'Active Users', value: '10K+' },
            { label: 'Goals Achieved', value: '50K+' },
            { label: 'Success Rate', value: '89%' },
            { label: 'Daily Check-ins', value: '25K+' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-32 w-full max-w-4xl rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 text-center backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-white">Ready for 2025?</h2>
          <p className="mt-4 text-zinc-300">
            Start your journey today and make 2025 your year of achievement.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="mt-6 bg-white text-zinc-900 hover:bg-zinc-100">
              Begin Your Journey
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-32 w-full border-t border-zinc-800 py-8 text-center text-sm text-zinc-400">
        <p>Built with ❤️ for a better future</p>
        <p className="mt-2"> 2025 Resolution Achiever. All rights reserved.</p>
      </footer>
    </div>
  )
}
