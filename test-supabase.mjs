import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  // We don't have the user token, so we can't test RLS easily as the user.
  // But we can check if we can insert anonymously (which should fail).
  const { data, error } = await supabase.from('orders').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    order_number: 'TEST',
    subtotal: 0, total: 0, shipping_address: {}
  });
  console.log("Error:", error);
}

run();
