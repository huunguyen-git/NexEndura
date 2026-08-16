'use client';

import Link from 'next/link';
import { useActionState, Suspense } from 'react';
import { signupAction } from '@/app/actions/auth';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function RegisterForm() {
  const [state, formAction, pending] = useActionState(signupAction, null);
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/account';

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 -z-10" />

      <div className="mb-8">
        <Link href="/" className="text-2xl font-black tracking-tighter block mb-8">
          NEX<span className="text-blue-600">ENDURA</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-500">Join our community of elite athletes.</p>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            placeholder="John Doe"
          />
        </div>

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
          <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
          <input 
            type="password" 
            name="password"
            required
            minLength={6}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            placeholder="Min. 6 characters"
          />
        </div>

        <input type="hidden" name="nextUrl" value={nextUrl} />

        {state?.error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-2">
            <span className="mt-0.5">⚠️</span>
            <span>{state.error}</span>
          </div>
        )}

        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
          <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed">
            Your data is securely stored. We'll ask for specific sizing and sport preferences in your profile later to personalize your experience.
          </p>
        </div>

        <button 
          type="submit" 
          disabled={pending}
          className="w-full bg-gray-900 text-white rounded-xl px-4 py-4 font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-gray-900 font-bold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" /></div>}>
      <RegisterForm />
    </Suspense>
  )
}
