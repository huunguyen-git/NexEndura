'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * SECURITY: Sanitizes the post-login redirect URL to prevent open-redirect attacks.
 * Only allows relative paths (starting with /) that stay on the same origin.
 * Any external URL (http/https, protocol-relative //, etc.) falls back to /account.
 */
function sanitizeRedirectUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return '/account'
  // Reject absolute URLs, protocol-relative URLs, and data: URIs
  if (
    url.startsWith('http') ||
    url.startsWith('//') ||
    url.startsWith('\\') ||
    url.startsWith('data:')
  ) {
    return '/account'
  }
  // Must start with / to be a valid relative path
  if (!url.startsWith('/')) return '/account'
  return url
}

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
    // Return a generic message — do not expose Supabase internal error details to the client
    return { error: 'Invalid email or password. Please try again.' }
  }

  const nextUrl = sanitizeRedirectUrl(formData.get('nextUrl') as string)
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
    // Show a user-friendly message; map known patterns without leaking internal details
    if (error.status === 429 || error.message?.toLowerCase().includes('rate limit')) {
      return { error: 'Too many attempts. Please wait a moment and try again.' }
    }
    if (error.message?.toLowerCase().includes('already registered') || error.message?.toLowerCase().includes('already in use')) {
      return { error: 'An account with this email already exists. Please sign in instead.' }
    }
    return { error: 'Unable to create account. Please try again.' }
  }

  if (!data.session) {
    redirect('/verify-email')
  }

  const nextUrl = sanitizeRedirectUrl(formData.get('nextUrl') as string)
  redirect(nextUrl)
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
