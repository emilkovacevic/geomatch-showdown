import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { formatDate } from "@/lib/format-iso-date";
import EditProfile from "@/components/profile/EditProfile";
import { redirect } from "next/navigation";
import DeleteProfile from "@/components/profile/DeleteProfile";
import { formatTime } from "@/lib/format-time";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = async () => {
  const session = await getServerSession();
  if (!session?.user.email) redirect("/");
  const player = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    include: {
      scoreList: true,
    },
  });
  if (!player)
    return (
      <main className="p-4 m-auto grow">
        <h1 className="text-xl font-semibold">Player not found</h1>
      </main>
    );
  return (
    <div className="container flex flex-wrap justify-center h-full gap-4 my-8">
      {/* Sidebar */}
      <aside className="sticky left-0 w-full h-fit bg-card lg:w-1/4 top-10">
        <div className="flex flex-row gap-4 space-y-2 lg:flex-col">
          <Image
            className="object-cover w-56 h-full mx-auto mt-4"
            width={300}
            height={300}
            alt={player.name || ""}
            src={player.image || "/person.jpg"}
          />
          <section className="px-4 pb-4">
            <h1 className="mb-4 text-3xl font-bold">{player.name}</h1>
            <h2 className="my-2 text-lg font-semibold">
              Best Score {formatTime(player.score)}
            </h2>
            <div>Date: {formatDate(player.updatedAt.toISOString())}</div>
          </section>
        </div>
        <section className="flex justify-between p-4">
          <EditProfile user_id={player.id} />
          <DeleteProfile user_id={player.id} />
        </section>
      </aside>
      {/* Main content */}
      <main className="flex-1 w-full p-4 mt-2 lg:mt-0 lg:w-3/4 bg-card">
        <section>
          <ScrollArea>
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Score list
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Your time</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                {player.scoreList.map((score) => (
                  <TableBody key={score.id}>
                    <TableRow
                    className="cursor-pointer hover:bg-black/50"
                    >
                      <TableCell>{formatTime(score.score)}</TableCell>
                      <TableCell className="text-right">
                        {formatDate(score.createdAt.toISOString())}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </div>
          </ScrollArea>
        </section>
      </main>
    </div>
  );
};

export default page;
