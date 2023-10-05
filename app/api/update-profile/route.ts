import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { password, name, imageUrl, user_id } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(imageUrl)
  const userAccount = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      name: name,
      image: imageUrl,
      hashedPassword,
    },
  });

  return NextResponse.json(userAccount);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  console.log(JSON.stringify(body))
  const { user_id } = body;
  const userAccount = await prisma.user.delete({
    where: {
      id: user_id,
    }
  });

  return NextResponse.json(userAccount);
}