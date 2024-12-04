# Resolution Achiever

A modern web application to help users set, track, and achieve their New Year's resolutions and personal goals for 2025 and beyond.

## Features

- 🎯 Set and track personal goals and resolutions
- 📊 Visual progress tracking with beautiful charts
- 🎨 Modern, responsive UI with dark/light mode
- 🔐 Secure authentication with Supabase
- 💪 Motivational features and reminders
- 📱 Mobile-friendly design
- 🌙 Dark mode support with theme toggle
- ✨ Engaging animations and transitions
- 🎉 Interactive landing page with modern design
- 👤 User profile management with secure logout

## Tech Stack

- Next.js 13+ with App Router
- TypeScript for type safety
- Supabase for authentication and database
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI for accessible components
- Chart.js for data visualization
- React Hot Toast for notifications
- Lucide Icons for beautiful iconography

## Key Components

### Landing Page
- Modern hero section with engaging animations
- Feature highlights with scroll animations
- Statistics section showcasing platform success
- Call-to-action sections for user engagement

### Dashboard
- Personal resolution tracking
- Progress visualization
- User settings and profile management
- Dark/Light theme toggle
- Secure authentication flow

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Update your Supabase credentials in `.env.local`
5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
│   ├── ui/             # UI components (buttons, inputs, etc.)
│   └── dashboard/      # Dashboard-specific components
├── lib/                # Utility functions and services
│   ├── auth-service.ts # Authentication service
│   └── supabase.ts    # Supabase client configuration
└── styles/            # Global styles and Tailwind CSS
```

## Contributing

Feel free to submit issues and enhancement requests! We welcome contributions to make Resolution Achiever even better.

## License

MIT License
