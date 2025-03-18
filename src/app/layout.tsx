import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ModuleProvider } from '@/contexts/ModuleContext'
import { SchoolProvider } from '@/contexts/SchoolContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Schoolgle Intranet Platform',
  description: 'A comprehensive school management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModuleProvider>
          <SchoolProvider>
            {children}
          </SchoolProvider>
        </ModuleProvider>
      </body>
    </html>
  )
}