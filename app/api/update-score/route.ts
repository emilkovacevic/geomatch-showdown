import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { score, email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      scoreList: true
    }
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Create a new ScoreEntry with score and createdAt
  const newScoreEntry = await prisma.scoreEntry.create({
    data: {
      score,
      userId: user.id,
    },
  });

  // Update the scoreList by including the new score entry and sorting it
  const updatedScoreList = [...user.scoreList, newScoreEntry].sort((a, b) =>
    a.createdAt.getTime() - b.createdAt.getTime()
  );

  // Keep only the lowest score
  const lowestScore = updatedScoreList[0].score;

  const updatedUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      score: lowestScore,
    },
  });

  return NextResponse.json(updatedUser);
}
