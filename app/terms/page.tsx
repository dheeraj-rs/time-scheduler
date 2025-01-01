"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button - Using same style as venues page */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By accessing and using our venue booking services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">2. Booking and Cancellation</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">2.1 Booking Process</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All bookings are subject to availability</li>
                  <li>A valid payment method is required to confirm bookings</li>
                  <li>Booking confirmation will be sent via email</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground pt-4">2.2 Cancellation Policy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free cancellation up to 48 hours before the event</li>
                  <li>50% charge for cancellations within 48 hours</li>
                  <li>No refund for no-shows or same-day cancellations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">3. Venue Rules and Regulations</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adherence to venue capacity limits</li>
                  <li>Compliance with safety regulations</li>
                  <li>Respect for venue property and equipment</li>
                  <li>Proper waste management and cleaning</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">4. Payment Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="font-medium text-foreground">Payment Schedule:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>30% deposit required at booking</li>
                    <li>Full payment due 7 days before event</li>
                    <li>Additional charges for overtime or damages</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">5. Liability and Insurance</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Users are responsible for obtaining appropriate event insurance and shall hold the venue harmless from any claims arising from their use of the facilities.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          <div className="text-center text-sm text-muted-foreground space-y-4">
            <p>
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p>
              For questions about these terms, please contact our support team at{" "}
              <Link href="mailto:support@venue-booking.com" className="text-primary hover:underline">
                support@venue-booking.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 