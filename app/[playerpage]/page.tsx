import prisma from "@/lib/prisma";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatTime } from "@/lib/format-time";
import { formatDate } from "@/lib/format-iso-date";

export default async function Page({
  params,
}: {
  params: { playerpage: string };
}) {
  const player = await prisma.user.findUnique({
    where: {
      id: params.playerpage,
    },
    select: {
        name: true,
        image: true,
        score: true,
        updatedAt: true,
        scoreList:true
      },
  });

  if (!player) return <div>Player not found</div>;

  return (
    <div className="relative flex flex-wrap justify-center h-full gap-4 my-8">
      {/* Sidebar */}
      <aside className="sticky top-0 w-full p-4 shadow lg:w-1/4 bg-card">
  <div className="flex flex-col items-center space-y-4">
    <Image
      className="object-cover w-56 h-56 mx-auto"
      width={300}
      height={300}
      alt={player.name || ""}
      src={player.image || "/person.jpg"}
    />
    <section className="text-center lg:text-left">
      <h1 className="text-3xl font-bold">{player.name}</h1>
      <h2 className="text-lg font-semibold">Best Scores</h2>
      <div>Completed in: {formatTime(player.score)}</div>
      <div>Date: {formatDate(player.updatedAt.toISOString())}</div>
    </section>
  </div>
</aside>

      {/* Main content */}
      <main className="flex-1 w-full p-4 mt-2 shadow lg:mt-0 lg:w-3/4 bg-card">
          <section>
            <ScrollArea>
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Score list</h4>
                {player.scoreList.map((score) => (
                  <>
                    <div key={score.id} className="flex gap-4 text-sm">
                        
                      <div>
                      {formatTime(score.score)}
                      </div>
                      <div>
                        {formatDate(score.createdAt.toISOString())}
                      </div>
                    </div>
                    <Separator className="my-2" />
                  </>
                ))}
              </div>
            </ScrollArea>
          </section>
      </main>
    </div>
  );
}
