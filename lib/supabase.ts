import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

export const supabaseReady = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = supabaseReady ? createClient(supabaseUrl!, supabaseAnonKey!) : null

export function verifySupabaseConfiguration() {
  const result = { ready: supabaseReady, url: Boolean(supabaseUrl), anonKey: Boolean(supabaseAnonKey) }
  console.log('[Supabase] configuration', { ...result, urlValue: supabaseUrl ? `${supabaseUrl.slice(0, 28)}...` : undefined })
  return result
}

export async function uploadProductImage(file: File, productId: string) {
  console.log('[Supabase] upload started', { productId, name: file.name, type: file.type, size: file.size })
  if (!supabase) throw new Error('Supabase is not configured.')
  if (!file.type.startsWith('image/')) throw new Error('Only image files can be uploaded.')
  if (file.size > 10 * 1024 * 1024) throw new Error('Images must be smaller than 10 MB.')

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
  const path = `products/${productId}/${Date.now()}_${safeName}.jpg`
  console.log('[Supabase] uploading to product-images', { path })
  const { error } = await supabase.storage.from('product-images').upload(path, blob, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
    upsert: false,
  })

  if (error) {
    console.error('[Supabase] upload failed', error)
    const message = error.message.toLowerCase()
    if (message.includes('bucket not found') || message.includes('nosuchbucket')) {
      throw new Error('Supabase bucket "product-images" was not found in this project. Create a public bucket with that exact name in Supabase Storage, then try again.')
    }
    if (message.includes('failed to fetch')) {
      throw new Error('Supabase could not be reached. Check that NEXT_PUBLIC_SUPABASE_URL is the active project URL and that the project is not paused.')
    }
    throw new Error(`Supabase image upload failed: ${error.message}`)
  }
  const publicUrl = supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl
  console.log('[Supabase] upload complete', { path, publicUrl })
  return publicUrl
}
