'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="home" ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/hero-banner.jpg')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/20" />
      </motion.div>

      {/* Animated particles/lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"
            style={{
              left: `${20 + i * 15}%`,
              height: '100%',
            }}
            animate={{
              opacity: [0, 0.5, 0],
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
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
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  )
}
