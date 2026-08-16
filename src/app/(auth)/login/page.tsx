'use client';

import Link from 'next/link';
import { useActionState, Suspense } from 'react';
import { loginAction } from '@/app/actions/auth';
import { Loader2, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/account';

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-black tracking-tighter block mb-8">
          NEX<span className="text-blue-600">ENDURA</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500">Sign in to your account to continue.</p>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-bold text-gray-900">Password</label>
            <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>
          <input 
            type="password" 
            name="password"
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            placeholder="••••••••"
          />
        </div>

        <input type="hidden" name="nextUrl" value={nextUrl} />

        {state?.error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
            {state.error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={pending}
          className="w-full bg-gray-900 text-white rounded-xl px-4 py-4 font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-gray-500">
        Don't have an account?{' '}
        <Link href="/register" className="text-gray-900 font-bold hover:underline">
          Create one now
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" /></div>}>
      <LoginForm />
    </Suspense>
  )
}
