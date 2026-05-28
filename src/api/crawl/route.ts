import { NextRequest } from 'next/server'
import sql from '../../db/db'

export async function GET(request: NextRequest) {
    const batchSizeInt = Number(request.nextUrl.searchParams.get('batch-size')) || 1
  return new Response(JSON.stringify(history))
}