"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useGameState from "@/store/game-store";
import { formatTime } from "@/lib/format-time";
import GameBoard from "@/components/game/game-components/GameBoard";
import NoUserWarning from "@/components/game/game-components/NoUserWarningDialog";
import RestartGameDialog from "@/components/game/game-components/RestartGameDialog";
import ClientOnly from "@/lib/client-only";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const GamePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const session = useSession();
  const [isNoUserWarningOpen, setIsNoUserWarningOpen] = useState(
    session.status == "unauthenticated"
  );
  const [restartAlert, setRestartAlert] = useState(false);
  const {
    gameOver,
    gameStarted,
    timesPaused,
    paused,
    redTimer,
    remainingCountries,
    setRedTimer,
    setGameStarted,
    togglePauseGame,
    setTimesPaused,
    setGameTimer,
    setGameOver,
  } = useGameState();

  const [timer, setLocalTimer] = useState<number>(0);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);

  const resetGame = () => {
    setGameStarted(false);
    setTimesPaused(0);
    setGameOver(false);
    setGameTimer(0);
    setRedTimer(false);
    setIsLoaded(true);
  };

  const startGame = () => {
    setGameStarted(true);
    setLocalTimer(0)
    if(paused){
      togglePauseGame()
    }
    setLastTimestamp(performance.now());
  };

  const handleTogglePauseGame = () => {
    if(timesPaused === 0 ){
      setTimesPaused(1)
      togglePauseGame()
    }
    if(paused){
      togglePauseGame()
    }
  };

    // reset game state on refresh
    useEffect(() => {
      resetGame()
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  useEffect(() => {
    let requestId: number | null = null;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) {
        setLastTimestamp(timestamp);
      } else {
        const deltaTime = timestamp - lastTimestamp;
        if (!paused) {
          setLocalTimer((prevTimer) => prevTimer + deltaTime / 1000);
        }
        setLastTimestamp(timestamp);
      }

      if (!gameOver && !paused) {
        requestId = requestAnimationFrame(animate);
      }
    };

    if (gameStarted) {
      requestId = requestAnimationFrame(animate);
    }

    if (gameOver && requestId !== null) {
      cancelAnimationFrame(requestId);
    }

    return () => {
      if (requestId !== null) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [gameStarted, gameOver, lastTimestamp, paused, remainingCountries, setLocalTimer]);

  if (!isLoaded) {
    return (
      <div className="relative flex flex-col justify-center h-full my-8 text-center grow">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  if (gameOver) {
    return (
      <main className="container relative flex flex-col justify-center h-full my-8">
        <div className="flex flex-col gap-4 p-8 mx-auto rounded bg-card">
          <h1 className="my-4 text-2xl text-accent">Congratulations!</h1>
          <p>You completed the game in {formatTime(timer)}</p>
          <div className="flex flex-wrap gap-4">
            {session.status === "authenticated" && (
              <div className="inline-flex items-center gap-4">
                <Button
                  onClick={() => router.push("/profile")}
                  variant={"game_option"}
                  className="my-4"
                >
                  See you&apos;r score board
                </Button>
                <div className="text-center ">or</div>
              </div>
            )}
            <Button
              onClick={resetGame}
              className="my-4"
              variant={"game_option"}
            >
              Play again
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
    >
      
      {gameStarted ? (
        <section 
        className="flex flex-col">
          <div className="sticky left-0 z-50 flex items-center justify-between w-full p-4 pt-2 bg-card top-14 ">
            <h1 className="text-lg md:text-2xl">
              <span
              className={`${redTimer ? "text-red-500" : ""}`}
              >
                {paused ? 'Game is paused' :
                <>
                <span>Uncovered Remaining: {remainingCountries} Countries</span> <br />
                 <span className={`hidden md:inline-block ${redTimer ? "text-red-500" : ""}`}>Elapsed Time:{" "}
                </span>
                {
                  formatTime(timer)
                }
                </>
                }
                </span>
              {redTimer ? (
                <span>
                 <span className="mx-4">:</span>
                  <span className="font-extrabold text-red-500">
                  GAME FROZEN! Penalty 5 seconds
                  </span>
                </span>
              ) : null}
            </h1>
            <div className="inline-flex items-center gap-4">
              <RestartGameDialog
                restartAlert={restartAlert}
                setRestartAlert={setRestartAlert}
                setLocalTimer={setLocalTimer}
              />
              <Button
                variant={"game_option"}
                disabled={timesPaused > 0 && !paused}
                onClick={handleTogglePauseGame}
              >
                {paused ? "Resume" : "Pause"}
              </Button>
            </div>
          </div>
          <div className="grow">
            <ClientOnly>
              <GameBoard elapsedTime={timer} />
            </ClientOnly>
          </div>
        </section>
      ) : (
        <section className="mt-32 text-center">
          <h1 className="my-4 text-4xl text-accent">Geomatch Showdown</h1>
          <Button
            className="px-10 py-8 mx-auto text-xl font-extrabold md:text-4xl w-fit rounded-xl text-primary-foreground bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={startGame}
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
