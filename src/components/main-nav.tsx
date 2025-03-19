'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: "HomeIcon"
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "UsersIcon"
  },
  {
    title: "Applications",
    href: "/admin/applications",
    icon: "AppsIcon"
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "SettingsIcon"
  }
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      <Link
        href="/"
        className="hidden items-center space-x-2 lg:flex"
      >
        <span className="hidden font-bold lg:inline-block">
          Schoolgle Admin
        </span>
      </Link>
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}