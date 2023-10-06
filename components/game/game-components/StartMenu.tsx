import { Button } from "@/components/ui/button";
import Link from "next/link";

const GameStartMenu = () => {
  return (
    <div className="p-4 mx-auto ">
      <section className="mb-4 text-center">
        <h1 className="text-3xl font-semibold text-accent">Geomatch Showdown</h1>
        <p className="my-2 text-secondary-foreground opacity-95">
          Find the country-capital pair!
        </p>
      </section>
      <section className="mb-10">
        <h2 className="my-4 text-xl font-semibold uppercase">Game rules</h2>
        <ul className="space-y-1 tracking-wide list-disc list-inside">
          <li>Select the correct country-capital pairs</li>
          <li>During the game you can pause the game only once</li>
          <li>Mismatch has a +5s penalty</li>
          <li>Beat other player&apos;s time</li>
          <li>When all pairs are found the time will be updated in you account</li>
          <li>The fastest 500 players are listed publicly</li>
          <li>
            Attempting to cheat will be detected and restart the game
            <ol className="mt-2 ml-6 space-y-1 tracking-wide list-decimal list-inside">
              <li>Do not use other tabs</li>
              <li>Do not click outside the game window</li>
              <li>Do not refresh the page</li>
              <li>Do not open development tools</li>
            </ol>
          </li>
        </ul>
      </section>
      <section>
        <Link
          href="/game"
          className="inline-flex justify-center w-full px-4 py-2 text-xl font-extrabold rounded-xl text-primary-foreground bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Play
        </Link>
      </section>
    </div>
  );
};

export default GameStartMenu;
