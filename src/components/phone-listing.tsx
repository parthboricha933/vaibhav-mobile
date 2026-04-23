'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Search, SlidersHorizontal, AlertTriangle, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PhoneCard from './phone-card'

interface PhoneData {
  id: string
  name: string
  description: string
  price: string
  images: string[]
  code: string
}

interface PhoneListingProps {
  onInquire: (phone: { name: string; code: string }) => void
  onViewDetails: (phone: PhoneData) => void
}

export default function PhoneListing({ onInquire, onViewDetails }: PhoneListingProps) {
  const [phones, setPhones] = useState<PhoneData[]>([])
  const [filteredPhones, setFilteredPhones] = useState<PhoneData[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPhones()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPhones(phones)
    } else {
      const q = searchQuery.toLowerCase()
      setFilteredPhones(
        phones.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.price.toLowerCase().includes(q)
        )
      )
    }
  }, [searchQuery, phones])

  const fetchPhones = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/phones')
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || data.details || 'Failed to load phones. Please check your database connection.')
        setPhones([])
        setFilteredPhones([])
        return
      }
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setPhones(data)
        setFilteredPhones(data)
      } else {
        setError('Unexpected data format from server.')
        setPhones([])
        setFilteredPhones([])
      }
    } catch (err) {
      console.error('Error fetching phones:', err)
      setError('Network error. Please check your connection and try again.')
      setPhones([])
      setFilteredPhones([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="phones" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(217, 119, 6, 0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            <Phone className="w-3 h-3" />
            Our Collection
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Explore{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Smartphones
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Browse our curated collection of the latest smartphones. Find the perfect device for your needs and budget.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto mb-10"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search phones by name, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/80 border-gray-800 text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:ring-amber-500/20"
            />
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Unable to Load Phones</h3>
            <p className="text-gray-400 text-sm mb-4">{error}</p>
            <Button
              onClick={fetchPhones}
              variant="outline"
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden">
                  <div className="aspect-square bg-gray-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-800 rounded w-3/4" />
                    <div className="h-7 bg-gray-800 rounded w-1/2" />
                    <div className="h-4 bg-gray-800 rounded w-full" />
                    <div className="flex gap-2 pt-1">
                      <div className="h-9 bg-gray-800 rounded flex-1" />
                      <div className="h-9 bg-gray-800 rounded flex-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Phone Grid */}
        {!loading && !error && filteredPhones.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhones.map((phone, index) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onInquire={onInquire}
                onViewDetails={onViewDetails}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPhones.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No phones found</h3>
            <p className="text-gray-500">Try adjusting your search or check back later.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
