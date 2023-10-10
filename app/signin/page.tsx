"use client";

import { useRouter, redirect } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Separator } from "@/components/ui/separator"
import Input from "@/components/Input";
import { useState } from "react";

interface LoginData {
  email: string;
  password: string;
}

const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

const SignIn = () => {
  const { data: session } = useSession();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema) });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        setErrorMessage(null);
      }
    } catch (error: any) {
      setErrorMessage(error?.message);
    }
  };

  if (session) redirect("/");

  return (
    <main className="flex items-center justify-center my-10 text-center">
      <div className="w-full px-8 pt-6 pb-8 mb-4 rounded shadow-md bg-card text-foreground md:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-4">Sign In</h1>
          {errorMessage && (
            <div className="my-2 text-red-500">Bad credentials</div>
          )}
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

          <div>
            <button
              type="submit"
              className="w-full p-2 font-bold border rounded-sm text-primary-foreground bg-primary hover:bg-secondary"
            >
              Login
            </button>
          </div>

          <div className="mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="mx-2 underline text-secondary dark:text-primary"
            >
              Register
            </Link>
          </div>
        </form>
        <div>
        <Separator className="my-8"/>
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
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
