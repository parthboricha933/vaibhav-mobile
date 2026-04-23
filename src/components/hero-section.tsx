'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles, Smartphone, Zap, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Hero slides configuration
  const slides = [
    {
      image: '/iphone17-hero.jpg',
      title: 'iPhone 17 Pro Max',
      subtitle: 'Titanium. So Strong. So Light. So Pro.',
      tag: 'Now Available',
    },
    {
      image: '/iphone17-detail.jpg',
      title: 'Camera Revolution',
      subtitle: '48MP Fusion Camera. Capture Everything.',
      tag: 'Explore Features',
    },
  ]

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  // Mark as loaded after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" ref={ref} className="relative h-screen overflow-hidden">
      {/* Background with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* Animated Background Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slides[currentSlide].image}')`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Animated Golden Glow Pulse */}
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Floating Golden Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background: `rgba(217, 119, 6, ${Math.random() * 0.5 + 0.2})`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(217, 119, 6, ${Math.random() * 0.3 + 0.1})`,
              }}
              animate={{
                y: [0, -(Math.random() * 200 + 100)],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0, Math.random() * 0.8 + 0.2, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Animated Vertical Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute w-[1px] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent"
              style={{
                left: `${20 + i * 15}%`,
                height: '100%',
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        {/* Horizontal Scanning Line Effect */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.4), transparent)',
            boxShadow: '0 0 20px rgba(217, 119, 6, 0.3), 0 0 60px rgba(217, 119, 6, 0.1)',
          }}
          animate={{
            top: ['0%', '100%'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: 2,
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            {slides[currentSlide].tag}
          </span>
        </motion.div>

        {/* Main Title with Animated Gradient */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
              {currentSlide === 0 ? (
                <>
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-block"
                  >
                    Vaibhav
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent"
                  >
                    {' '}Mobiles
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
                  >
                    iPhone 17
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block text-white"
                  >
                    {' '}Pro Max
                  </motion.span>
                </>
              )}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Animated Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-4 max-w-2xl font-light"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
        </AnimatePresence>

        {/* Feature Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {[
            { icon: Smartphone, text: 'Latest Models' },
            { icon: Zap, text: 'Best Prices' },
            { icon: Star, text: 'Trusted Store' },
          ].map((item, i) => (
            <motion.span
              key={item.text}
              initial={{ opacity: 0, scale: 0 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm backdrop-blur-sm cursor-default"
            >
              <item.icon className="w-3.5 h-3.5 text-amber-400" />
              {item.text}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button
            onClick={() => {
              document.getElementById('phones')?.scrollIntoView({ behavior: 'smooth' })
            }}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105 group"
          >
            Explore Phones
            <ChevronDown className="w-5 h-5 ml-2 animate-bounce group-hover:translate-y-1 transition-transform" />
          </Button>

          <Button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            size="lg"
            variant="outline"
            className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 font-semibold text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all hover:scale-105"
          >
            Contact Us
          </Button>
        </motion.div>

        {/* Slide Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex gap-2 mt-10"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="relative overflow-hidden rounded-full transition-all duration-500"
            >
              <div
                className={`w-8 h-1.5 rounded-full transition-all duration-500 ${
                  i === currentSlide ? 'bg-amber-500' : 'bg-white/20'
                }`}
              />
              {i === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-amber-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Corner Decorations */}
      <div className="absolute top-20 left-6 w-16 h-16 border-l-2 border-t-2 border-amber-500/20 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-20 right-6 w-16 h-16 border-r-2 border-t-2 border-amber-500/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-24 left-6 w-16 h-16 border-l-2 border-b-2 border-amber-500/20 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-24 right-6 w-16 h-16 border-r-2 border-b-2 border-amber-500/20 rounded-br-lg pointer-events-none" />

      {/* Animated Side Glow */}
      <motion.div
        className="absolute top-1/2 -left-32 w-64 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          y: ['-50%', '-45%', '-50%'],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 -right-32 w-64 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          y: ['-50%', '-55%', '-50%'],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      />
    </section>
  )
}
