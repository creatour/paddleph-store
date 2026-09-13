'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import type { Product } from '@/lib/products'
import { ContactFormModal } from '@/components/contact-form-modal'

type ProductModalProps = { product: Product; index: number; setIndex: (index: number) => void; close: () => void }
const imagesFor = (product: Product) => product.images?.length ? product.images : product.image ? [product.image] : ['/images/paddle-carbon-blue.png']

export function ProductModal({ product, index, setIndex, close }: ProductModalProps) {
  const images = imagesFor(product)
  const [zoomed, setZoomed] = useState(false)
  const [showContact, setShowContact] = useState(false)
  return <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" onClick={close}>
      <div className="relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-background" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={close} aria-label="Close product details" className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-primary"><X className="size-5" /></button>
        <div className="grid md:grid-cols-2">
          <div className="relative bg-muted"><button type="button" onClick={() => setZoomed(true)} aria-label="Zoom product image" className="group relative block aspect-square w-full cursor-zoom-in"><img src={images[index]} alt={`${product.brand} ${product.name}`} className="size-full object-cover" /><span className="absolute bottom-3 right-3 rounded-full bg-black/60 p-2 text-white"><Maximize2 className="size-4" /></span></button><div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">{images.length > 1 && <button type="button" onClick={() => setIndex((index + images.length - 1) % images.length)} aria-label="Previous image" className="rounded-full bg-background/90 p-2"><ChevronLeft className="size-4" /></button>}<span className="rounded-full bg-background/90 px-3 py-2 text-xs font-semibold">{index + 1} / {images.length}</span>{images.length > 1 && <button type="button" onClick={() => setIndex((index + 1) % images.length)} aria-label="Next image" className="rounded-full bg-background/90 p-2"><ChevronRight className="size-4" /></button>}</div></div>
          <div className="p-5 sm:p-9"><p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{product.brand}</p><h2 className="mt-2 text-3xl font-bold text-primary">{product.name}</h2><p className="mt-3 text-2xl font-semibold text-primary">{product.price}</p><dl className="mt-6 grid grid-cols-2 gap-4 text-sm"><Detail label="Model" value={product.model} /><Detail label="Color" value={product.color} /><Detail label="Thickness" value={product.thickness} /><Detail label="Core" value={product.core} /><Detail label="Weight" value={product.weight} /><Detail label="Grip" value={product.grip} /></dl><div className="mt-7 flex gap-3"><button type="button" onClick={() => setShowContact(true)} className="min-h-11 flex-1 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">Message Us</button><button type="button" onClick={close} className="min-h-11 rounded-md border border-border px-4 py-3 text-sm font-semibold text-primary">Close</button></div></div>
        </div>
      </div>
    </div>
    {zoomed && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4" onClick={() => setZoomed(false)}><img src={images[index]} alt={`${product.brand} ${product.name}`} className="max-h-full max-w-full object-contain" /><button type="button" onClick={() => setZoomed(false)} aria-label="Close zoomed image" className="absolute right-4 top-4 rounded-full bg-white p-2 text-black"><X className="size-5" /></button></div>}
    {showContact && <ContactFormModal productName={product.name} onClose={() => setShowContact(false)} />}
  </>
}

function Detail({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs font-semibold uppercase text-muted-foreground">{label}</dt><dd className="mt-1 font-medium text-primary">{value}</dd></div> }
