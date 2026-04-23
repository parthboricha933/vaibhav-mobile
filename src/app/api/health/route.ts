import { checkDatabaseHealth } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const health = await checkDatabaseHealth()
  
  return NextResponse.json({
    status: health.connected ? 'ok' : 'error',
    timestamp: new Date().toISOString(),
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV,
    },
    database: health.connected 
      ? { connected: true, phoneCount: health.phoneCount, adminCount: health.adminCount }
      : { connected: false, error: health.error },
  }, { status: health.connected ? 200 : 503 })
}
