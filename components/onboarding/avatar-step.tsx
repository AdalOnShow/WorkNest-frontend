"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

interface AvatarStepProps {
  onNext: () => void;
}

export function AvatarStep({ onNext }: AvatarStepProps) {
  const { user, updateProfile } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset input value so the same file can be re-selected after removal
    e.target.value = "";
    if (!file) return;

    setFileError("");

    if (!file.type.startsWith("image/")) {
      setFileError("Please select a valid image file (JPG, PNG, WebP, etc.).");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setFileError("File is too large. Maximum size is 2 MB.");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = async () => {
    if (fileError) return;

    if (selectedFile) {
      setIsUploading(true);
      try {
        await updateProfile({ avatar: selectedFile });
        onNext();
      } catch {
        setFileError("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    } else {
      onNext();
    }
  };

  const isBlocked = !!fileError || isUploading;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Add a profile photo
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Help your teammates recognize you. You can always change this later.
        </p>
      </div>

      {/* Avatar circle */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="group relative size-28 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-border bg-muted transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
        aria-label="Upload profile photo"
      >
        {preview ? (
          <img
            src={preview}
            alt="Avatar preview"
            className="size-full object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-2xl font-bold text-muted-foreground">
            {user ? getInitials(user.name) : "?"}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera className="size-6 text-white" />
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Inline error */}
      {fileError && (
        <p className="w-full rounded-md bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
          {fileError}
        </p>
      )}

      {/* Actions */}
      <div className="flex w-full flex-col items-center gap-3">
        <Button
          onClick={handleNext}
          disabled={isBlocked}
          className="h-10 w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Uploading…
            </>
          ) : (
            "Next →"
          )}
        </Button>

        <button
          type="button"
          onClick={onNext}
          disabled={isUploading}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
