"use client";

import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/hooks/useDashboard";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { RecentActivitySection } from "@/components/dashboard/recent-activity-section";
import AdminDashboardPage from "./admin/page";
import { FolderKanban } from "lucide-react";
import type { MemberDashboardData } from "@/types/dashboard.types";

function CurrentWorkingProjectCard({ data }: { data: MemberDashboardData }) {
  const project = data.currentWorkingProject;

  if (!project) {
    return (
      <section className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-2 text-sm font-semibold">Current working project</h3>
        <p className="text-sm text-muted-foreground">
          No active projects found in your scope.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Current working project</h3>
        <FolderKanban className="size-4 text-primary" />
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">
        {project.projectName}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{project.projectId}</p>
    </section>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useDashboard();

  if (user?.role === "ADMIN") {
    return <AdminDashboardPage />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back — here&apos;s your workspace overview.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="h-28 w-full rounded-lg border border-border bg-card" />
          <div className="h-80 w-full rounded-lg border border-border bg-card" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error instanceof Error ? error.message : "Failed to load dashboard data"}
        </div>
      ) : data ? (
        <>
          <DashboardStats data={data} />
          <DashboardCharts data={data} />

          {"myProjects" in data.stats ? (
            <CurrentWorkingProjectCard data={data as MemberDashboardData} />
          ) : null}

          <RecentActivitySection />
        </>
      ) : null}
    </div>
  );
}
