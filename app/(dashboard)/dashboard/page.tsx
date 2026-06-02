import { FolderKanban, ListChecks, Timer, Users } from "lucide-react";

const stats = [
  { label: "Active projects", value: "0", icon: FolderKanban },
  { label: "Open tasks", value: "0", icon: ListChecks },
  { label: "Team members", value: "1", icon: Users },
  { label: "Due soon", value: "0", icon: Timer },
];

export default function DashboardPage() {
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

      <section className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-base font-semibold">Next steps</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Project, task, dashboard analytics, and activity modules will populate this area as the next sessions are implemented.
        </p>
      </section>
    </div>
  );
}
