import { NextRequest, NextResponse } from 'next/server'
import { generateResponse } from '@/lib/chatbot'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }

    const response = await generateResponse(message, conversationHistory || [])

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
