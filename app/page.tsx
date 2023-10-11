import LeaderBoard from "@/components/aside/LeaderBoard";
import GameStartMenu from "@/components/game/game-components/StartMenu";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 my-6">
      <header className="py-10 mb-4 text-center shadow-md bg-card">
        <h1 className="text-3xl font-semibold text-accent">
          Geomatch Showdown
        </h1>
        <p className="my-2 text-primary opacity-95">
          Find the country-capital pairs!
        </p>
      </header>
      <main className="gap-10 p-4 shadow-md lg:flex bg-card">
          <GameStartMenu />
          <div
          className="relative mx-auto"
          >
            <Image
              priority
              className="object-cover w-full h-full my-auto bg-transparent rounded"
              src="/world-image.png"
              alt="world cover image"
              width={800}
              height={450}
            />
            <div className="absolute tracking-widest text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <Link
                href="/game"
                className="inline-flex items-center px-10 py-4 text-sm font-extrabold md:text-xl w-fit md:px-24 md:py-6 rounded-xl text-primary-foreground bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Play
                
                size={20}/> <span className="ml-2"> Play</span>
              </Link>
            </div>
          </div>
      </main>
      <aside>
        <LeaderBoard />
      </aside>
    </div>
  );
}
