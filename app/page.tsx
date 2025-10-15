'use client'

import Header from '@/components/Header'
import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gensyn-dark via-gensyn-gray to-gensyn-dark">
      {/* Animated background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gensyn-purple/20 rounded-full blur-3xl animate-float" 
             style={{ top: '10%', left: '10%' }} />
        <div className="absolute w-96 h-96 bg-gensyn-cyan/20 rounded-full blur-3xl animate-float" 
             style={{ top: '60%', right: '10%', animationDelay: '2s' }} />
        <div className="absolute w-96 h-96 bg-gensyn-blue/20 rounded-full blur-3xl animate-float" 
             style={{ bottom: '10%', left: '50%', animationDelay: '4s' }} />
      </div>

      <Header />
      <ChatInterface />

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-4 text-center text-sm text-gray-400 bg-gradient-to-t from-gensyn-dark/90 to-transparent backdrop-blur-sm z-10">
        <p>
          made with ♥️ by{' '}
          <a 
            href="https://x.com/kaizoku" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gensyn-cyan hover:text-gensyn-blue transition-colors duration-300"
          >
            kaizoku
          </a>
        </p>
      </footer>
    </main>
  )
}
