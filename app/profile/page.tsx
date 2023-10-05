import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { formatDate } from "@/lib/format-iso-date";
import EditProfile from "@/components/profile/EditProfile";
import { redirect } from "next/navigation";
import DeleteProfile from "@/components/profile/DeleteProfile";

const page = async () => {
  const session = await getServerSession();
  if (!session?.user.email) redirect("/");
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });
  if (!user)
    return (
      <main className="grow">
        <h1>User not found</h1>
      </main>
    );
  return (
    <main className="grow">
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-md mx-auto overflow-hidden rounded-lg shadow-lg bg-foreground">
          <div className="bg-primary">
            <Image
              src={user?.image || "/profile.jpg"}
              alt={user?.name || "user"}
              width={220}
              height={220}
              className="object-contain w-full h-fit max-h-64"
            />
          </div>
          <div className="px-6 py-4 text-card-foreground bg-card">
            <h3 className="text-xl font-semibold">
              Player Profile Information
            </h3>
            <ul className="mt-4">
              <li className="flex items-center justify-between py-2 border-t border-gray-300">
                <span>Name:</span>
                <span>{user?.name}</span>
              </li>
              <li className="flex items-center justify-between py-2 border-t border-gray-300">
                <span>Email:</span>
                <span>{user?.email}</span>
              </li>
              <li className="flex items-center justify-between py-2 border-t border-gray-300">
                <span>Top Score:</span>
                <span>0</span>
              </li>
              <li className="flex items-center justify-between py-2 border-t border-gray-300">
                <span>Last update:</span>
                <span>
                  {user?.updatedAt
                    ? formatDate(user?.updatedAt.toISOString())
                    : "NAN"}
                </span>
              </li>
              <li className="flex items-center justify-between py-2 border-t border-gray-300">
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
      </div>
    </main>
  );
};

export default page;
