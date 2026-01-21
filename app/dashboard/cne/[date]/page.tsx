import { createClient } from '@/utils/supabase/server'
import NurseList from './nurse-list'
import Link from 'next/link'

export default async function CNEDetailsPage({ params }: { params: { date: string } }) {
    const supabase = createClient()

    // RLS ensures we only see our own registrations
    const { data: registrations, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('cne_date', params.date)
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error)
        return <div>Error loading data</div>
    }

    // Fetch lecture topic too if possible
    const { data: lecture } = await supabase.from('lectures').select('topic').eq('cne_date', params.date).single()

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/dashboard" className="text-blue-600 hover:underline">&larr; Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Registrations for {new Date(params.date).toLocaleDateString()} {lecture?.topic ? `- ${lecture.topic}` : ''}
                    </h1>
                </div>

                <NurseList registrations={registrations || []} />
            </div>
        </div>
    )
}
