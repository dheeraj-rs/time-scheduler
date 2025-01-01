"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from "sonner"

export default function PhoneSignupPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone)
  }

  const handleSubmitPhone = async () => {
    try {
      setError(null)
      setIsLoading(true)
      if (!phoneNumber) {
        throw new Error('Phone number is required')
      }
      if (!validatePhoneNumber(phoneNumber)) {
        throw new Error('Please enter a valid phone number')
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStep('otp')
      toast.success('OTP sent successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      toast.error(err instanceof Error ? err.message : 'Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    try {
      setError(null)
      setIsLoading(true)
      if (!otp || otp.length !== 6) {
        throw new Error('Please enter a valid OTP')
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Signup successful!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      toast.error(err instanceof Error ? err.message : 'Failed to verify OTP')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/auth/signup">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold">Sign up with Phone</CardTitle>
          </div>
          <CardDescription>
            {step === 'phone' ? 'Enter your phone number to get started' : 'Enter the verification code sent to your phone'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
          
          {step === 'phone' ? (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => {
                  setError(null)
                  setPhoneNumber(e.target.value)
                }}
                disabled={isLoading}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <InputOTP 
                maxLength={6} 
                value={otp} 
                onChange={(value) => {
                  setError(null)
                  setOtp(value)
                }}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            className="w-full" 
            onClick={step === 'phone' ? handleSubmitPhone : handleVerifyOTP}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : (step === 'phone' ? 'Send Code' : 'Create Account')}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 