
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({
      error: 'RSVP service is not configured yet.'
    });
  }

  const {
    name,
    mobile,
    attendance,
    guests,
    dietary,
    message
  } = req.body || {};

  const validMobile =
    typeof mobile === 'string' &&
    /^\+?[\d\s()-]{7,20}$/.test(mobile.trim()) &&
    (mobile.match(/\d/g) || []).length >= 7;

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    name.length > 120 ||
    !validMobile ||
    !['yes', 'no'].includes(attendance) ||
    !Number.isInteger(Number(guests)) ||
    Number(guests) < 1 ||
    Number(guests) > 6 ||
    typeof dietary !== 'string' ||
    dietary.length > 500 ||
    typeof message !== 'string' ||
    message.length > 1000
  ) {
    return res.status(400).json({
      error: 'Please check the form fields.'
    });
  }

  try {
    const db = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    const { error } = await db.from('rsvps').insert({
      name: name.trim(),
      mobile: mobile.trim(),
      attendance,
      guests: attendance === 'no' ? 0 : Number(guests),
      dietary: attendance === 'no' ? '' : dietary.trim(),
      message: message.trim()
    });

    if (error) throw error;

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('RSVP insert failed:', e.message);

    return res.status(500).json({
      error: 'Could not save your RSVP. Please try again.'
    });
  }
}
