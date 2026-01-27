import { createClient } from '@/utils/supabase/server'
import RegistrationForm from '@/components/registration-form'

export const revalidate = 0

export default async function RegisterPage({ params }: { params: Promise<{ organizer_id: string }> }) {
    const { organizer_id } = await params
    const supabase = await createClient()

    const { data: lectures, error } = await supabase
        .from('lectures')
        .select('id, cne_date, topic')
        .order('cne_date', { ascending: true })

    if (error) {
        console.error('Error fetching lectures:', error)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Nurse Registration
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Organizer ID: <span className="font-mono bg-gray-200 px-1 rounded">{organizer_id}</span>
                </p>
            </div>

            <RegistrationForm organizerId={organizer_id} lectures={lectures || []} />
        </div>
    )
}
