import { EmailTemplate } from '../../components/email-template';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const d = await req.json();
    if (!d.email)
    {
        return NextResponse.json('no email provided')
    }

    const data = await resend.emails.send({
      from: 'Sentinel Africa Consulting <onboarding@resend.dev>',
      to: [d.email],
      subject: d.title,
      react: EmailTemplate({ title: d.title, description: d.description }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}