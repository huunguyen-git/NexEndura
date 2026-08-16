'use server';

import { createClient } from '@/lib/supabase/server';

export async function getInboxMessagesAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('inbox_messages')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inbox messages:', error);
    return [];
  }

  return data.map((d: any) => ({
    id: d.id,
    type: d.type,
    title: d.title,
    message: d.message,
    date: d.created_at,
    isRead: d.is_read,
    link: d.link_url
  }));
}

export async function markMessageReadAction(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from('inbox_messages')
    .update({ is_read: true })
    .eq('id', id)
    .eq('user_id', user.id);
}
