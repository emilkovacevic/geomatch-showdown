"use client";
import React, { useState } from "react";
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

interface ProfileData {
  name: string;
  imageUrl: string | null;
  password: string;
  confirmPassword: string;
}

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  imageUrl: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
  confirmPassword: z.string(),
});

const EditProfile = ({ user_id }: { user_id: string }) => {
  const [isSetEdit, setEditProfile] = useState(false);
  const storage = getStorage(app);
  const [file, setFile] = useState<File | null>(null); // jpeg / png
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
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      try {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error("Error uploading:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Pass the downloadURL to the REST endpoint
              axiosInstance
                .post("/api/update-profile", {
                  ...data,
                  user_id,
                  imageUrl: downloadURL,
                })
                .then((response) => {
                  toast({
                    title: "Account Updated",
                  });
                  reset
                  setEditProfile(false)

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
      // Handle the case where no file is selected
      console.error("No file selected for upload");
    }
  };
  
  return (
    <div>
      {isSetEdit ? (
        <section className="absolute top-0 left-0 z-50 grid items-center justify-center w-full min-h-screen bg-black/50">
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
        </section>
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


// {
//   "gameStarted": true,
//   "gamePaused": false,
//   "timesPaused": 1,
//   "gameOver": false,
//   "gamePenaltyTime": 0,
//   "gameTimer": 65.40000000000056,
//   "penalty": 5,
//   "selectedCards": [],
//   "country": "",
//   "capital": "",
//   "isMatched": false,
//   "isSelected": false,
//   "matchedPairs": [],
//   "isSelectedPair": []
// }