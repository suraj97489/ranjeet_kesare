'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Hardcoded organizer credentials
const ORGANIZERS = [
    { username: 'ranjeet', password: 'ranjeet@1011', id: 'org_ranjeet_001' },
    { username: 'organizer2', password: 'organizer@2', id: 'org_organizer2_002' }
]

export async function login(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // Find matching organizer
    const organizer = ORGANIZERS.find(
        org => org.username === username && org.password === password
    )

    if (!organizer) {
        return redirect('/login?error=Invalid username or password')
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('organizer_session', JSON.stringify({
        id: organizer.id,
        username: organizer.username
    }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    redirect('/dashboard')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('organizer_session')
    redirect('/login')
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('organizer_session')

    if (!session) return null

    try {
        return JSON.parse(session.value)
    } catch {
        return null
    }
}
