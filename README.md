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

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **State Management**: React Context API
- **Styling**: TailwindCSS with custom theme
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI primitives with custom styling

## Project Structure

- `/src/app`: Page components and routing
- `/src/components`: Reusable UI components
- `/src/contexts`: React context providers
- `/src/lib`: Utility functions and libraries
- `/src/utils`: Helper functions and services
- `/public`: Static assets and images

## Recent Updates (March 17, 2025)

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