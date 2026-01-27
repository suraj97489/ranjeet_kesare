import { createClient } from '@/utils/supabase/server'
import RegistrationForm from '@/components/registration-form'

export const revalidate = 0

export default async function Home({ searchParams }: { searchParams: Promise<{ organizer_id?: string }> }) {
  const params = await searchParams
  const organizerId = params.organizer_id
  const supabase = await createClient()

  // Always fetch lectures
  const { data: lectures, error } = await supabase
    .from('lectures')
    .select('id, cne_date, topic')
    .order('cne_date', { ascending: true })

  if (error) {
    console.error('Error fetching lectures:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Nurse CNE Registration</h1>
        {organizerId && (
          <p className="text-sm text-gray-600">
            Registering with Organizer: <span className="font-mono bg-white px-2 py-1 rounded text-xs">{organizerId}</span>
          </p>
        )}
      </div>

      {/* Registration Form */}
      <RegistrationForm organizerId={organizerId} lectures={lectures || []} />

      {/* Footer */}
      <div className="mt-8 pt-6 text-center">
        <p className="text-xs text-gray-500">Secure CNE Registration Portal</p>
      </div>
    </div>
  )
}
