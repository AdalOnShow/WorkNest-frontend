"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { AdminDashboardData, MemberDashboardData, PMDashboardData } from "@/types/dashboard.types";
import {
  CircleCheckBig,
  Circle,
  ClockAlert,
  FolderKanban,
  ListChecks,
  Users,
  UserCheck,
} from "lucide-react";

type DashboardStatsProps = {
  data: AdminDashboardData | PMDashboardData | MemberDashboardData;
};

const statsForAdminOrPM = (data: AdminDashboardData | PMDashboardData) => [
  { label: "Total Users", value: data.stats.totalUsers, icon: Users },
  { label: "Active Users", value: data.stats.activeUsers, icon: UserCheck },
  { label: "Total Projects", value: data.stats.totalProjects, icon: FolderKanban },
  { label: "Total Tasks", value: data.stats.totalTasks, icon: ListChecks },
  { label: "Completed", value: data.stats.completedTasks, icon: CircleCheckBig },
  { label: "Pending", value: data.stats.pendingTasks, icon: Circle },
  { label: "Overdue", value: data.stats.overdueTasks, icon: ClockAlert },
];

const statsForMember = (data: MemberDashboardData) => [
  { label: "My Projects", value: data.stats.myProjects, icon: FolderKanban },
  { label: "My Assigned Tasks", value: data.stats.myAssignedTasks, icon: ListChecks },
  { label: "My Completed Tasks", value: data.stats.myCompletedTasks, icon: CircleCheckBig },
  { label: "My Overdue Tasks", value: data.stats.myOverdueTasks, icon: ClockAlert },
];

const isMember = (data: AdminDashboardData | PMDashboardData | MemberDashboardData): data is MemberDashboardData => {
  return (data as MemberDashboardData).stats && "myProjects" in (data as MemberDashboardData).stats;
};

export function DashboardStats({ data }: DashboardStatsProps) {
  const cards = isMember(data) ? statsForMember(data) : statsForAdminOrPM(data as AdminDashboardData);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((s, idx) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
          >
            <Card className="border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <Icon className="size-4 text-primary" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-foreground">{s.value}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
