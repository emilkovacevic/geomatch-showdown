import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { password, name, imageUrl, user_id } = body;

  // Check if password is provided and hash it if it is
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  const userAccount = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      name: name !== undefined ? name : undefined,
      image: imageUrl !== undefined ? imageUrl : undefined,
      hashedPassword: hashedPassword !== undefined ? hashedPassword : undefined,
    },
  });

  return NextResponse.json(userAccount);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  console.log(JSON.stringify(body));
  const { user_id } = body;
  const userAccount = await prisma.user.delete({
    where: {
      id: user_id,
    },
  });

  return NextResponse.json(userAccount);
}
