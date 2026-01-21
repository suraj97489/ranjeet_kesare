import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import AddLecture from './add-lecture'

export default async function DashboardPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        // Should be caught by middleware, but TS check
        return <div>Please log in</div>
    }

    // Fetch lectures
    const { data: lectures } = await supabase
        .from('lectures')
        .select('*')
        .order('cne_date', { ascending: false })

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Your Registration Link ID:</p>
                        <code className="bg-gray-200 p-1 rounded select-all text-black">{user.id}</code>
                    </div>
                </div>

                <AddLecture />

                <h2 className="text-xl font-bold mb-4 text-gray-800">Upcoming & Past Lectures</h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {lectures?.map((lecture) => (
                            <li key={lecture.id} className="hover:bg-gray-50 transition">
                                <Link href={`/dashboard/cne/${lecture.cne_date}`} className="block p-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-medium text-blue-600 truncate">
                                                {new Date(lecture.cne_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            {lecture.topic && <p className="text-sm text-gray-500">{lecture.topic}</p>}
                                        </div>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                View Registrations &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        {(!lectures || lectures.length === 0) && (
                            <li className="p-4 text-center text-gray-500">No lectures found. Add one above.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
