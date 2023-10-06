"use client";

import GameBoard from "@/components/game/game-components/GameBoard";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import useGameState from "@/store/game-store";
import { formatTime } from "@/lib/format-time";
import NoUserWarning from "@/components/game/game-components/NoUserWarningDialog";
import RestartGameDialog from "@/components/game/game-components/RestartGameDialog";

const GamePage = () => {
  const session = useSession();
  const [isNoUserWarningOpen, setIsNoUserWarningOpen] = useState(
    session.status == "unauthenticated"
  );

  const [restartAlert, setRestartAlert] = useState(false);
  const {
    gameOver,
    gamePaused,
    gameTimer,
    timesPaused,
    gameStarted,
    setGameTimer,
    setGameStarted,
    setGamePaused,
    setTimesPaused,
  } = useGameState();

  const [timer, setLocalTimer] = useState<number>(60000);
  const startTimeRef = useRef<number | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const togglePauseGame = () => {
    if (timesPaused < 1 && !gamePaused) {
      setTimesPaused(1);
      setGamePaused(true);
    } else if (gamePaused === true) setGamePaused(false);
  };

  // game reinitialization on page remount / refresh
  useEffect(() => {
    setGameTimer(0);
    setGameStarted(false);
    setGamePaused(false);
    setTimesPaused(0);
    setLocalTimer(0);
  }, []);

  useEffect(() => {
    function startStopwatch() {
      if (intervalIdRef.current === null) {
        startTimeRef.current = Date.now() - timer * 1000;
        intervalIdRef.current = setInterval(updateStopwatch, 10);
      }
    }

    function stopStopwatch() {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }

    function updateStopwatch() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - (startTimeRef.current || 0);
      const seconds = (elapsedTime / 1000).toFixed(3);
      setLocalTimer(parseFloat(seconds));
    }
    if (gameStarted) startStopwatch();
    if (gameOver) stopStopwatch();
    if (gamePaused) stopStopwatch();

    return () => {
      stopStopwatch();
      setGameTimer(timer);
    };
  }, [timer, setGameTimer, gamePaused, gameStarted, gameOver]);

  if (gameOver)
    return (
      <main className="text-center">
        <p>
          Congratulations! You completed the game in {formatTime(gameTimer)}.
        </p>
      </main>
    );

  return (
    <main className="container flex flex-col justify-center my-8 grow">
      <div className="text-white"></div>
      {gameStarted ? (
        <section>
          <div className="flex justify-between">
            <h1 className="my-4 text-2xl">Elapsed Time: {formatTime(timer)}</h1>
            <div className="inline-flex gap-4">
              <RestartGameDialog
                restartAlert={restartAlert}
                setRestartAlert={setRestartAlert}
                setLocalTimer={setLocalTimer}
              />
              <Button
                variant={"game_option"}
                disabled={timesPaused > 0 && !gamePaused}
                onClick={togglePauseGame}
              >
                {gamePaused ? "Resume" : "Pause"}
              </Button>
            </div>
          </div>
          <GameBoard />
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
