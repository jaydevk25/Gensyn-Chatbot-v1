import { scrapeWebsiteContent } from './webscraper'

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Gensyn knowledge base
const GENSYN_KNOWLEDGE = `
Gensyn is a decentralized network for machine learning that connects devices worldwide into an open, permissionless network for AI training. Key facts:

- Founded in 2020, UK-based project combining AI and blockchain
- Layer-1 protocol connecting GPUs, consumer devices, and datacenter hardware
- Public Testnet launched March 2025
- Flagship application: RL Swarm (collaborative reinforcement learning)
- Native token: $GENS for compute contributions and node running
- Key technologies: Verde (verification protocol), GenRL framework, BlockAssist (Minecraft AI)
- Core mission: Democratize AI training access, making it affordable and efficient
- 450,000+ daily transactions with 98.9% operational cost reduction
- Two models trained in RL Swarm reached top 6 on Hugging Face
- Research focus: NoLoCo (no all-reduce training), CheckFree (recovery without checkpointing)
- Smart wallet infrastructure for seamless user onboarding without crypto complexity
`

interface Message {
  role: string
  content: string
}

export async function generateResponse(
  userMessage: string,
  conversationHistory: Message[]
): Promise<string> {
  try {
    // Check if question is about Gensyn websites
    const isGensynQuery = userMessage.toLowerCase().includes('gensyn') ||
                         userMessage.toLowerCase().includes('testnet') ||
                         userMessage.toLowerCase().includes('rl swarm') ||
                         userMessage.toLowerCase().includes('verde')

    let contextData = GENSYN_KNOWLEDGE

    // Scrape relevant website if needed
    if (isGensynQuery) {
      try {
        const scrapedContent = await scrapeWebsiteContent(userMessage)
        if (scrapedContent) {
          contextData += `\n\nLatest information from Gensyn websites:\n${scrapedContent}`
        }
      } catch (error) {
        console.error('Scraping error:', error)
      }
    }

    // Build conversation with varied responses
    const messages = [
      {
        role: 'system',
        content: `You are the Gensyn AI assistant, an expert on decentralized machine learning, AI/ML concepts, and the Gensyn network. 

Context about Gensyn:
${contextData}

Guidelines:
- Provide accurate, detailed answers about Gensyn's technology, testnet, and ecosystem
- For general AI/ML questions, explain concepts clearly with practical examples
- Vary your responses - use different phrasings, examples, and perspectives even for similar questions
- Be conversational and engaging, not repetitive
- Include relevant technical details when appropriate
- If you don't know something, be honest
- Keep responses concise but informative (2-4 paragraphs)`,
      },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: userMessage,
      },
    ]

    // Call Groq API with Llama model
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Fast, high-quality free model
        messages: messages,
        temperature: 0.8, // Higher temperature for varied responses
        max_tokens: 1024,
        top_p: 0.9,
        frequency_penalty: 0.5, // Reduce repetition
        presence_penalty: 0.3,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Groq API error')
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'

  } catch (error: any) {
    console.error('Generation error:', error)
    throw new Error(error.message || 'Failed to generate response')
  }
}
