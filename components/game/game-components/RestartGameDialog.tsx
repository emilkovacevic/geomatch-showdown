import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useGameState from "@/store/game-store";
import { RotateCcw } from "lucide-react";

interface RestartGameDialogProps {
  restartAlert: boolean;
  setRestartAlert: (restartAlert: boolean) => void;
  setLocalTimer: (timer: number) => void;
}

const RestartGameDialog = ({
  restartAlert,
  setRestartAlert,
  setLocalTimer,
}: RestartGameDialogProps) => {
  const { setGameTimer, setGameStarted, togglePauseGame, setTimesPaused } =
    useGameState();

  const restartGame = () => {
    setRestartAlert(true);
    setGameTimer(0);
    setGameStarted(false)
    setTimesPaused(0);
    togglePauseGame();
    setRestartAlert(false);
    setLocalTimer(0);
  };

  return (
    <AlertDialog open={restartAlert}>
      <AlertDialogTrigger >
        <Button
        variant={"game_option"}
        onClick={() => setRestartAlert(true)}><RotateCcw className="mr-2"/>Restart</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to restart?</AlertDialogTitle>
          <AlertDialogDescription>
            Your current progress will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setRestartAlert(false)}>
            Go Back
          </AlertDialogCancel>
          <AlertDialogAction onClick={restartGame}>Restart</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RestartGameDialog;
