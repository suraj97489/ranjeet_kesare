'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addLecture(formData: FormData) {
    const supabase = createClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const cne_date = formData.get('cne_date') as string
    const topic = formData.get('topic') as string

    if (!cne_date) return { error: 'Date is required' }

    const { error } = await supabase.from('lectures').insert({
        cne_date,
        topic,
        created_by: user.id
    })

    if (error) {
        if (error.code === '23505') return { error: 'Date already exists' }
        return { error: 'Failed to add lecture' }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
