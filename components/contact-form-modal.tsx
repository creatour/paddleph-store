'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import Swal from 'sweetalert2'
import { sendContactMessage } from '@/lib/emailjs'

type ContactFormModalProps = { productName?: string; onClose: () => void }
const initialForm = { name: '', email: '', message: '' }

export function ContactFormModal({ productName, onClose }: ContactFormModalProps) {
  const [form, setForm] = useState(initialForm)
  const [sending, setSending] = useState(false)
  const [mounted, setMounted] = useState(false)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setMounted(true)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !sending) onClose()
      if (event.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, input, textarea, select, [tabindex]:not([tabindex="-1"])')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = previousOverflow }
  }, [onClose, sending])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSending(true)
    try {
      await sendContactMessage({ ...form, productName })
      await Swal.fire({ icon: 'success', title: 'Message sent', text: 'We will get back to you soon.', timer: 1800, showConfirmButton: false, customClass: { popup: 'rounded-2xl shadow-2xl', confirmButton: 'rounded-lg bg-primary px-5 py-2.5' } })
      setForm(initialForm)
      onClose()
    } catch (error) {
      console.error('[Contact form] send failed', error)
      await Swal.fire({ icon: 'error', title: 'Could not send message', text: error instanceof Error ? error.message : 'Please try again.', customClass: { popup: 'rounded-2xl shadow-2xl', confirmButton: 'rounded-lg bg-primary px-5 py-2.5' } })
    } finally {
      setSending(false)
    }
  }

  if (!mounted) return null
  return createPortal(<div className="fixed inset-0 z-[60] flex min-h-0 items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={onClose} onKeyDown={(event) => event.stopPropagation()}>
    <form ref={modalRef} className="relative my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-background p-4 shadow-2xl sm:p-6" onSubmit={submit} onClick={(event) => event.stopPropagation()}>
      <button type="button" onClick={onClose} aria-label="Close contact form" className="sticky right-0 float-right z-10 rounded-full p-2 text-primary hover:bg-muted"><X className="size-5" /></button>
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Get in touch</p>
      <h2 id="contact-title" className="mt-2 text-2xl font-bold text-primary">Send us a message</h2>
      {productName && <p className="mt-2 text-sm text-muted-foreground">About: <span className="font-semibold text-foreground">{productName}</span></p>}
      <div className="mt-5 space-y-4">
        <input ref={firstFieldRef} required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="min-h-11 w-full rounded-md border border-border bg-background p-3" placeholder="Your name" aria-label="Your name" />
        <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="min-h-11 w-full rounded-md border border-border bg-background p-3" placeholder="your@email.com" aria-label="Your email" />
        <textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} onKeyDown={(event) => event.stopPropagation()} className="min-h-28 w-full resize-y rounded-md border border-border bg-background p-3" placeholder="Your message..." aria-label="Your message" />
      </div>
      <button type="submit" disabled={sending} className="mt-5 min-h-11 w-full rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:cursor-wait disabled:opacity-60">{sending ? 'Sending...' : 'Send Message'}</button>
    </form>
  </div>, document.body)
}
