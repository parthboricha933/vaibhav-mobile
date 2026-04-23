'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import PhoneListing from '@/components/phone-listing'
import InquiryModal from '@/components/inquiry-modal'
import PhoneDetailModal from '@/components/phone-detail-modal'
import AdminLoginModal from '@/components/admin-login-modal'
import AdminPanel from '@/components/admin-panel'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'

interface PhoneData {
  id: string
  name: string
  description: string
  price: string
  images: string[]
  code: string
}

export default function Home() {
  // Admin state
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  // Inquiry state
  const [showInquiry, setShowInquiry] = useState(false)
  const [inquiryPhone, setInquiryPhone] = useState<{ name: string; code: string } | null>(null)

  // Detail modal state
  const [showDetail, setShowDetail] = useState(false)
  const [detailPhone, setDetailPhone] = useState<PhoneData | null>(null)

  const handleInquire = (phone: { name: string; code: string }) => {
    setInquiryPhone(phone)
    setShowInquiry(true)
  }

  const handleViewDetails = (phone: PhoneData) => {
    setDetailPhone(phone)
    setShowDetail(true)
  }

  const handleAdminLogin = () => {
    setIsAdmin(true)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' })
      setIsAdmin(false)
      setShowAdminPanel(false)
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }

  // If admin panel is shown, render it instead of the main page
  if (showAdminPanel) {
    return (
      <AdminPanel onClose={() => setShowAdminPanel(false)} />
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navbar */}
      <Navbar
        onAdminLogin={() => setShowAdminLogin(true)}
        isAdmin={isAdmin}
        onAdminPanel={() => setShowAdminPanel(true)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Phone Listing Section */}
        <PhoneListing
          onInquire={handleInquire}
          onViewDetails={handleViewDetails}
        />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <InquiryModal
        isOpen={showInquiry}
        onClose={() => setShowInquiry(false)}
        phone={inquiryPhone}
      />

      <PhoneDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        phone={detailPhone}
        onInquire={handleInquire}
      />

      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />
    </div>
  )
}
