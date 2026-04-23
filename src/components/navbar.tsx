'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, Shield, Home, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  onAdminLogin: () => void
  isAdmin: boolean
  onAdminPanel: () => void
  onLogout: () => void
}

export default function Navbar({ onAdminLogin, isAdmin, onAdminPanel, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-amber-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Vaibhav Mobiles
              </span>
              <span className="text-[10px] sm:text-xs text-amber-400/80 -mt-1 tracking-wider uppercase">
                Rajula
              </span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('home')}
              className="text-gray-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('phones')}
              className="text-gray-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
            >
              <Phone className="w-4 h-4 mr-2" />
              Phones
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact
            </Button>
            {isAdmin ? (
              <>
                <Button
                  variant="ghost"
                  onClick={onAdminPanel}
                  className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="ml-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onAdminLogin}
                className="ml-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-amber-500/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-amber-500/10"
          >
            <div className="px-4 py-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                onClick={() => scrollToSection('home')}
              >
                <Home className="w-4 h-4 mr-3" />
                Home
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                onClick={() => scrollToSection('phones')}
              >
                <Phone className="w-4 h-4 mr-3" />
                Phones
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                onClick={() => scrollToSection('contact')}
              >
                <MessageCircle className="w-4 h-4 mr-3" />
                Contact
              </Button>
              <div className="border-t border-amber-500/10 pt-2">
                {isAdmin ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-amber-400 hover:bg-amber-500/10"
                      onClick={() => { onAdminPanel(); setIsMobileMenuOpen(false) }}
                    >
                      <Shield className="w-4 h-4 mr-3" />
                      Admin Panel
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-400 hover:bg-red-500/10"
                      onClick={() => { onLogout(); setIsMobileMenuOpen(false) }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-amber-400 hover:bg-amber-500/10"
                    onClick={() => { onAdminLogin(); setIsMobileMenuOpen(false) }}
                  >
                    <Shield className="w-4 h-4 mr-3" />
                    Admin Login
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
