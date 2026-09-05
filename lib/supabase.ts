import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseReady = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = supabaseReady ? createClient(supabaseUrl!, supabaseAnonKey!) : null

export async function uploadProductImage(file: File, productId: string) {
  if (!supabase) throw new Error('Supabase is not configured.')

  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 800
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Could not prepare the image.')

  const scale = Math.max(800 / bitmap.width, 800 / bitmap.height)
  const width = bitmap.width * scale
  const height = bitmap.height * scale
  context.drawImage(bitmap, (800 - width) / 2, (800 - height) / 2, width, height)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => result ? resolve(result) : reject(new Error('Could not compress the image.')), 'image/jpeg', 0.84)
  })

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/\.\w+$/, '') || 'image'
  const path = `products/${Date.now()}_${safeName}.jpg`
  const { error } = await supabase.storage.from('product-images').upload(path, blob, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
    upsert: false,
  })

  if (error) throw new Error(`Supabase image upload failed: ${error.message}`)
  return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl
}
