import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json('hello new')
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, name, image } = body

  const userAccount = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (userAccount?.id) {
    return NextResponse.json(
      {
        message: 'You already have an account',
      },
      {
        status: 400,
      },
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name: name,
      image: image,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}