'use client'

import { useState } from 'react'
import { submitRegistration } from '@/app/register/[organizer_id]/actions'

type Lecture = {
    id: string
    cne_date: string
    topic: string | null
}

export default function RegistrationForm({ organizerId, lectures }: { organizerId?: string, lectures: Lecture[] }) {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [manualOrgId, setManualOrgId] = useState(organizerId || '')

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        setSuccess(false)

        const activeOrgId = organizerId || manualOrgId

        if (!activeOrgId) {
            setError("Organizer ID is required. Please ask your organizer for the code.")
            setLoading(false)
            return
        }

        const result = await submitRegistration(activeOrgId, formData)

        setLoading(false)
        if (result?.error) {
            setError(result.error)
        } else if (result?.success) {
            setSuccess(true)
        }
    }

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto p-6 sm:p-8 text-center bg-white shadow-lg rounded-2xl border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-3">Registration Successful!</h2>
                <p className="text-gray-700 mb-2">
                    Thank you for registering. Your details have been received for the selected CNE date.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    You may show this screen at the venue if needed. You can also register another nurse below.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium text-base"
                >
                    Register Another Nurse
                </button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 shadow-xl rounded-2xl border border-gray-100">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800">CNE Lecture Registration</h1>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-4">
                {/* Organizer Code Input */}
                {!organizerId && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Organizer Code (Required)</label>
                        <input
                            type="text"
                            value={manualOrgId}
                            onChange={e => setManualOrgId(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Paste the code here..."
                            required
                        />
                        <p className="text-xs text-gray-600 mt-2">If you don't have a link, ask your organizer for their code.</p>
                    </div>
                )}

                {/* CNE Date Selection */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select CNE Date *</label>
                    <select
                        name="cne_date"
                        required
                        defaultValue=""
                        className="w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>-- Select Date --</option>
                        {lectures.map((lecture) => {
                            const date = new Date(lecture.cne_date)
                            const formatted = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
                            return (
                                <option key={lecture.id} value={lecture.cne_date}>
                                    {formatted} {lecture.topic ? `- ${lecture.topic}` : ''}
                                </option>
                            )
                        })}
                    </select>
                </div>

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                        name="full_name"
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                    />
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                    <input
                        name="mobile_number"
                        type="tel"
                        required
                        pattern="^[0-9]{10}$"
                        className="w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="10-digit mobile number"
                    />
                    <p className="mt-1 text-xs text-gray-500">Exactly 10 digits, numbers only.</p>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="nurse@example.com"
                    />
                </div>

                {/* DOB and UID - Stack on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                        <input
                            name="dob"
                            type="date"
                            required
                            className="w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">UID (Aadhaar) *</label>
                        <input
                            name="uid_number"
                            required
                            pattern="^[0-9]{12}$"
                            className="w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="12-digit Aadhaar number"
                        />
                        <p className="mt-1 text-xs text-gray-500">Exactly 12 digits, no spaces.</p>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                    <textarea
                        name="address"
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter your full address"
                    />
                </div>

                {/* Nursing Registration Number */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nursing Registration Number *</label>
                    <input
                        name="nursing_reg_number"
                        required
                        className="w-full rounded-lg border-gray-300 shadow-sm border p-3 text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter registration number"
                    />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start pt-2">
                    <input
                        id="consent"
                        type="checkbox"
                        required
                        className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="ml-3 block text-sm text-gray-900">
                        I consent to sharing my details with the organizer for CNE registration purposes.
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors mt-6"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        'Register Now'
                    )}
                </button>
            </form>
        </div>
    )
}
