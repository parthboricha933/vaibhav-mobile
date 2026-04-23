'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { IndianRupee, QrCode, MessageCircle, X } from 'lucide-react'
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
  imageURL: string
  code: string
}

interface PhoneDetailModalProps {
  isOpen: boolean
  onClose: () => void
  phone: PhoneData | null
  onInquire: (phone: { name: string; code: string }) => void
}

export default function PhoneDetailModal({ isOpen, onClose, phone, onInquire }: PhoneDetailModalProps) {
  if (!phone) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-lg p-0 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-video bg-gray-800">
          <img
            src={phone.imageURL}
            alt={phone.name}
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
        </div>

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
              <p className="text-xs text-gray-500 mb-1">Availability</p>
              <p className="text-green-400 font-bold text-lg">In Stock</p>
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
