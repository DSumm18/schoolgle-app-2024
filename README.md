# Schoolgle App

A comprehensive school management system built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Modern UI with Tailwind CSS
- API routes for backend functionality
- Database integration with Supabase
- Authentication ready with next-auth

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file based on `.env.local.example`
4. Run the development server: `npm run dev`

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```
# Database (Supabase)
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.example.supabase.co:5432/postgres

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# API URL
API_URL=http://localhost:3000/api
```

## Deployment

This app is configured for easy deployment on Vercel.

1. Connect your GitHub repository to Vercel
2. Configure the environment variables
3. Deploy!