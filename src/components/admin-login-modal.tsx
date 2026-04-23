'use client'

import { useState } from 'react'
import { Shield, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export default function AdminLoginModal({ isOpen, onClose, onLogin }: AdminLoginModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogging, setIsLogging] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLogging(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || data.details || 'Login failed. Check if database is connected.')
        return
      }

      onLogin()
      setUsername('')
      setPassword('')
      onClose()
    } catch (err) {
      setError('Network error. Cannot reach the server.')
    } finally {
      setIsLogging(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isLogging && onClose()}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            Admin Login
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Sign in to manage phones and inquiries
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-username" className="text-gray-300">
              Username
            </Label>
            <Input
              id="admin-username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500/50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500/50"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-400 text-sm font-medium">Login Failed</p>
                  <p className="text-red-300/70 text-xs mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLogging}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-black font-bold py-5 transition-all"
          >
            {isLogging ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Login
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Default credentials: admin / admin123
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
