import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      page = 1,
      perPage = 10,
      searchTerm = "",
      sortOrderTime = "asc",
      sortOrderScore = "asc"
    } = body.data;


    const userAccount = await prisma.user.findMany({
      orderBy: [
        {
          score: sortOrderScore,
        },
        {
          updatedAt: sortOrderTime,
        }
      ],
      where: {
        name: {
            contains: searchTerm,
            mode: 'insensitive',
      },
    },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        image: true,
        score: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(userAccount);

} catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
  
}
