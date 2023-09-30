import LeaderBoard from "@/components/aside/LeaderBoard";
import GameBoard from "@/components/game/game-components/GameBoard";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 mx-auto my-10 lg:flex-row grow">
      <main className="flex flex-col p-2 shadow-md sm:ml-2 bg-card lg:flex-row">
        <GameBoard />
      </main>
      <aside>
        <LeaderBoard />
      </aside>
    </div>
  );
}
