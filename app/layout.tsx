import type { Metadata } from "next";
import { Providers } from "./providers";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
