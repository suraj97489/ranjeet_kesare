import { createClient } from '@/utils/supabase/server'
import { getSession } from '@/app/login/actions'
import NurseList from './nurse-list'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function CNEDetailsPage({ params }: { params: Promise<{ date: string }> }) {
    const session = await getSession()
    if (!session) {
        redirect('/login')
    }

    const { date } = await params
    const supabase = await createClient()

    // Filter registrations by organizer ID from session
    const { data: registrations, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('cne_date', date)
        .eq('organizer_id', session.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching registrations:', error)
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-8">
                <div className="max-w-6xl mx-auto">
                    <Link href="/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-6">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h2 className="text-red-800 font-bold text-lg">Error loading data</h2>
                                <p className="text-red-600 text-sm mt-1">{error.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const { data: lecture } = await supabase.from('lectures').select('topic').eq('cne_date', date).single()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-4 transition"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                {new Date(date).toLocaleDateString('en-GB', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </h1>
                            {lecture?.topic && (
                                <p className="text-sm sm:text-base text-gray-600 mt-1">{lecture.topic}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                                {registrations?.length || 0} {registrations?.length === 1 ? 'registration' : 'registrations'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <NurseList registrations={registrations || []} />
            </div>
        </div>
    )
}
