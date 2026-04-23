'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { IndianRupee, MessageCircle, Eye, QrCode } from 'lucide-react'

interface PhoneCardProps {
  phone: {
    id: string
    name: string
    description: string
    price: string
    imageURL: string
    code: string
  }
  onInquire: (phone: { name: string; code: string }) => void
  onViewDetails: (phone: {
    id: string
    name: string
    description: string
    price: string
    imageURL: string
    code: string
  }) => void
  index: number
}

export default function PhoneCard({ phone, onInquire, onViewDetails, index }: PhoneCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group bg-gray-900/80 border-gray-800 hover:border-amber-500/50 transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square bg-gray-800">
          <img
            src={phone.imageURL}
            alt={phone.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
            }}
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Code Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/70 backdrop-blur-sm text-amber-400 border border-amber-500/30 font-mono text-xs">
              <QrCode className="w-3 h-3 mr-1" />
              {phone.code}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 sm:p-5 space-y-3">
          {/* Name & Price */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {phone.name}
            </h3>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xl">
              <IndianRupee className="w-4 h-4" />
              <span>{phone.price.replace('₹', '')}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {phone.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(phone)}
              className="flex-1 border-gray-700 text-gray-300 hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/5 transition-all"
            >
              <Eye className="w-4 h-4 mr-1.5" />
              Details
            </Button>
            <Button
              size="sm"
              onClick={() => onInquire({ name: phone.name, code: phone.code })}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-all"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Inquire
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
