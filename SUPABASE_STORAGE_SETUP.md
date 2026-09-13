# Supabase image storage setup

1. Create a Supabase project.
2. Open **Storage > New bucket**.
3. Name the bucket `product-images`.
4. Mark the bucket **Public**.
5. In **Storage > Policies**, add an INSERT policy for the `storage.objects` table that allows the `anon` role to upload when `bucket_id = 'product-images'`. The browser upload uses the Supabase anon key; Firebase login does not create a Supabase session. For better security, move uploads to a server-side endpoint later.
6. Copy the project URL and anon key from **Project Settings > API** into `.env.local`:

```text
# Replace these example values with the values from Project Settings > API.
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The app resizes each selected image to a centered 800 x 800 JPEG, then uploads it to `products/{productId}/{timestamp}_{filename}.jpg`. Only the resulting public URL is written to the existing Firestore `images` field.

Never use the Supabase service-role key in `.env.local`, client code, or Vercel browser-exposed variables.
