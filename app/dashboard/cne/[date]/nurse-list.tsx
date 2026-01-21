'use client'

import { useState, useMemo } from 'react'

type Registration = {
    id: string
    full_name: string
    mobile_number: string
    email: string
    address: string
    dob: string
    nursing_reg_number: string
    uid_number: string
    created_at: string
}

export default function NurseList({ registrations }: { registrations: Registration[] }) {
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        if (!search) return registrations
        const lower = search.toLowerCase()
        return registrations.filter(r =>
            r.full_name.toLowerCase().includes(lower) ||
            r.mobile_number.includes(lower)
        )
    }, [search, registrations])

    const downloadCSV = () => {
        // Simple CSV export
        const headers = ['Full Name', 'Mobile', 'Email', 'Address', 'DOB', 'Nursing Reg No', 'UID', 'Registered At']
        const rows = filtered.map(r => [
            r.full_name,
            r.mobile_number,
            r.email,
            r.address,
            r.dob,
            r.nursing_reg_number,
            r.uid_number,
            new Date(r.created_at).toLocaleString()
        ])

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers, ...rows].map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "nurse_registrations.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search by name or mobile..."
                    className="border rounded p-2 text-black w-full sm:w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="text-sm text-gray-500">
                    Total Registrations: {filtered.length}
                </div>
                <button
                    onClick={downloadCSV}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Export to Excel (CSV)
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filtered.map((reg) => (
                            <tr key={reg.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reg.full_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.mobile_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{reg.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => alert(JSON.stringify(reg, null, 2))} // Simple detail view for now
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        View Full
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No registrations found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
