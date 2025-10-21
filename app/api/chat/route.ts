import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    
    const GROQ_API_KEY = process.env.GROQ_API_KEY
    
    if (!GROQ_API_KEY) {
      throw new Error('Missing API key')
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            // ✅ Add concise instructions here
            content: `You are the Gensyn AI assistant. Answer questions about Gensyn's decentralized machine learning network, AI/ML concepts, and related topics.

CRITICAL RULES:
- Keep responses SHORT (3-4 sentences maximum)
- Be direct and factual
- No lengthy explanations or examples
- Answer the question and stop
- Use simple, clear language`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,        // ✅ Lower for more focused responses
        max_tokens: 150,         // ✅ CHANGED from 1024 - limits response length
        top_p: 0.9,
        presence_penalty: 0.3,   // ✅ Reduces repetition
        frequency_penalty: 0.5,  // ✅ Encourages conciseness
      }),
    })

    const data = await response.json()
    
    return NextResponse.json({ 
      response: data.choices[0]?.message?.content 
    })
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
