'use client'

import { useState } from 'react'
import { addLecture } from './actions'

export default function AddLecture() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        // Clear the form after submit if successful? Hard with default form action.
        // Let's use simple handler.
        const res = await addLecture(formData)
        setLoading(false)

        if (res?.error) {
            setError(res.error)
        } else {
            // Reset form?
            const form = document.getElementById('add-lecture-form') as HTMLFormElement
            form.reset()
        }
    }

    return (
        <div className="mb-8 p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Add New CNE Date</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form id="add-lecture-form" action={handleSubmit} className="flex gap-4 items-end flex-wrap">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input name="cne_date" type="date" required className="border rounded p-2 text-black" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Topic (Optional)</label>
                    <input name="topic" type="text" className="border rounded p-2 text-black w-64" placeholder="e.g. Critical Care" />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    {loading ? 'Adding...' : 'Add Lecture'}
                </button>
            </form>
        </div>
    )
}
