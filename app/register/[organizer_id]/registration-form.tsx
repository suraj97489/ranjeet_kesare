'use client'

import { useState } from 'react'
import { submitRegistration } from './actions'

type Lecture = {
    id: string
    cne_date: string
    topic: string | null
}

export default function RegistrationForm({ organizerId, lectures }: { organizerId: string, lectures: Lecture[] }) {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        setSuccess(false)

        // Client side validation if needed, or just rely on Server Action return
        const result = await submitRegistration(organizerId, formData)

        setLoading(false)
        if (result?.error) {
            setError(result.error)
        } else if (result?.success) {
            setSuccess(true)
        }
    }

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto p-8 text-center bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
                <p className="text-gray-700">Thank you for registering. Your details have been submitted to the organizer.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Register Another Nurse
                </button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">CNE Lecture Registration</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select CNE Date</label>
                    <select name="cne_date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white text-black">
                        <option value="" disabled selected>-- Select Date --</option>
                        {lectures.map((lecture) => (
                            <option key={lecture.id} value={lecture.cne_date}>
                                {new Date(lecture.cne_date).toLocaleDateString()} {lecture.topic ? `- ${lecture.topic}` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input name="full_name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-black" placeholder="John Doe" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input name="mobile_number" type="tel" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-black" placeholder="1234567890" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input name="email" type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-black" placeholder="nurse@example.com" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input name="dob" type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-black" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea name="address" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-black" rows={2} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Nursing Registration Number</label>
                    <input name="nursing_reg_number" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-black" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">UID (Aadhaar) Number</label>
                    <input name="uid_number" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-black" />
                </div>

                <div className="flex items-center">
                    <input id="consent" type="checkbox" required className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">
                        I consent to sharing my details with the organizer.
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                    {loading ? 'Submitting...' : 'Register'}
                </button>
            </form>
        </div>
    )
}
