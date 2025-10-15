'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Header() {
  const menuItems = [
    { name: 'Gensyn', url: 'https://www.gensyn.ai' },
    { name: 'Blog', url: 'https://blog.gensyn.ai' },
    { name: 'Docs', url: 'https://docs.gensyn.ai' },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20 border-b border-gensyn-purple/20 bg-gensyn-dark/50 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7 }}
              className="relative w-10 h-10"
            >
              <Image
                src="https://cdn.prod.website-files.com/66bc6da8fe284e4693088ff7/66bc6da8fe284e4693088ffe_Gensyn-Symbol.svg"
                alt="Gensyn Logo"
                fill
                className="object-contain"
              />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gensyn-purple via-gensyn-blue to-gensyn-cyan bg-clip-text text-transparent">
              Gensyn AI ChatBot
            </h1>
          </div>

          {/* Menu Items */}
          <nav className="flex space-x-6">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-gensyn-cyan transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
