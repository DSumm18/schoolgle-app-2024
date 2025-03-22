'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Interface for mock session
interface MockUser {
  id: string
  name?: string
  email?: string
  role?: string
  image?: string
}

interface MockSession {
  user?: MockUser
  expires: string
}

export function UserNav() {
  const router = useRouter()
  // Use next-auth useSession to satisfy build, but also prepare fallback
  const { data: authSession } = useSession()
  const [mockSession, setMockSession] = useState<MockSession | null>(null)

  // For static export, get session from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedSession = localStorage.getItem('mockSession')
        if (storedSession) {
          setMockSession(JSON.parse(storedSession))
        }
      } catch (error) {
        console.error('Failed to parse session from localStorage', error)
      }
    }
  }, [])

  // Use either the real auth session or our mock session
  const session = authSession || mockSession

  // Handle sign out for static export
  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockSession')
    }
    router.push('/auth/signin')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
            <AvatarFallback>{session?.user?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}