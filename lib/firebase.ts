import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'
import type { Product } from './products'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId)
const app = firebaseReady ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null

export function subscribeToProducts(onProducts: (products: Product[]) => void) {
  if (!db) return () => undefined
  return onSnapshot(collection(db, 'products'), (snapshot) => {
    onProducts(snapshot.docs.map((item) => {
      const data = item.data() as Partial<Product>
      return { ...data, id: item.id, images: data.images?.length ? data.images : data.image ? [data.image] : [], stock: data.stock ?? (data.inStock === false ? 'Out of Stock' : 'In Stock'), bestSeller: data.bestSeller ?? false, createdAt: data.createdAt ?? 0 } as Product
    }).sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)))
  })
}

export async function createProduct(product: Omit<Product, 'id'>) {
  if (!db) throw new Error('Firebase is not configured.')
  const record = await addDoc(collection(db, 'products'), { ...product, image: product.images?.[0] ?? '', createdAt: Date.now() })
  return record.id
}

export async function updateProduct(product: Product) {
  if (!db) throw new Error('Firebase is not configured.')
  const { id, ...data } = product
  await updateDoc(doc(db, 'products', id), data)
}

export async function removeProduct(id: string) {
  if (!db) throw new Error('Firebase is not configured.')
  await deleteDoc(doc(db, 'products', id))
}

