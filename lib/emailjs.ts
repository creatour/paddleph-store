import emailjs from '@emailjs/browser'

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() ?? ''
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() ?? ''
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ?? ''

export const emailjsReady = Boolean(serviceId && templateId && publicKey)

export async function sendContactMessage(values: { name: string; email: string; message: string; productName?: string }) {
  console.log('[EmailJS] send started', { ...values, configured: emailjsReady })
  if (!emailjsReady) throw new Error('EmailJS is not configured. Add the three NEXT_PUBLIC_EMAILJS_* variables and restart Next.js.')

  const response = await emailjs.send(serviceId, templateId, {
    name: values.name,
    email: values.email,
    message: values.message,
    product_name: values.productName || 'General inquiry',
    to_email: 'artmiracle65@gmail.com',
  }, { publicKey })
  console.log('[EmailJS] send complete', { status: response.status, text: response.text })
  return response
}
