'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroSlides = [
  { image: '/hero-slide-1.png' },
  { image: '/hero-slide-2.png' },
  { image: '/hero-slide-3.png' },
  { image: '/hero-slide-4.png' },
]

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 800)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Manual slide navigation
  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 800)
  }, [currentSlide, isTransitioning])

  return (
    <section id="home" ref={ref} className="relative h-screen overflow-hidden">
      {/* Background with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Slideshow Background - using img tag for crisp rendering */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={`Vaibhav Mobiles - Slide ${currentSlide + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ imageRendering: 'auto' }}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays - lighter to show images more clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </motion.div>

      {/* Animated Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              background: `rgba(217, 119, 6, ${Math.random() * 0.5 + 0.2})`,
              boxShadow: `0 0 ${Math.random() * 8 + 4}px rgba(217, 119, 6, ${Math.random() * 0.3})`,
            }}
            animate={{
              y: [0, -(Math.random() * 150 + 80)],
              x: [0, (Math.random() - 0.5) * 60],
              opacity: [0, Math.random() * 0.7 + 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Your Trusted Mobile Store in Rajula
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight"
        >
          Vaibhav
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
            {' '}Mobiles
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
        >
          Best Smartphone Deals in Rajula
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm sm:text-base text-gray-400 mb-10 max-w-lg"
        >
          Explore the latest smartphones at unbeatable prices. Visit our store or inquire now!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Button
            onClick={() => {
              document.getElementById('phones')?.scrollIntoView({ behavior: 'smooth' })
            }}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105"
          >
            Explore Phones
            <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
          </Button>
        </motion.div>

        {/* Slide Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex gap-3 mt-10"
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="group relative"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`w-10 h-1.5 rounded-full transition-all duration-500 ${
                  i === currentSlide
                    ? 'bg-amber-500'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
              {i === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-amber-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isTransitioning ? 0 : 1 }}
                  transition={{ duration: 5, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  )
}
