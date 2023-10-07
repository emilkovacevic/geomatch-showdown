"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import GameBoard from "@/components/game/game-components/GameBoard";
import { Button } from "@/components/ui/button";
import useGameState from "@/store/game-store";
import { formatTime } from "@/lib/format-time";
import NoUserWarning from "@/components/game/game-components/NoUserWarningDialog";
import RestartGameDialog from "@/components/game/game-components/RestartGameDialog";
import ClientOnly from "@/lib/client-only";

const GamePage = () => {
  const session = useSession();
  const [isNoUserWarningOpen, setIsNoUserWarningOpen] = useState(
    session.status == "unauthenticated"
  );

  const [restartAlert, setRestartAlert] = useState(false);
  const {
    gameOver,
    gamePaused,
    gameStarted,
    setGameStarted,
    setGamePaused,
  } = useGameState();

  const [timer, setLocalTimer] = useState<number>(0);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);

  const togglePauseGame = () => {
    setGamePaused(!gamePaused);
  };

  useEffect(() => {
    let requestId: number | null = null;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) {
        setLastTimestamp(timestamp);
      } else {
        const deltaTime = timestamp - lastTimestamp;
        if (!gamePaused) {
          setLocalTimer((prevTimer) => prevTimer + deltaTime / 1000);
        }
        setLastTimestamp(timestamp);
      }

      if (!gameOver && !gamePaused) {
        requestId = requestAnimationFrame(animate);
      }
    };

    if (gameStarted) {
      requestId = requestAnimationFrame(animate);
    }

    return () => {
      if (requestId !== null) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [gameStarted, gameOver, gamePaused, lastTimestamp]);

  if (gameOver)
    return (
      <main className="text-center">
        <p>
          Congratulations! You completed the game in {formatTime(timer)}.
        </p>
      </main>
    );

  return (
    <main className="container relative flex flex-col justify-center h-full my-8 grow">
      {gameStarted ? (
        <section className="flex flex-col">
          <div className="sticky top-0 left-0 z-50 flex justify-between w-full ">
            <h1 className="my-4 text-2xl">
              <span className="hidden md:inline-block">Elapsed Time:</span>{" "}
              {formatTime(timer)}
            </h1>
            <div className="inline-flex gap-4">
              <RestartGameDialog
                restartAlert={restartAlert}
                setRestartAlert={setRestartAlert}
                setLocalTimer={setLocalTimer}
              />
              <Button
                variant={"game_option"}
                onClick={togglePauseGame}
              >
                {gamePaused ? "Resume" : "Pause"}
              </Button>
            </div>
          </div>
          <div className="grow">
            <ClientOnly>
              <GameBoard />
            </ClientOnly>
          </div>
        </section>
      ) : (
        <section className="flex flex-col justify-center gap-4 text-center">
          <h1 className="my-4 text-4xl text-accent">Geomatch Showdown</h1>
          <Button
            className="px-10 py-8 mx-auto text-xl font-extrabold md:text-4xl w-fit rounded-xl text-primary-foreground bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setGameStarted(true)}
          >
            Start the Game
          </Button>
          <NoUserWarning
            isNoUserWarningOpen={isNoUserWarningOpen}
            setIsNoUserWarningOpen={setIsNoUserWarningOpen}
          />
        </section>
      )}
    </main>
  );
};

export default GamePage;
