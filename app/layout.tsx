import type { Metadata } from "next";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorkNest — Project & Task Collaboration Platform",
  description:
    "WorkNest is a modern project management and team collaboration platform. Manage projects, track tasks, monitor workloads, and boost team productivity.",
  keywords: [
    "project management",
    "task tracking",
    "team collaboration",
    "productivity",
    "worknest",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
