// Disable @typescript-eslint/no-explicit-any rule for this block

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    if (!req || !req.headers) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    }

    if (req.method === 'POST') {
      const body = await req.json()
      const { name, title, email, message } = body
      if (!name || !title || !email || !message) {
        return NextResponse.json(
          { message: 'Incomplete input' },
          { status: 401 }
        )
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
          pass: process.env.NEXT_PUBLIC_NODEMAILER_PW
        },
        tls: {
          rejectUnauthorized: false
        }
      })

      const mailOptions = {
        from: email,
        to: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
        subject: `Message from ${name}: ${title}`,
        text: `${message}\n\n Sent from: ${email}`
      }

      try {
        await transporter.sendMail(mailOptions)
        return NextResponse.json(
          {
            message:
              'Email sent successfully! Thank you for reaching out. I will reply as soon as possible'
          },
          { status: 200 }
        )
      } catch (err: any) {
        return NextResponse.json({ message: err.toString() }, { status: 500 })
      }
    } else {
      return NextResponse.json(
        { message: 'Method not supported' },
        { status: 401 }
      )
    }
  } catch (err: any) {
    console.log(`send error: ${err}`)
    return NextResponse.json({ message: err.message, success: false })
  }
}

// Re-enable @typescript-eslint/no-explicit-any rule after the block