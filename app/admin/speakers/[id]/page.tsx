import { notFound } from 'next/navigation'
import { sampleSpeakers } from '@/lib/sample-data'
import { SpeakerDetailClient } from './speaker-detail-client'

interface Props {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return sampleSpeakers.map((speaker) => ({
    id: speaker.id,
  }))
}

export default function SpeakerDetailPage({ params }: Props) {
  const speaker = sampleSpeakers.find(s => s.id === params.id)

  if (!speaker) {
    return notFound()
  }

  return <SpeakerDetailClient initialSpeaker={speaker} />
}