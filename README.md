# Schoolgle Intranet Platform

A modern, modular intranet platform for educational institutions, built with Next.js 14, React, and Tailwind CSS.

## Features

- 🏢 **Estate Management Modules**
  - Activity Management
  - Risk Assessment
  - School Issue Tracker
  - Schoolgle Incidents
- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark/Light mode support
  - Accessible components
- 🔒 **Security**
  - Role-based access control
  - Secure authentication
- 📱 **Mobile-First**
  - Optimized for all devices
  - Touch-friendly interfaces

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/DSumm18/schoolgle-app-2024.git
cd schoolgle-app-2024
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create a \`.env.local\` file in the root directory and add your environment variables:
\`\`\`env
NEXT_PUBLIC_API_URL=your_api_url
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

## Deployment

The application is configured for deployment on Vercel. To deploy:

1. Push your changes to the main branch:
\`\`\`bash
git add .
git commit -m "Your commit message"
git push origin main
\`\`\`

2. The application will automatically deploy to Vercel.

### Manual Deployment

If you prefer to deploy manually:

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

## Dependencies

- Next.js 14
- React 18
- Tailwind CSS
- Radix UI
- Framer Motion
- clsx
- tailwind-merge

## Project Structure

\`\`\`
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   ├── modules/           # Module pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utilities and helpers
└── styles/              # Global styles
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.