"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={isVisible ? "text" : "password"}
        className="h-10 w-full rounded-md border border-input bg-background px-3 pr-10 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute right-1 top-1.5"
        onClick={() => setIsVisible((value) => !value)}
        aria-label={isVisible ? "Hide password" : "Show password"}
      >
        {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
    </div>
  );
}
