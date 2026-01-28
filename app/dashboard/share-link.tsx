'use client'

import { useState, useEffect } from 'react'

export default function ShareLink({ organizerId }: { organizerId: string }) {
    const [copied, setCopied] = useState(false)
    const [origin, setOrigin] = useState('')

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    const link = `${origin}/?organizer_id=${organizerId}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-5 sm:p-6 mb-6 text-white">
            <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Your Registration Link</h3>
                    <p className="text-sm text-blue-100">Share this link with nurses via WhatsApp to collect registrations</p>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                        readOnly
                        value={link}
                        className="flex-1 px-3 py-2 text-sm bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 select-all focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                        onClick={copyToClipboard}
                        className="bg-white text-indigo-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center justify-center space-x-2 whitespace-nowrap"
                    >
                        {copied ? (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span>Copy Link</span>
                            </>
                        )}
                    </button>
                </div>
                {copied && (
                    <p className="mt-2 text-xs text-green-100">
                        Link copied. Paste it into WhatsApp, SMS, or email to invite nurses.
                    </p>
                )}
            </div>
        </div>
    )
}
