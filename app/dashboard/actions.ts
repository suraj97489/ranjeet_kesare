'use server'

import { createClient } from '@/utils/supabase/server'
import { getSession } from '@/app/login/actions'
import { revalidatePath } from 'next/cache'

export async function addLecture(formData: FormData) {
    const session = await getSession()
    if (!session) return { error: 'Not authenticated' }

    const supabase = await createClient()

    const cne_date = formData.get('cne_date') as string
    const topic = formData.get('topic') as string

    if (!cne_date) return { error: 'Date is required' }

    const { error } = await supabase.from('lectures').insert({
        cne_date,
        topic,
        created_by: session.id
    })

    if (error) {
        console.error('Add lecture error:', error)
        if (error.code === '23505') return { error: 'Date already exists' }
        return { error: `Failed to add lecture: ${error.message}` }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
