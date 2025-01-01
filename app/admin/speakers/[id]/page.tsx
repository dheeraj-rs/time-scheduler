import { SpeakerProfile } from '@/components/speakers/SpeakerProfile'
import { sampleSpeakers } from '@/lib/sample-data'
import { notFound } from 'next/navigation'

export default function SpeakerDetailPage({ params }: { params: { id: string } }) {
  const speaker = sampleSpeakers.find(s => s.id === params.id)

  if (!speaker) {
    notFound()
  }

  return <SpeakerProfile speaker={speaker} />
}

export function generateStaticParams() {
  return sampleSpeakers.map((speaker) => ({
    id: speaker.id,
  }))
}