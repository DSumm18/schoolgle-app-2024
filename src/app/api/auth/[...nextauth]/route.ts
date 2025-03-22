// Stub implementation for Next.js API route for authentication
// This won't be used in the static export, but helps with build resolution

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'success', message: 'Auth API stub' })
}

export async function POST() {
  return NextResponse.json({ status: 'success', message: 'Auth API stub' })
}