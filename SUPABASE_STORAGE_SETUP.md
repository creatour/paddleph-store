# Supabase image storage setup

1. Create a Supabase project.
2. Open **Storage > New bucket**.
3. Name the bucket `product-images`.
4. Mark the bucket **Public**.
5. In **Storage > Policies**, add an INSERT policy for the `storage.objects` table that allows uploads to the `product-images` bucket. For a single-owner admin app using Firebase Auth, the browser's Supabase anon client does not carry the Firebase session as a Supabase session, so use a narrowly scoped policy for this bucket or add a server-side upload endpoint later.
6. Copy the project URL and anon key into `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The app resizes each selected image to a centered 800 x 800 JPEG, then uploads it to `products/{timestamp}_{filename}.jpg`. Only the resulting public URL is written to the existing Firestore `images` field.

Never use the Supabase service-role key in `.env.local`, client code, or Vercel browser-exposed variables.
