"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import Input from "@/components/Input";
import axiosInstance from "@/axios/instance";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

interface RegisterData {
  name: string;
  image: File | null;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});

const Register = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const storage = getStorage(app);
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(schema) });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("image", file);
  };

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    try {
      if (data?.image instanceof File) {
        const storageRef = ref(storage, `profile-images/${data.name}`);
        const uploadTask = uploadBytesResumable(storageRef, data.image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast({
              title: "Image Upload",
              description: `Upload is ${progress}% done`,
            });
          },
          (error) => {
            console.error("Error uploading image: ", error);
            toast({
              title: "Error uploading image",
              description: `Failed to upload the image, try using another image.`,
            });
          },
          async () => {
            const downloadURL = await getDownloadURL(storageRef);
            setImageUrl(downloadURL);
            await axiosInstance.post("/api/register", { ...data, imageUrl });
            router.push("/signin");
          }
        );
      } else {
        await axiosInstance.post("/api/register", data);
        toast({
            title: "Account created",
            description: `Please sign in`,
          });
        router.push("/signin");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to create the account.`,
      });
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <main className="flex items-center justify-center my-10 text-center grow">
      <div className="w-full px-8 pt-6 pb-8 mb-4 rounded shadow-md bg-card text-foreground md:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-4">Register</h1>
          {errors.confirmPassword && (
            <div className="my-2 text-red-500">
              {errors.confirmPassword.message}
            </div>
          )}

          <div className="mb-4">
            <Controller
              render={({ field }) => (
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  {...field}
                  error={errors.name?.message}
                />
              )}
              name="name"
              control={control}
              defaultValue=""
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={onImageChange}
            />
          </div>

          <div className="mb-4">
            <Controller
              render={({ field }) => (
                <Input
                  type="text"
                  id="email"
                  placeholder="Email"
                  {...field}
                  error={errors.email?.message}
                />
              )}
              name="email"
              control={control}
              defaultValue=""
            />
          </div>

          <div className="mb-4">
            <Controller
              render={({ field }) => (
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...field}
                  error={errors.password?.message}
                />
              )}
              name="password"
              control={control}
              defaultValue=""
            />
          </div>
          <div className="mb-4">
            <Controller
              render={({ field }) => (
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...field}
                  error={errors.confirmPassword?.message}
                />
              )}
              name="confirmPassword"
              control={control}
              defaultValue=""
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-2 font-bold border rounded-sm text-primary-foreground bg-primary hover:bg-secondary"
            >
              Register
            </button>
          </div>

          <div className="mt-8">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="mx-2 underline text-secondary dark:text-primary"
            >
              SignIn
            </Link>
          </div>
        </form>
        <Separator className="my-8" />
        <p className="my-4">Continue with</p>
        <button onClick={() => signIn("google")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 48 48"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </svg>
        </button>
      </div>
    </main>
  );
};

export default Register;
