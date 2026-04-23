'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, Navigation } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

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
            <MapPin className="w-3 h-3" />
            Visit Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Get In{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Visit our store in Rajula or reach out to us for the best deals on smartphones.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: MapPin,
              title: 'Location',
              info: 'Rajula, Amreli, Gujarat, India',
              sub: 'Main Market Area',
            },
            {
              icon: Phone,
              title: 'Phone',
              info: '+91 98765 43210',
              sub: 'Call us anytime',
            },
            {
              icon: Clock,
              title: 'Working Hours',
              info: 'Mon - Sat: 10AM - 9PM',
              sub: 'Sunday: 11AM - 6PM',
            },
            {
              icon: Mail,
              title: 'Email',
              info: 'vaibhavmobiles@rajula.com',
              sub: 'Quick response guaranteed',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/80 border-gray-800 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 group h-full">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.info}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <Card className="bg-gray-900/80 border-gray-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 sm:h-80 bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-10 h-10 text-amber-500/50 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-300 mb-1">Vaibhav Mobiles</h3>
                  <p className="text-gray-500 text-sm">Rajula, Amreli, Gujarat</p>
                  <a
                    href="https://maps.google.com/?q=Rajula,Gujarat,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
