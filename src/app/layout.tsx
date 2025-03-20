import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { SideNav } from '@/components/side-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Schoolgle Admin',
  description: 'Comprehensive school management system',
}

const sideNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Activities",
    href: "/activities",
  },
  {
    title: "Incidents",
    href: "/incidents",
  },
  {
    title: "Estate",
    href: "/estate",
  },
  {
    title: "Settings",
    href: "/settings",
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800">
              <div className="container flex h-16 items-center px-4">
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                  <UserNav />
                </div>
              </div>
            </header>
            <div className="flex">
              <SideNav items={sideNavItems} className="w-64 p-4" />
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}