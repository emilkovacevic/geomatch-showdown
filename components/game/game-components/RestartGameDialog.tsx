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
  const { setGameTimer, setGameStarted, setGamePaused, setTimesPaused } =
    useGameState();

  const restartGame = () => {
    setRestartAlert(true);
    setGameTimer(0);
    setGameStarted(false)
    setTimesPaused(0);
    setGamePaused(false);
    setRestartAlert(false);
    setLocalTimer(0);
  };

  return (
    <AlertDialog open={restartAlert}>
      <AlertDialogTrigger className="mb-16 md:mb-6">
        <Button
        variant={"game_option"}
        onClick={() => setRestartAlert(true)}>Restart</Button>
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
