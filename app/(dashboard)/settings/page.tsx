"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Camera, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const updateProfileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50).optional(),
    avatar: z
      .instanceof(File)
      .refine((file) => file.size <= 2 * 1024 * 1024, "Avatar must be 2MB or less")
      .refine((file) => file.type.startsWith("image/"), "Avatar must be an image file")
      .optional(),
  })
  .refine((data) => data.name || data.avatar, {
    message: "At least one field must be provided",
  });

type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof AxiosError && typeof error.response?.data === "object") {
    const data = error.response.data as { message?: string };
    return data.message || fallback;
  }

  return fallback;
};

export default function SettingsPage() {
  const { deleteAccount, updateProfile, user } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  useEffect(() => {
    reset({ name: user?.name });
  }, [reset, user?.name]);

  const avatarPreview = useMemo(() => {
    if (!avatarFile) {
      return user?.avatarUrl || "";
    }

    return URL.createObjectURL(avatarFile);
  }, [avatarFile, user?.avatarUrl]);

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarFile) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarFile, avatarPreview]);

  const onSubmit = async (values: UpdateProfileValues) => {
    setMessage("");
    setErrorMessage("");

    try {
      await updateProfile({
        name: values.name,
        avatar: avatarFile,
      });
      setAvatarFile(undefined);
      setMessage("Profile updated successfully.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Profile update failed"));
    }
  };

  const onDeleteAccount = async () => {
    const confirmed = window.confirm("This will permanently delete your account. This cannot be undone.");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteAccount();
    } catch (error) {
      setIsDeleting(false);
      setErrorMessage(getErrorMessage(error, "Account deletion failed"));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile and account access.</p>
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-base font-semibold">Profile</h3>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar className="size-20">
              {avatarPreview && <AvatarImage src={avatarPreview} alt={user?.name || "Avatar"} />}
              <AvatarFallback>{user ? getInitials(user.name) : "WN"}</AvatarFallback>
            </Avatar>
            <div>
              <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-border px-3 text-sm font-medium transition hover:bg-muted">
                <Camera className="size-4" />
                Upload avatar
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setAvatarFile(file);
                    setValue("avatar", file, { shouldValidate: true });
                    setMessage("");
                    setErrorMessage("");
                  }}
                />
              </label>
              <p className="mt-2 text-xs text-muted-foreground">PNG, JPG, or WebP up to 2MB.</p>
            </div>
          </div>

          <div className="max-w-md space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            {errors.root && <p className="text-xs text-destructive">{errors.root.message}</p>}
          </div>

          {message && <p className="rounded-md bg-primary/10 p-3 text-sm text-primary">{message}</p>}
          {errorMessage && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{errorMessage}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </section>

      <section className="rounded-lg border border-destructive/30 bg-card p-6">
        <h3 className="text-base font-semibold text-destructive">Danger zone</h3>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Delete your account and permanently remove your user record from WorkNest.
        </p>
        <Button
          type="button"
          variant="destructive"
          className="mt-4"
          disabled={isDeleting}
          onClick={() => void onDeleteAccount()}
        >
          <Trash2 className="size-4" />
          {isDeleting ? "Deleting..." : "Delete account"}
        </Button>
      </section>
    </div>
  );
}
