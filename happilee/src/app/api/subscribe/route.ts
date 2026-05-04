// app/api/subscribe/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Integration with GoHighLevel (GHL)
    console.log('GHL Email Subscription Integration:', email)
    
    /* 
    Example GHL API Call:
    await fetch('https://services.leadconnectorhq.com/hooks/...', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, tags: ['happilee_newsletter'] }),
    })
    */

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
