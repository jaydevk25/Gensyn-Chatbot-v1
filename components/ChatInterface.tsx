'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m the Gensyn AI assistant. I can answer questions about Gensyn\'s decentralized machine learning network, our testnet, RL Swarm, and general AI/ML topics. How can I help you today?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          conversationHistory: messages.slice(-6),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 pb-24">
      {/* Chat container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gensyn-gray/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gensyn-purple/20 overflow-hidden"
      >
        {/* Messages area */}
        <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`message-bubble max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-gensyn-purple to-gensyn-blue text-white'
                      : 'bg-gensyn-gray/80 text-gray-100 border border-gensyn-cyan/20'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gensyn-gray/80 p-4 rounded-2xl border border-gensyn-cyan/20">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gensyn-cyan rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-gensyn-cyan rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-gensyn-cyan rounded-full typing-dot"></div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="border-t border-gensyn-purple/20 p-4 bg-gensyn-dark/50">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Gensyn..."
              disabled={isLoading}
              className="flex-1 bg-gensyn-gray/50 text-white placeholder-gray-400 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-gensyn-purple transition-all duration-300 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-gensyn-purple to-gensyn-blue text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Send
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
