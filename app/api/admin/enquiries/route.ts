import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

const FILE = path.join(process.cwd(), 'data', 'enquiries.json')
function auth() { return !!cookies().get('admin_token')?.value }
function read() { try { return JSON.parse(readFileSync(FILE, 'utf-8')) } catch { return [] } }
function write(d: unknown[]) { writeFileSync(FILE, JSON.stringify(d, null, 2), 'utf-8') }

export async function GET() {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(read().reverse())
}

export async function PATCH(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, status } = await req.json()
  const data = read()
  const idx = data.findIndex((e: { id: string }) => e.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  data[idx].status = status
  write(data)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  write(read().filter((e: { id: string }) => e.id !== id))
  return NextResponse.json({ success: true })
}
