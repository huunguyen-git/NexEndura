import Link from 'next/link';
import { MailCheck } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <MailCheck className="w-8 h-8 text-blue-600" />
      </div>
      
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Check your email</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        We've sent a verification link to your email address. Please click the link to confirm your account and get started.
      </p>

      <Link 
        href="/login"
        className="inline-flex w-full items-center justify-center bg-gray-900 text-white rounded-xl px-4 py-4 font-bold hover:bg-gray-800 transition-all"
      >
        Return to login
      </Link>
    </div>
  );
}
