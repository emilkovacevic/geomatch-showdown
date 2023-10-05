"use client";

import axiosInstance from "@/axios/instance";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { signOut } from "next-auth/react";

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

interface DeleteProfileProps {
  user_id: string;
}

const DeleteProfile = ({ user_id }: DeleteProfileProps) => {
  const { toast } = useToast();
  const handleDeleteProfile = () => {
    axiosInstance
      .delete("/api/update-profile", {
        data: { user_id },
      })
      .then(() => {
        toast({
          title: "Profile Deleted",
          description: `Your profile has been deleted and can not be accessed anymore.`,
        });
        signOut();
      })
      .catch(() => {
        toast({
          title: "Profile Deletedion Failed",
          description: `Something went wrong, if the issue persists contact us.`,
        });
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger><Button variant={"destructive"}>Delete</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProfile}>
            Delete Profile
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProfile;
