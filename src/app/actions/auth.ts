'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  const nextUrl = formData.get('nextUrl') as string || '/account'

  redirect(nextUrl)
}

export async function signupAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  if (!email || !password || !fullName) {
    return { error: 'All fields are required' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  })

  if (error) {
    let msg = error.message;
    if (msg.toLowerCase().includes('rate limit')) {
      msg = 'This email is already in use or you have tried too many times. Please use a different email or try again later.';
    }
    return { error: msg }
  }

  if (!data.session) {
    redirect('/verify-email')
  }

  // Next.js redirect needs to happen outside try-catch or without returning it
  const nextUrl = formData.get('nextUrl') as string || '/account'
  redirect(nextUrl)
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
