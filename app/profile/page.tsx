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
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    include: {
      scoreList: true,
    },
  });
  if (!user)
    return (
      <main className="container p-4 m-auto grow">
        <h1 className="text-xl font-semibold">User not found</h1>
      </main>
    );
  return (
    <main className="container my-10 overflow-hidden shadow-xl grow">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="py-4 overflow-hidden rounded-lg bg-card">
          
            <Image
              src={user?.image || "/person.jpg"}
              alt={user?.name || "user"}
              width={180}
              height={180}
              className="object-cover m-auto"
            />
        
          <div className="px-6 py-4 text-card-foreground bg-card">
            <h3 className="text-xl font-semibold">
              Player Profile Information
            </h3>
            <ul className="mt-4 space-y-6">
              <li className="flex items-center justify-between pt-4 border-t border-gray-300">
                <span>Name:</span>
                <span>{user?.name}</span>
              </li>
              <li className="flex items-center justify-between pt-4 border-t border-gray-300">
                <span>Email:</span>
                <span>{user?.email}</span>
              </li>
              <li className="flex items-center justify-between pt-4 border-t border-gray-300">
                <span>Top Score:</span>
                <span>{formatTime(user.score)}</span>
              </li>
              <li className="flex items-center justify-between pt-4 border-t border-gray-300">
                <span>Last update:</span>
                <span>
                  {user?.updatedAt
                    ? formatDate(user?.updatedAt.toISOString())
                    : "NAN"}
                </span>
              </li>
              <li className="flex items-center justify-between pt-4 border-t border-gray-300">
                <span>Member Since:</span>
                <span>
                  {user?.createdAt
                    ? formatDate(user?.createdAt.toISOString())
                    : "NAN"}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-between p-5 bg-card">
            <EditProfile user_id={user.id} />
            <DeleteProfile user_id={user.id} />
          </div>
        </div>
        <aside className="p-4 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Your time</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >    
                {user.scoreList.map((score) => (
                  <TableRow key={score.id}>
                    <TableCell>{formatTime(score.score)}</TableCell>
                    <TableCell className="text-right">
                      {formatDate(score.createdAt.toISOString())}
                    </TableCell>
                  </TableRow>
                ))}
    
            </TableBody>
          </Table>
        </aside>
      </div>
    </main>
  );
};

export default page;
