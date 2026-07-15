import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface AdminAlertProps {
  kind?: 'order' | 'enquiry'
  reference?: string
  subjectLine?: string
  productName?: string
  customerName?: string
  company?: string
  phone?: string
  whatsapp?: string
  email?: string
  city?: string
  state?: string
  pincode?: string
  buyerType?: string
  quantity?: string
  notes?: string
  waLink?: string
  fields?: Array<{ label: string; value: string }>
}

const AdminAlertEmail = ({
  kind = 'enquiry',
  reference = '',
  productName = '',
  customerName = '',
  company = '',
  phone = '',
  whatsapp = '',
  email = '',
  city = '',
  state = '',
  pincode = '',
  buyerType = '',
  quantity = '',
  notes = '',
  waLink = '',
  fields = [],
}: AdminAlertProps) => {
  const heading = kind === 'order' ? 'New bulk order requirement' : 'New enquiry'
  const previewText = `${heading}${reference ? ` (${reference})` : ''}${productName ? `, ${productName}` : ''}`
  const rows: Array<{ label: string; value: string }> = [
    { label: 'Reference', value: reference },
    { label: 'Product', value: productName },
    { label: 'Quantity', value: quantity },
    { label: 'Name', value: customerName },
    { label: 'Company', value: company },
    { label: 'Buyer type', value: buyerType },
    { label: 'Phone', value: phone },
    { label: 'WhatsApp', value: whatsapp },
    { label: 'Email', value: email },
    { label: 'Location', value: [city, state, pincode].filter(Boolean).join(', ') },
    ...fields,
  ].filter((r) => r.value && r.value.trim().length > 0)

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{heading}</Heading>
          {reference ? (
            <Text style={refText}>
              Reference: <strong>{reference}</strong>
            </Text>
          ) : null}
          <Section style={card}>
            {rows.map((r) => (
              <Text key={r.label} style={row}>
                <span style={rowLabel}>{r.label}</span>
                <span style={rowValue}>{r.value}</span>
              </Text>
            ))}
          </Section>
          {notes ? (
            <Section style={notesCard}>
              <Text style={notesLabel}>Notes</Text>
              <Text style={notesText}>{notes}</Text>
            </Section>
          ) : null}
          {waLink ? (
            <Text style={ctaWrap}>
              <Link href={waLink} style={ctaLink}>
                Reply on WhatsApp
              </Link>
            </Text>
          ) : null}
          <Hr style={hr} />
          <Text style={footer}>
            Sent automatically by taraonglobal.com when a form was submitted.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: AdminAlertEmail,
  subject: (data: Record<string, any>) => {
    const kind = data.kind === 'order' ? 'Bulk order' : 'Enquiry'
    const ref = data.reference ? ` ${data.reference}` : ''
    const product = data.productName ? `, ${data.productName}` : ''
    return `${kind}${ref}${product}`.trim()
  },
  displayName: 'Admin alert',
  to: 'info@taraonglobal.com',
  previewData: {
    kind: 'enquiry',
    reference: 'ENQ-2026-0001',
    productName: 'Super Potassium Shiny Flakes 98%',
    customerName: 'Jane Doe',
    company: 'Acme Agri',
    phone: '+91 90000 00000',
    whatsapp: '+91 90000 00000',
    email: 'buyer@example.com',
    city: 'Rajkot',
    state: 'Gujarat',
    pincode: '360001',
    buyerType: 'Dealer',
    quantity: '5 tons',
    notes: 'Needs dispatch by month end.',
    waLink: 'https://wa.me/916359193666',
  },
} satisfies TemplateEntry

export default AdminAlertEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 24px', maxWidth: '600px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#0F3D2E',
  margin: '0 0 8px',
}
const refText = { fontSize: '14px', color: '#55575d', margin: '0 0 16px' }
const card = {
  backgroundColor: '#F5F1E8',
  borderRadius: '6px',
  padding: '16px 18px',
  border: '1px solid #e6dfcc',
}
const row = {
  fontSize: '14px',
  color: '#1a1a1a',
  margin: '0 0 6px',
  lineHeight: '1.5',
}
const rowLabel = {
  display: 'inline-block',
  minWidth: '110px',
  color: '#55575d',
  fontWeight: 600 as const,
}
const rowValue = { color: '#1a1a1a' }
const notesCard = {
  marginTop: '14px',
  backgroundColor: '#ffffff',
  border: '1px solid #e6dfcc',
  borderRadius: '6px',
  padding: '12px 14px',
}
const notesLabel = {
  fontSize: '12px',
  color: '#0F3D2E',
  fontWeight: 700 as const,
  margin: '0 0 4px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}
const notesText = { fontSize: '14px', color: '#1a1a1a', margin: 0, lineHeight: '1.5' }
const ctaWrap = { margin: '20px 0 0' }
const ctaLink = {
  backgroundColor: '#0F3D2E',
  color: '#F5F1E8',
  fontSize: '14px',
  fontWeight: 600 as const,
  borderRadius: '4px',
  padding: '10px 18px',
  textDecoration: 'none',
  display: 'inline-block',
}
const hr = { borderColor: '#e6dfcc', margin: '24px 0 12px' }
const footer = { fontSize: '12px', color: '#999999', margin: 0 }
