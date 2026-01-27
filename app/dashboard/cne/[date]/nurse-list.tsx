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
    const [selectedNurse, setSelectedNurse] = useState<Registration | null>(null)

    const filtered = useMemo(() => {
        if (!search) return registrations
        const lower = search.toLowerCase()
        return registrations.filter(r =>
            r.full_name.toLowerCase().includes(lower) ||
            r.mobile_number.includes(lower)
        )
    }, [search, registrations])

    const downloadCSV = () => {
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
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                {/* Search and Export Bar */}
                <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name or mobile..."
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-white px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 whitespace-nowrap">
                                {filtered.length} {filtered.length === 1 ? 'nurse' : 'nurses'}
                            </div>
                            <button
                                onClick={downloadCSV}
                                className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="hidden sm:inline">Export CSV</span>
                                <span className="sm:hidden">Export</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nurse List */}
                <div className="divide-y divide-gray-200">
                    {filtered.length === 0 ? (
                        <div className="p-8 sm:p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium">No registrations found</p>
                            <p className="text-sm text-gray-400 mt-1">
                                {search ? 'Try a different search term' : 'Nurses will appear here once they register'}
                            </p>
                        </div>
                    ) : (
                        filtered.map((reg) => (
                            <div
                                key={reg.id}
                                onClick={() => setSelectedNurse(reg)}
                                className="p-4 sm:p-5 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-indigo-600 font-semibold text-sm">
                                                {reg.full_name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-base font-semibold text-gray-900 truncate">{reg.full_name}</p>
                                            <p className="text-sm text-gray-500">{reg.mobile_number}</p>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedNurse && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedNurse(null)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">Nurse Details</h3>
                                <button
                                    onClick={() => setSelectedNurse(null)}
                                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <DetailRow label="Full Name" value={selectedNurse.full_name} />
                            <DetailRow label="Mobile Number" value={selectedNurse.mobile_number} />
                            <DetailRow label="Email" value={selectedNurse.email} />
                            <DetailRow label="Address" value={selectedNurse.address} />
                            <DetailRow label="Date of Birth" value={new Date(selectedNurse.dob).toLocaleDateString()} />
                            <DetailRow label="Nursing Reg. No." value={selectedNurse.nursing_reg_number} />
                            <DetailRow label="UID (Aadhaar)" value={selectedNurse.uid_number} />
                            <DetailRow label="Registered At" value={new Date(selectedNurse.created_at).toLocaleString()} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-b border-gray-100 pb-3 last:border-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
            <p className="text-base text-gray-900">{value}</p>
        </div>
    )
}
