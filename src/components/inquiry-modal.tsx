'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  phone: { name: string; code: string } | null
}

export default function InquiryModal({ isOpen, onClose, phone }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return

    if (!formData.customerName.trim() || !formData.phoneNumber.trim()) {
      setError('Name and phone number are required')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phoneCode: phone.code,
          phoneName: phone.name,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit inquiry')
      }

      setIsSuccess(true)
      setFormData({ customerName: '', phoneNumber: '', message: '' })

      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 2500)
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false)
      setError('')
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-amber-500" />
            Inquire Now
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Inquiry Submitted!</h3>
              <p className="text-gray-400 text-center">
                We&apos;ll get back to you soon about the {phone?.name}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Phone Info */}
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <p className="text-sm text-gray-400">Inquiring about</p>
                <p className="font-semibold text-amber-400">{phone?.name}</p>
                <p className="text-xs text-gray-500 font-mono">Code: {phone?.code}</p>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Your Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500/50"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Mobile Number <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500/50"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">
                  Message <span className="text-gray-500">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Any specific questions or requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500/50 min-h-[80px]"
                />
              </div>

              {/* Phone Code (readonly) */}
              <div className="space-y-2">
                <Label className="text-gray-300">Phone Code</Label>
                <Input
                  value={phone?.code || ''}
                  readOnly
                  className="bg-gray-800/30 border-gray-700 text-amber-400 font-mono cursor-not-allowed"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-black font-bold py-5 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Inquiry
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
