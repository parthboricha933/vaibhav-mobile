'use client'

import { Phone, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-500/20">
              <img
                src="/logo.jpg"
                alt="Vaibhav Mobiles Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Vaibhav Mobiles</span>
              <span className="text-xs text-gray-500 ml-1">Rajula</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a
              href="#home"
              className="hover:text-amber-400 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Home
            </a>
            <a
              href="#phones"
              className="hover:text-amber-400 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('phones')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Phones
            </a>
            <a
              href="#contact"
              className="hover:text-amber-400 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Vaibhav Mobiles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
