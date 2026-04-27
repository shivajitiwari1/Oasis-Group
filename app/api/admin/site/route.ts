import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { cookies } from 'next/headers'

const FILE = path.join(process.cwd(), 'data', 'site.json')
function auth() { return !!cookies().get('admin_token')?.value }
function read() { return JSON.parse(readFileSync(FILE, 'utf-8')) }
function write(d: unknown) { writeFileSync(FILE, JSON.stringify(d, null, 2), 'utf-8') }

export async function GET(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const section = req.nextUrl.searchParams.get('section')
  const site = read()
  return NextResponse.json(section ? site[section] ?? null : site)
}

export async function PUT(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const section = req.nextUrl.searchParams.get('section')
  const body = await req.json()
  const site = read()
  if (section) site[section] = body; else Object.assign(site, body)
  write(site)
  return NextResponse.json({ success: true })
}
