import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface NoUserWarningProps {
  isNoUserWarningOpen: boolean;
  setIsNoUserWarningOpen: (isNoUserWarningOpen: boolean) => void;
}

const NoUserWarning = ({
  isNoUserWarningOpen,
  setIsNoUserWarningOpen,
}: NoUserWarningProps) => {
  const router = useRouter();
  return (
    <AlertDialog open={isNoUserWarningOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are not logged in</AlertDialogTitle>
          <AlertDialogDescription>
            You are free to play the game, but your score won&apos;t be recorded
            unless you are logged in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsNoUserWarningOpen(false)}>
            Let me play
          </AlertDialogCancel>
          <AlertDialogAction
          className="hover:bg-secondary"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Sign In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoUserWarning;
