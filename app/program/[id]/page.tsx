import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { programs } from '@/lib/data/programs';
import { getProgramById } from '@/lib/data/programs';
import { ProgramDetailsClient } from '@/components/program/program-details-client';

interface Props {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return programs.map((program) => ({
    id: program.id.toString(),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const program = getProgramById(parseInt(params.id));
  
  if (!program) {
    return {
      title: 'Program Not Found',
    };
  }

  return {
    title: program.title,
    description: program.description,
  };
}

export default function ProgramDetails({ params }: Props) {
  const program = getProgramById(parseInt(params.id));

  if (!program) {
    notFound();
  }

  return <ProgramDetailsClient program={program} />;
}