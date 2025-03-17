# Schoolgle Intranet Platform

A comprehensive intranet platform for schools and educational institutions, designed to provide a centralized hub for communication, resources, and school management tools.

## Features

- **Customizable Dashboard**: Personalized landing page with widgets for news, events, and weather.
- **Modular Design**: Access different functional areas through color-coded modules.
- **School-Specific Chatbot**: AI assistant trained on your school's knowledge base.
- **Multilingual Support**: Switch between languages easily.
- **Animated UI**: Beautiful animations and transitions for an engaging user experience.
- **Dark Mode**: Comfortable viewing in various lighting conditions.
- **Responsive Design**: Works on desktops, tablets, and mobile devices.
- **Social Media Integration**: Displays the school's Twitter and Facebook feeds.
- **Authentication System**: Secure user authentication with Supabase and NextAuth.js.

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- A Supabase account for database functionality

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/DSumm18/schoolgle-app-2024.git
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env.local
   ```
   Then update the values in `.env.local` with your own credentials.

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Setting Up Supabase Authentication

1. **Create a Supabase Project**:
   - Go to [Supabase Dashboard](https://app.supabase.io/)
   - Click "New Project" and follow the setup wizard
   - Choose a name, password, and region for your project

2. **Get Your API Keys**:
   - After project creation, go to Project Settings > API
   - Copy the "URL" and "anon" key to your `.env.local` file:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     ```

3. **Set Up the Database**:
   - Go to the SQL Editor in your Supabase Dashboard
   - Create the required tables by copying the contents of `schema.sql` file
   - Run the SQL to create the tables and insert initial data

4. **Configure Email Authentication**:
   - Go to Authentication > Providers > Email
   - Make sure "Enable Email Signup" is ON
   - Configure confirmation email templates under "Email Templates"

5. **Set Up NextAuth**:
   - Generate a secret for NextAuth:
     ```
     openssl rand -base64 32
     ```
   - Add it to your `.env.local` file:
     ```
     NEXTAUTH_SECRET=your_generated_secret
     NEXTAUTH_URL=http://localhost:3000
     ```
   - For production, set `NEXTAUTH_URL` to your deployment URL

6. **Test the Authentication**:
   - Start your development server
   - Visit the registration page: `/register`
   - Create a test account
   - Check your Supabase dashboard to confirm the user was created
   - Login with your credentials at `/login`
   - View authentication status in the dashboard

## Setting Up Environment Variables in Vercel

1. Go to your Vercel project
2. Click on "Settings" > "Environment Variables"
3. Add all required variables from your `.env.example` file:
   - `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET`: Your generated secret
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
4. Save and redeploy your application

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **State Management**: React Context API
- **Styling**: TailwindCSS with custom theme
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with Supabase integration
- **UI Components**: Radix UI primitives with custom styling

## Project Structure

- `/src/app`: Page components and routing
- `/src/components`: Reusable UI components
- `/src/contexts`: React context providers
- `/src/lib`: Utility functions and libraries
- `/src/utils`: Helper functions and services
- `/public`: Static assets and images

## Recent Updates (March 17, 2025)

- **NEW**: Added Supabase authentication integration with NextAuth.js
- **NEW**: Created registration and login pages with proper error handling
- **NEW**: Added AuthStatus component for testing authentication state
- **NEW**: Included test table and database schema for Supabase setup
- **MAJOR FIX**: Completely simplified Next.js configuration for Vercel compatibility
- Fixed hook naming in SchoolContext to support useSchoolContext
- Removed all experimental features and static export settings
- Properly configured for serverless deployment with API routes
- Fixed all component export/import issues
- Created simplified landing page and social media page
- Added ThemeProvider, AuthProvider, and SchoolContext
- Fixed AnimatedLogo component

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.