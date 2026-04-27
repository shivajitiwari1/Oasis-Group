import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
export async function GET() {
  const token = cookies().get('admin_token')
  if (!token?.value) return NextResponse.json({ authenticated: false }, { status: 401 })
  return NextResponse.json({ authenticated: true })
}
