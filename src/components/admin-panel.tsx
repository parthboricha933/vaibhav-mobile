'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Pencil, Trash2, X, Upload, Phone, MessageCircle, ArrowLeft,
  Save, Loader2, ImageIcon, Hash, Search as SearchIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PhoneData {
  id: string
  name: string
  description: string
  price: string
  imageURL: string
  code: string
}

interface InquiryData {
  id: string
  customerName: string
  phoneNumber: string
  message: string | null
  phoneCode: string
  phoneName: string | null
  createdAt: string
}

interface AdminPanelProps {
  onClose: () => void
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [phones, setPhones] = useState<PhoneData[]>([])
  const [inquiries, setInquiries] = useState<InquiryData[]>([])
  const [loading, setLoading] = useState(true)
  const [showPhoneForm, setShowPhoneForm] = useState(false)
  const [editingPhone, setEditingPhone] = useState<PhoneData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageURL: '',
  })
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    fetchPhones()
    fetchInquiries()
  }, [])

  const fetchPhones = async () => {
    try {
      const res = await fetch('/api/phones')
      const data = await res.json()
      setPhones(data)
    } catch (err) {
      console.error('Error fetching phones:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries')
      const data = await res.json()
      setInquiries(data)
    } catch (err) {
      console.error('Error fetching inquiries:', err)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await res.json()
      if (data.imageURL) {
        setFormData((prev) => ({ ...prev, imageURL: data.imageURL }))
        setImagePreview(data.imageURL)
      }
    } catch (err) {
      console.error('Error uploading image:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleImageURLChange = (url: string) => {
    setFormData((prev) => ({ ...prev, imageURL: url }))
    setImagePreview(url)
  }

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', imageURL: '' })
    setImagePreview('')
    setEditingPhone(null)
    setShowPhoneForm(false)
  }

  const handleEditPhone = (phone: PhoneData) => {
    setEditingPhone(phone)
    setFormData({
      name: phone.name,
      description: phone.description,
      price: phone.price,
      imageURL: phone.imageURL,
    })
    setImagePreview(phone.imageURL)
    setShowPhoneForm(true)
  }

  const handleSubmitPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingPhone) {
        // Update
        const res = await fetch(`/api/phones/${editingPhone.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Failed to update phone')
      } else {
        // Create
        const res = await fetch('/api/phones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Failed to create phone')
      }

      await fetchPhones()
      resetForm()
    } catch (err) {
      console.error('Error saving phone:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePhone = async (id: string) => {
    if (!confirm('Are you sure you want to delete this phone?')) return

    try {
      const res = await fetch(`/api/phones/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete phone')
      await fetchPhones()
    } catch (err) {
      console.error('Error deleting phone:', err)
    }
  }

  const filteredPhones = phones.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.includes(searchQuery)
  )

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <Badge variant="outline" className="border-amber-500/30 text-amber-400">
            {phones.length} Phones
          </Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="phones" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="phones" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400">
              <Phone className="w-4 h-4 mr-2" />
              Phones
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400">
              <MessageCircle className="w-4 h-4 mr-2" />
              Inquiries ({inquiries.length})
            </TabsTrigger>
          </TabsList>

          {/* Phones Tab */}
          <TabsContent value="phones" className="space-y-6">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-64">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search phones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                onClick={() => {
                  resetForm()
                  setShowPhoneForm(true)
                }}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Phone
              </Button>
            </div>

            {/* Add/Edit Phone Form */}
            <AnimatePresence>
              {showPhoneForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/80 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">
                          {editingPhone ? 'Edit Phone' : 'Add New Phone'}
                        </h3>
                        <Button variant="ghost" size="icon" onClick={resetForm} className="text-gray-400 hover:text-white">
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      <form onSubmit={handleSubmitPhone} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div className="space-y-2">
                            <Label className="text-gray-300">Phone Name *</Label>
                            <Input
                              placeholder="e.g. Samsung Galaxy S24"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                              required
                            />
                          </div>

                          {/* Price */}
                          <div className="space-y-2">
                            <Label className="text-gray-300">Price *</Label>
                            <Input
                              placeholder="e.g. ₹1,29,999"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                              required
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <Label className="text-gray-300">Description *</Label>
                          <Textarea
                            placeholder="Enter phone description and features..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[80px]"
                            required
                          />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                          <Label className="text-gray-300">Phone Image</Label>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1">
                              <Input
                                placeholder="Image URL or upload below"
                                value={formData.imageURL}
                                onChange={(e) => handleImageURLChange(e.target.value)}
                                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                              />
                            </div>
                            <div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="border-gray-700 text-gray-300 hover:border-amber-500/50 hover:text-amber-400"
                              >
                                {uploading ? (
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  <Upload className="w-4 h-4 mr-2" />
                                )}
                                {uploading ? 'Uploading...' : 'Upload'}
                              </Button>
                            </div>
                          </div>
                          {imagePreview && (
                            <div className="mt-2 relative w-32 h-32 rounded-lg overflow-hidden border border-gray-700">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Code display for editing */}
                        {editingPhone && (
                          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                            <p className="text-xs text-gray-500">Auto-generated Code</p>
                            <p className="text-amber-400 font-mono font-bold text-lg">{editingPhone.code}</p>
                          </div>
                        )}

                        {/* Submit */}
                        <div className="flex gap-3">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4 mr-2" />
                            )}
                            {editingPhone ? 'Update Phone' : 'Add Phone'}
                          </Button>
                          <Button type="button" variant="ghost" onClick={resetForm} className="text-gray-400">
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phone List */}
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading phones...</div>
            ) : filteredPhones.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No phones found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPhones.map((phone) => (
                  <Card key={phone.id} className="bg-gray-900/80 border-gray-800 overflow-hidden group">
                    <div className="flex gap-3 p-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <img
                          src={phone.imageURL}
                          alt={phone.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm truncate">{phone.name}</h4>
                        <p className="text-amber-500 font-bold text-sm">{phone.price}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Hash className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500 font-mono">{phone.code}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-amber-400"
                          onClick={() => handleEditPhone(phone)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-400"
                          onClick={() => handleDeletePhone(phone.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="text-center py-20">
                <MessageCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="bg-gray-900/80 border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-white">{inquiry.customerName}</h4>
                            <Badge variant="outline" className="border-amber-500/30 text-amber-400 text-xs font-mono">
                              {inquiry.phoneCode}
                            </Badge>
                            {inquiry.phoneName && (
                              <span className="text-xs text-gray-500">{inquiry.phoneName}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">
                            Phone: <span className="text-gray-300">{inquiry.phoneNumber}</span>
                          </p>
                          {inquiry.message && (
                            <p className="text-sm text-gray-400 bg-gray-800/50 rounded p-2">
                              {inquiry.message}
                            </p>
                          )}
                          <p className="text-xs text-gray-600">
                            {new Date(inquiry.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
