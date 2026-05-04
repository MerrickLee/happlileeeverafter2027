// app/api/rsvp/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 1. Integration with GoHighLevel (GHL)
    // We can use a Webhook or the GHL API directly.
    // For now, we'll log it and simulate a successful integration.
    console.log('GHL RSVP Integration:', body)
    
    /* 
    Example GHL API Call:
    await fetch('https://services.leadconnectorhq.com/hooks/...', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    */

    // 2. Email notification via Resend
    if (resend && process.env.NOTIFICATION_EMAIL) {
      await resend.emails.send({
        from: 'rsvp@happileeeverafter2027.com',
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New RSVP: ${body.name} for ${body.event}`,
        html: `
          <h2>New RSVP Received</h2>
          <p><strong>Event:</strong> ${body.event}</p>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Attending:</strong> ${body.attending}</p>
          <p><strong>Guests:</strong> ${body.guests}</p>
          <p><strong>Address:</strong> ${body.address}</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
