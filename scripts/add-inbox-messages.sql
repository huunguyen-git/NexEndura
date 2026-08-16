CREATE TABLE inbox_messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type            TEXT NOT NULL,          -- order_update, promo, system
    title           TEXT NOT NULL,
    message         TEXT NOT NULL,
    link_url        TEXT,                   -- optional link (e.g., /account/orders)
    is_read         BOOLEAN DEFAULT false,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- RLS policies for inbox_messages
ALTER TABLE inbox_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages" ON inbox_messages
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages (mark read)" ON inbox_messages
    FOR UPDATE USING (auth.uid() = user_id);
