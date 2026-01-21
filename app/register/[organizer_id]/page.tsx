import { createClient } from '@/utils/supabase/server'
import RegistrationForm from './registration-form'

// Revalidate lectures every hour or so, or just dynamic
export const revalidate = 0 // Don't cache for now to ensure fresh dates

export default async function RegisterPage({ params }: { params: { organizer_id: string } }) {
    const supabase = createClient()

    // Fetch upcoming lectures
    // We can filter by date >= today if desired, but user said "All CNE dates" (maybe only future ones for nurse?)
    // Let's just fetch all future ones or all.
    // "Nurse selects lecture by date"

    const { data: lectures, error } = await supabase
        .from('lectures')
        .select('id, cne_date, topic')
        .order('cne_date', { ascending: true })

    if (error) {
        console.error('Error fetching lectures:', error)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Nurse Registration
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Organizer ID: {params.organizer_id}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <RegistrationForm organizerId={params.organizer_id} lectures={lectures || []} />
            </div>
        </div>
    )
}
