"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

type RoleDemo = {
  email: string;
  password: string;
  label: string;
};

const DEMO_CREDENTIALS: ReadonlyArray<RoleDemo> = [
  {
    email: "admin@worknest.dev",
    password: "Admin@worknest8",
    label: "Admin",
  },
  {
    email: "jordan@worknest.dev",
    password: "PM@worknest8",
    label: "Project Manager",
  },
  {
    email: "skyler@worknest.dev",
    password: "TM@worknest8",
    label: "Team Member",
  },
];

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && typeof error.response?.data === "object") {
    const data = error.response.data as { message?: string };
    return data.message || "Login failed";
  }

  return "Login failed";
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    setFormError("");

    try {
      const loggedInUser = await login(values);
      router.replace("/dashboard");
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  return (
    <AuthShell
      title="Log in to WorkNest"
      description="Access your projects, tasks, and team workspace."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <PasswordInput id="password" autoComplete="current-password" {...register("password")} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        {formError && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{formError}</p>}

        <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowDemoCredentials((prev) => !prev)}
          className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground"
        >
          <span>Demo accounts</span>
          <span className="ml-2">{showDemoCredentials ? "Hide" : "Show"}</span>
        </button>

        {showDemoCredentials && (
          <div className="mt-2 flex flex-col gap-2">
            {DEMO_CREDENTIALS.map((credential) => (
              <Button
                key={credential.email}
                type="button"
                variant="outline"
                className="h-10 w-full"
                disabled={isSubmitting}
                onClick={() => {
                  setValue("email", credential.email);
                  setValue("password", credential.password);
                }}
              >
                {credential.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </AuthShell>
  );
}
