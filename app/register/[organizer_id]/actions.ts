'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function submitRegistration(organizerId: string, formData: FormData) {
    const supabase = await createClient()

    const full_name = formData.get('full_name') as string
    const mobile_number = formData.get('mobile_number') as string
    const address = formData.get('address') as string
    const dob = formData.get('dob') as string
    const email = formData.get('email') as string
    const nursing_reg_number = formData.get('nursing_reg_number') as string
    const uid_number = formData.get('uid_number') as string
    const cne_date = formData.get('cne_date') as string

    // Simple validation
    if (!full_name || !mobile_number || !cne_date) {
        return { error: 'Missing required fields' }
    }

    // Insert into DB
    const { error } = await supabase.from('registrations').insert({
        organizer_id: organizerId,
        full_name,
        mobile_number,
        address,
        dob,
        email,
        nursing_reg_number,
        uid_number,
        cne_date,
    })

    if (error) {
        console.error('Registration Error:', error)
        if (error.code === '23505') { // Unique violation
            return { error: 'You are already registered for this date with this mobile number.' }
        }
        return { error: 'Registration failed. Please try again.' }
    }

    return { success: true }
}
