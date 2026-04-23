'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { IndianRupee, QrCode, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'

interface PhoneData {
  id: string
  name: string
  description: string
  price: string
  images: string[]
  code: string
}

interface PhoneDetailModalProps {
  isOpen: boolean
  onClose: () => void
  phone: PhoneData | null
  onInquire: (phone: { name: string; code: string }) => void
}

export default function PhoneDetailModal({ isOpen, onClose, phone, onInquire }: PhoneDetailModalProps) {
  const [currentImage, setCurrentImage] = useState(0)

  if (!phone) return null

  const images = phone.images && phone.images.length > 0
    ? phone.images
    : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop']

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-lg p-0 overflow-hidden">
        {/* Main Image */}
        <div className="relative aspect-video bg-gray-800">
          <img
            src={images[currentImage]}
            alt={`${phone.name} - Image ${currentImage + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          <Badge className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-amber-400 border border-amber-500/30 font-mono">
            <QrCode className="w-3 h-3 mr-1" />
            {phone.code}
          </Badge>

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentImage ? 'bg-amber-400 w-4' : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 px-6 pt-3 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  i === currentImage
                    ? 'border-amber-500 shadow-md shadow-amber-500/20'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <img
                  src={img}
                  alt={`${phone.name} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{phone.name}</h2>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-2xl">
              <IndianRupee className="w-5 h-5" />
              <span>{phone.price.replace('₹', '')}</span>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
            <p className="text-sm text-gray-400 mb-1">Description</p>
            <p className="text-gray-300 leading-relaxed">{phone.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 text-center">
              <p className="text-xs text-gray-500 mb-1">Product Code</p>
              <p className="text-amber-400 font-mono font-bold text-lg">{phone.code}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 text-center">
              <p className="text-xs text-gray-500 mb-1">Images</p>
              <p className="text-green-400 font-bold text-lg">{images.length} Photos</p>
            </div>
          </div>

          <Button
            onClick={() => {
              onClose()
              onInquire({ name: phone.name, code: phone.code })
            }}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-black font-bold py-5 transition-all"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Inquire About This Phone
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
