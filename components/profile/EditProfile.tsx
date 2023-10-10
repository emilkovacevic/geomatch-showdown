"use client";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axiosInstance from "@/axios/instance";
import { app } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";
import Input from "../Input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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

interface ProfileData {
  name: string  | null | undefined;
  imageUrl: string | null | undefined;
  password: string  | null | undefined;
  confirmPassword: string  | null | undefined;
}

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  imageUrl: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
});

const EditProfile = ({ user_id }: { user_id: string }) => {
  const [isSetEdit, setEditProfile] = useState(false);
  const router = useRouter()
  const storage = getStorage(app);
  const [file, setFile] = useState<File | null>(null); 
  const { toast } = useToast();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileData>({ resolver: zodResolver(schema) });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    } else {
      console.error("No file selected");
    }
  };

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password and Confirm Password do not match",
      });
      return; 
    }
  
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
  
      try {
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // ... (existing code for upload progress)
          },
          (error) => {
            console.error("Error uploading:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Check if imageUrl is empty before including it
              const requestData = {
                ...data,
                user_id,
              };
  
              if (downloadURL) {
                requestData.imageUrl = downloadURL;
              }
  
              axiosInstance
                .patch("/api/update-profile", requestData)
                .then((response) => {
                  toast({
                    title: "Account Updated",
                  });
                  reset();
                  setEditProfile(false);
                })
                .catch((error) => {
                  toast({
                    title: `Error updating profile: ${error}`,
                  });
                });
            });
          }
        );
      } catch (error) {
        console.error("Error during upload:", error);
      }
    } else {
      let requestData = {
        ...data,
        user_id,
      };
  
      if (!requestData.imageUrl) {
        requestData = {
          ...requestData,
          imageUrl: undefined,
        };
      }
  
      try {
        axiosInstance
          .patch("/api/update-profile", requestData)
          .then((response) => {
            toast({
              title: "Account Updated, refresh the page to see the changes",
            });
            reset();
            setEditProfile(false);
          })
          .catch((error) => {
            toast({
              title: `Error updating profile: ${error}`,
            });
          });
      } catch (error) {
        toast({
          title: `Error updating profile`,
        });
      }
    }
    router.refresh();
  };
  
  
  return (
    <div>
      {isSetEdit ? (
        <AlertDialog open={isSetEdit}>
          <AlertDialogTrigger>
            Update Profile
          </AlertDialogTrigger>
          <AlertDialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative p-4 space-y-4 shadow rounded-xl w-fit bg-card text-foreground"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 border">
              <p> Game avatar:</p>
              <Controller
                render={({ field }) => (
                  <Input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    error={errors.imageUrl?.message}
                  />
                )}
                name="imageUrl"
                control={control}
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    error={errors.name?.message}
                    placeholder="player name"
                  />
                )}
                name="name"
                control={control}
                defaultValue=""
              />
            </div>

            <div>
              <Controller
                render={({ field }) => (
                  <Input
                    type="password"
                    id="password"
                    placeholder="password"
                    {...field}
                    error={errors.password?.message}
                  />
                )}
                name="password"
                control={control}
                defaultValue=""
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="repeat password"
                    {...field}
                    error={errors.password?.message}
                  />
                )}
                name="confirmPassword"
                control={control}
                defaultValue=""
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button
                variant={"ghost"}
                onClick={() => {
                  setEditProfile(false);
                }}
              >
                Cancel
              </Button>
              <Button variant={"destructive"} type="submit">
                Submit
              </Button>
            </div>
          </form>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
          <Button
            variant={"game_option"}
            onClick={() => {
              setEditProfile(true);
            }}
          >
            Edit Profile
          </Button>
      )}
    </div>
  );
};

export default EditProfile;
