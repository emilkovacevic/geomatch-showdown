import LeaderBoard from "@/components/aside/LeaderBoard";
import GameStartMenu from "@/components/game/game-components/StartMenu";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 mx-auto my-6 grow">
      <header className="p-10 mb-4 text-center bg-card">
        <h1 className="text-3xl font-semibold text-accent">
          Geomatch Showdown
        </h1>
        <p className="my-2 text-primary opacity-95">
          Find the country-capital pairs!
        </p>
      </header>
      <main className="p-4 shadow-md bg-card">
        <div className="flex flex-wrap items-center ">
          <GameStartMenu />
          <div
          className="relative mx-auto border rounded"
          >
            <Image
              priority
              className="object-fill w-full h-full my-auto bg-transparent rounded"
              src="/world-image.png"
              alt="world cover image"
              width={800}
              height={450}
            />
            <div className="tracking-widest text-center">
              <Link
                href="/game"
                className="absolute z-50 px-10 py-4 text-xl font-extrabold -translate-x-1/2 -translate-y-1/2 w-fit top-1/2 left-1/2 md:px-24 md:py-6 rounded-xl text-primary-foreground bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Play!
              </Link>
            </div>
          </div>
        </div>
      </main>
      <aside>
        <LeaderBoard />
      </aside>
    </div>
  );
}
