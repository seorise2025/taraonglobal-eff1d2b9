import * as React from 'react'
import { render } from '@react-email/render'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

// Public route: /api/public/notify-admin
// Called from the client after a successful enquiry or order insert.
// Validates the reference against the database (must exist and be recent),
// then enqueues an admin alert email to info@taraonglobal.com.
// The admin's WhatsApp number is included as a click-to-reply link inside
// the email since automated WhatsApp sending requires a provider API.

const SITE_NAME = 'taraonglobal'
const SENDER_DOMAIN = 'notify.taraonglobal.com'
const FROM_DOMAIN = 'taraonglobal.com'
const ADMIN_WHATSAPP = '916359193666'
const TEMPLATE_NAME = 'admin-alert'
const RECENT_WINDOW_MINUTES = 15

const schema = z.object({
  kind: z.enum(['order', 'enquiry']),
  reference: z.string().trim().min(3).max(80),
})

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function buildWaText(payload: Record<string, string>) {
  const lines = [
    `${payload.kind === 'order' ? 'Bulk order' : 'Enquiry'} follow up, TARAON GLOBAL`,
    payload.reference ? `Ref: ${payload.reference}` : '',
    payload.productName ? `Product: ${payload.productName}` : '',
    payload.customerName ? `Customer: ${payload.customerName}` : '',
    payload.phone ? `Phone: ${payload.phone}` : '',
  ].filter(Boolean)
  return lines.join('\n')
}

export const Route = createFileRoute('/api/public/notify-admin')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server not configured' }, { status: 500 })
        }

        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }
        const parsed = schema.safeParse(body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid payload' }, { status: 400 })
        }
        const { kind, reference } = parsed.data

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const sinceIso = new Date(Date.now() - RECENT_WINDOW_MINUTES * 60_000).toISOString()

        let templateData: Record<string, any> = {}

        if (kind === 'order') {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('order_number', reference)
            .gte('created_at', sinceIso)
            .maybeSingle()
          if (error || !data) {
            return Response.json({ error: 'Reference not found' }, { status: 404 })
          }
          templateData = {
            kind: 'order',
            reference: data.order_number,
            productName: data.product_name,
            customerName: data.customer_name,
            company: data.company,
            phone: data.phone,
            whatsapp: data.whatsapp ?? '',
            email: data.email ?? '',
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            buyerType: data.buyer_type,
            quantity: data.bags ? `${data.bags} bags (25 Kg)` : '',
            notes: data.notes ?? '',
            fields: [
              data.gst_number ? { label: 'GST', value: data.gst_number } : null,
              data.po_reference ? { label: 'PO ref', value: data.po_reference } : null,
              data.required_delivery_date
                ? { label: 'Required by', value: data.required_delivery_date }
                : null,
            ].filter(Boolean),
          }
        } else {
          const { data, error } = await supabase
            .from('enquiries')
            .select('*')
            .eq('reference_number', reference)
            .gte('created_at', sinceIso)
            .maybeSingle()
          if (error || !data) {
            return Response.json({ error: 'Reference not found' }, { status: 404 })
          }
          templateData = {
            kind: 'enquiry',
            reference: data.reference_number,
            productName: data.product_needed,
            customerName: data.name,
            company: data.company ?? '',
            phone: data.phone,
            whatsapp: data.whatsapp ?? '',
            email: data.email ?? '',
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            buyerType: data.buyer_type,
            quantity: data.quantity,
            notes: data.message ?? '',
            fields: [
              data.gst_number ? { label: 'GST', value: data.gst_number } : null,
              data.monthly_requirement
                ? { label: 'Monthly qty', value: data.monthly_requirement }
                : null,
              data.expected_order_date
                ? { label: 'Order by', value: data.expected_order_date }
                : null,
            ].filter(Boolean),
          }
        }

        const waText = buildWaText({
          kind,
          reference: String(templateData.reference ?? ''),
          productName: String(templateData.productName ?? ''),
          customerName: String(templateData.customerName ?? ''),
          phone: String(templateData.phone ?? ''),
        })
        templateData.waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(waText)}`

        const template = TEMPLATES[TEMPLATE_NAME]
        if (!template) {
          return Response.json({ error: 'Template missing' }, { status: 500 })
        }
        const effectiveRecipient = template.to!
        const normalizedEmail = effectiveRecipient.toLowerCase()

        // Suppression check
        const { data: suppressed } = await supabase
          .from('suppressed_emails')
          .select('id')
          .eq('email', normalizedEmail)
          .maybeSingle()
        if (suppressed) {
          return Response.json({ success: false, reason: 'email_suppressed' })
        }

        // Get or create unsubscribe token
        let unsubscribeToken: string
        const { data: existingToken } = await supabase
          .from('email_unsubscribe_tokens')
          .select('token, used_at')
          .eq('email', normalizedEmail)
          .maybeSingle()
        if (existingToken && !existingToken.used_at) {
          unsubscribeToken = existingToken.token
        } else {
          unsubscribeToken = generateToken()
          await supabase
            .from('email_unsubscribe_tokens')
            .upsert(
              { token: unsubscribeToken, email: normalizedEmail },
              { onConflict: 'email', ignoreDuplicates: true },
            )
          const { data: stored } = await supabase
            .from('email_unsubscribe_tokens')
            .select('token')
            .eq('email', normalizedEmail)
            .maybeSingle()
          if (stored?.token) unsubscribeToken = stored.token
        }

        const element = React.createElement(template.component, templateData)
        const html = await render(element)
        const plainText = await render(element, { plainText: true })
        const resolvedSubject =
          typeof template.subject === 'function'
            ? template.subject(templateData)
            : template.subject

        const messageId = crypto.randomUUID()
        const idempotencyKey = `admin-alert-${kind}-${reference}`

        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
          recipient_email: effectiveRecipient,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: effectiveRecipient,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject: resolvedSubject,
            html,
            text: plainText,
            purpose: 'transactional',
            label: TEMPLATE_NAME,
            idempotency_key: idempotencyKey,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        })

        if (enqueueError) {
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: effectiveRecipient,
            status: 'failed',
            error_message: 'Failed to enqueue admin alert',
          })
          return Response.json({ error: 'Failed to enqueue' }, { status: 500 })
        }

        return Response.json({ success: true })
      },
    },
  },
})
