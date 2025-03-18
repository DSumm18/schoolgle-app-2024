# Schoolgle Intranet Platform

A modern, modular intranet platform for educational institutions, built with Next.js 14, React, and Tailwind CSS.

## Deployment Status

**Ready for deployment!** This version includes:

- ✅ Simplified UI implementation using standard Tailwind classes
- ✅ All Estate modules implemented (Activity Management, Risk Assessment, Issue Tracker, Incidents)
- ✅ Navigation between modules
- ✅ Admin interface for module management
- ✅ Responsive layouts

## Installation

```bash
# Clone the repository
git clone https://github.com/DSumm18/schoolgle-app-2024.git
cd schoolgle-app-2024

# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment Guide

1. **Prerequisites**:
   - Node.js 18.17 or later
   - Vercel account connected to GitHub

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI (if not already installed)
   npm install -g vercel
   
   # Deploy
   vercel
   ```

## Project Structure

```
schoolgle-app-2024/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── admin/             # Admin pages
│   │   │   └── modules/       # Module administration
│   │   ├── modules/           # Module pages
│   │   │   └── estates/       # Estate modules
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── estate-nav.tsx     # Estate module navigation
│   │   ├── header.tsx         # Application header
│   │   └── ui/                # UI components (simplified for now)
│   └── lib/                   # Utilities
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── jsconfig.json              # JavaScript path mapping
└── package.json               # Dependencies and scripts
```

## Estate Modules

The platform currently includes the following Estate Management modules:

- **Activity Management**: Schedule and manage activities across your institution
- **Risk Assessment**: Create and track risk assessments for safety compliance
- **School Issue Tracker**: Track and manage maintenance issues throughout the school
- **Schoolgle Incidents**: Report and manage incidents that occur on school grounds

## Future Enhancements

After successful deployment, we plan to:

1. Introduce shadcn/ui components for enhanced UI
2. Add user authentication and role-based access control
3. Implement additional module categories (Finance, Teaching & Learning)
4. Add data persistence with a database backend
5. Implement real-time notifications and updates

## Features

- 🏢 **Estate Management Modules**
- 🎨 **Modern UI/UX**
- 🔒 **Security** (coming soon)
- 📱 **Mobile-First Design**