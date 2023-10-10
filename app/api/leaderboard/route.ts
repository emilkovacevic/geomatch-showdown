import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RequestBody {
  data: {
    page?: number;
    perPage?: number;
    searchTerm?: string;
    sortOrderTime?: "asc" | "desc" | undefined;
    sortOrderScore?: "asc" | "desc" | undefined;
  };
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const {
      page = 1,
      perPage = 10,
      searchTerm = "",
      sortOrderTime,
      sortOrderScore,
    } = body.data;

    const userCount = await prisma.user.count({ 
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    });

    const userAccount = await prisma.user.findMany({
      orderBy: [
        {
          score: sortOrderScore,
        },
        {
          updatedAt: sortOrderTime,
        },
      ],
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
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

    // Set the x-total-count header with the total count of users
    const headers = {
      "x-total-count": userCount.toString(),
    };

    return NextResponse.json(userAccount, { headers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
