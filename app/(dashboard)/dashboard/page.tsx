"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminDashboardPage from "./admin/page";
import { FolderKanban, ListChecks, Timer, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Active projects", value: "0", icon: FolderKanban },
  { label: "Open tasks", value: "0", icon: ListChecks },
  { label: "Team members", value: "1", icon: Users },
  { label: "Due soon", value: "0", icon: Timer },
];

export default function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === "ADMIN") {
    return <AdminDashboardPage />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your project workspace is ready.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <section key={stat.label} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className="size-4 text-primary" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{stat.value}</p>
          </section>
        ))}
      </div>

      <section className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-12 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
          <FolderKanban className="size-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Create your first project</h3>
        <p className="mb-6 mt-2 max-w-sm text-sm text-muted-foreground">
          Get started by creating a project to manage tasks, collaborate with your team, and track your progress.
        </p>
        <Button>
          <Plus className="mr-2 size-4" />
          Create Project
        </Button>
      </section>
    </div>
  );
}
