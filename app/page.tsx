import LeaderBoard from "@/components/aside/LeaderBoard";
import GameStartMenu from "@/components/game/game-components/StartMenu";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 mx-auto my-10 lg:flex-row grow">
      <main className="flex flex-col items-start shadow-md sm:ml-2 bg-card">
        <GameStartMenu/>
      </main>
      <aside>
        <LeaderBoard />
      </aside>
    </div>
  );
}
