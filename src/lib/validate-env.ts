/**
 * Validates that all required environment variables are present.
 * Call this in server-side Supabase client factories and middleware
 * so the application fails fast with a clear message instead of
 * silently serving broken pages.
 *
 * Only runs in server contexts (Node.js runtime). Safe to import
 * in files that run on both server and client — the check is
 * guarded by `typeof window === 'undefined'`.
 */
export function validateEnv(): void {
  if (typeof window !== 'undefined') return; // client-side: skip

  const required: string[] = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `[NexEndura] Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join('\n')}\n\nAdd them to .env.local (local dev) or your deployment environment (Netlify / Vercel).`
    );
  }
}
