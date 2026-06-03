"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="dark">
        <main className="flex min-h-screen items-center justify-center bg-background">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </main>
      </div>
    );
  }

  return <>{children}</>;
}
