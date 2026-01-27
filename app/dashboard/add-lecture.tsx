'use client'

import { useState } from 'react'
import { addLecture } from './actions'

export default function AddLecture() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        setSuccess(false)

        const res = await addLecture(formData)
        setLoading(false)

        if (res?.error) {
            setError(res.error)
        } else {
            setSuccess(true)
            const form = document.getElementById('add-lecture-form') as HTMLFormElement
            form.reset()
            setTimeout(() => setSuccess(false), 3000)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 mb-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Add New CNE Lecture</h3>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    <p className="text-sm text-green-700 font-medium">✓ Lecture added successfully!</p>
                </div>
            )}

            <form id="add-lecture-form" action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Lecture Date *
                        </label>
                        <input
                            name="cne_date"
                            type="date"
                            required
                            className="w-full rounded-lg border-gray-300 shadow-sm border px-3 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Topic (Optional)
                        </label>
                        <input
                            name="topic"
                            type="text"
                            className="w-full rounded-lg border-gray-300 shadow-sm border px-3 py-2.5 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g. Critical Care Nursing"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Adding...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Add Lecture</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}
