import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'data', 'enquiries.json')

function read() { try { return JSON.parse(readFileSync(FILE, 'utf-8')) } catch { return [] } }
function write(d: unknown[]) { writeFileSync(FILE, JSON.stringify(d, null, 2), 'utf-8') }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.firstName || !body.phone) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    const data = read()
    data.push({ id: Date.now().toString(), ...body, createdAt: new Date().toISOString(), status: 'new' })
    write(data)
    return NextResponse.json({ success: true }, { status: 201 })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}

export async function GET() {
  return NextResponse.json(read())
}
