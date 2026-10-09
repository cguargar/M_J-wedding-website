# Elegant Wedding Website

React + Vite wedding website with countdown, gallery, venue maps, timeline, music toggle and working RSVP backend for Vercel + Supabase.

## Personalise
1. Edit `config.js`: names, wedding date/time with correct timezone offset, venues, map queries, schedule and RSVP deadline.
2. Add your own images as `public/photos/1.jpg` through `4.jpg` (the default design shows decorative placeholders if these are absent).
3. Add a licensed audio file at `public/music.mp3` to enable the music toggle. Browsers require a click before playing audio.
4. Update the title and description in `index.html`.

## Supabase RSVP storage
1. Create a Supabase project at https://supabase.com.
2. Open SQL Editor and run `supabase.sql`.
3. In Project Settings, copy your Project URL and **service_role** key (or corresponding secret API key). The key must remain server-side. Never put it in `config.js` or a `VITE_` variable.
4. Add environment variables `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel's Project Settings > Environment Variables.
5. Guest responses appear in Supabase Table Editor > `rsvps`. Row-level security is enabled with no public policies.

## Deploy
1. Upload this folder to a private or public GitHub repository.
2. In https://vercel.com, choose Add New > Project, import your repository.
3. Vercel should detect Vite; build command `npm run build`, output directory `dist`.
4. Add the two environment variables from above, then Deploy.
5. Test an RSVP on your deployed URL and confirm the row appears in Supabase. You can add a custom domain in Vercel.

## Run locally
`npm install` then `npm run dev` runs the front end. The `/api/rsvp` serverless endpoint runs on Vercel; to test both locally use `npx vercel dev` after configuring Vercel and local environment variables.

## Production considerations
The form allows repeat submissions and up to 6 guests. Add invite-only tokens, CAPTCHA/rate limiting, or guest-list verification before sharing publicly if spam or unwanted responses are a concern. RSVP submissions collect personal information: share a privacy contact/notice with guests and manage retention. No emails are sent automatically.
