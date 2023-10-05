import { Button } from "@/components/ui/button";

const GameStartMenu = () => {
  return (
    <div className="p-8">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Geomatch Showdown</h1>
        <p className="my-2 text-secondary-foreground opacity-95">Find the country-capital pair!</p>
      </section>
      <section className="mb-8">
        <h2 className="my-4 text-xl font-semibold">Game rules</h2>
        <ul className="space-y-1 tracking-wide list-disc list-inside">
          <li>Select the correct pairs</li>
          <li>Beat the other people&apos;s score</li>
          <li>Mismatch has a +5s penalty</li>
        </ul>
      </section>
      <section className="text-center">
        <Button className="w-full px-4 py-2 text-xl font-extrabold rounded-full text-primary-foreground bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent">
          Play
        </Button>
      </section>
    </div>
  );
};

export default GameStartMenu;
