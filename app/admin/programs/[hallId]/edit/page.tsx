import { EditProgramForm } from './edit-program-form'

// Define correct types for the page props
type PageProps = {
  params: {
    hallId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const dynamicParams = false

export async function generateStaticParams() {
  // Add your actual hall IDs here
  return [
    { hallId: '1' },
    { hallId: '2' },
    { hallId: '3' }
  ]
}

export default async function EditProgramPage({ params, searchParams }: PageProps) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Program</h1>
      <EditProgramForm hallId={params.hallId} />
    </div>
  )
} 