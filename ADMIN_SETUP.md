# PADDLEPH.STORE admin setup

## Why Firebase

Firebase is the best fit here because it gives the store a hosted database, email/password authentication, and live updates without adding an Express server. A JSON file is easy to start with, but Vercel cannot safely persist edits to a deployed file. A headless CMS is also viable, but adds a separate subscription and content model. Firebase's free Spark tier is enough for a small catalog.

## 1. Create Firebase resources

1. Open the [Firebase console](https://console.firebase.google.com/) and create a project.
2. Add a Web app in Project settings. Copy its SDK values into a new `.env.local` based on `.env.example`.
3. In **Authentication > Sign-in method**, enable **Email/Password**.
4. In **Authentication > Users**, add your owner email and a strong password. This email is your admin login.
5. In **Firestore Database**, create a database in production mode.
6. In Supabase, create a public Storage bucket named `product-images`.
7. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local` and Vercel.
8. Publish the rules in `firestore.rules` from the Firestore Rules tab.

The public catalog can read products. Only signed-in Firebase users can create, edit, or delete Firestore records. Supabase's public `product-images` bucket handles image uploads; keep the anon key in the browser and never expose a Supabase service-role key.

## 2. Run locally

```text
npm install
npm run dev
```

Open `http://localhost:3000/admin`, sign in with the Firebase owner account, and add products. Select up to four image files. Each image is cropped to a centered 800 x 800 square and compressed before it is uploaded to Supabase Storage under `products/{timestamp}_{filename}`. The resulting public URLs are saved in Firestore. The first image is the card image; all images appear in the product details gallery.

If the catalog is empty, use **Load starter catalog** once from the admin page. Do not press it twice or it will duplicate the seed records.

## 3. Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. In Vercel **Settings > Environment Variables**, add all six `NEXT_PUBLIC_FIREBASE_*` values from `.env.local` for Preview and Production.
4. Redeploy. The admin page is `https://your-domain.com/admin`.

Firestore listeners make public changes appear immediately while a visitor has the page open. The public page keeps its starter catalog only until Firebase is configured and seeded.

## Safe editing boundaries

- Safe for the owner: product records and image uploads in `/admin`.
- Developer-only: `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, and `components/ui/`. These define the public layout and visual system and should not be edited for routine catalog changes.
- Data plumbing: `lib/products.ts` and `lib/firebase.ts`. Leave these alone unless changing the product fields or Firebase integration.
- Admin code: `app/admin/page.tsx`. It is separate from the public page, but should only be changed when changing dashboard behavior.

Never put a Firebase private service-account key in `.env.local`, Vercel, or browser code. The `NEXT_PUBLIC_*` values are web-app identifiers, not private server credentials.
