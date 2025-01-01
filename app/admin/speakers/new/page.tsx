"use client"

import { SpeakerForm } from '@/components/speakers/SpeakerForm'

export default function NewSpeakerPage() {
  return (
    <div>
      <div className="header">
        <h1>Add New Speaker</h1>
      </div>
      <SpeakerForm />
    </div>
  )
}