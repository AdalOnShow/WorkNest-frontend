"use client";

import { useRouter } from "next/navigation";
import { Users, FolderKanban, ListChecks, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAdminDashboard } from "@/hooks/useAdmin";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "text-primary",
  bgColor = "bg-primary/10",
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  bgColor?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`${bgColor} p-2 rounded-lg`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const PieChartComponent = ({
  data,
  title,
}: {
  data: { name: string; value: number }[];
  title: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent ?? 0).toFixed(0)}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const BarChartComponent = ({
  data,
  title,
  dataKey,
  nameKey = "name",
}: {
  data: Record<string, unknown>[];
  title: string;
  dataKey: string;
  nameKey?: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={nameKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: stats, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-destructive">
        Failed to load admin dashboard
      </div>
    );
  }

  const statusData = stats.projectsByStatus.map((item) => ({
    name: item.status,
    value: item.count,
  }));

  const priorityData = [
    { name: "Low", value: 0 },
    { name: "Medium", value: 0 },
    { name: "High", value: 0 },
    { name: "Urgent", value: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform-wide overview of users, projects, and tasks
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="text-primary" bgColor="bg-primary/10" />
        <StatCard title="Active Users" value={stats.activeUsers} icon={Users} color="text-green-600" bgColor="bg-green-100" />
        <StatCard title="Total Projects" value={stats.totalProjects} icon={FolderKanban} color="text-blue-600" bgColor="bg-blue-100" />
        <StatCard title="Total Tasks" value={stats.totalTasks} icon={ListChecks} color="text-purple-600" bgColor="bg-purple-100" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Admin Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/admin/users")}>Manage Users</Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/admin/projects")}>Manage Projects</Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")} className="gap-2">
              <Shield className="size-4" />
              Overview
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <PieChartComponent data={statusData} title="Projects by Status" />
          <BarChartComponent data={priorityData} title="Task Priority Distribution" dataKey="value" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <BarChartComponent
            data={[
              { name: "Week 1", value: 0 },
              { name: "Week 2", value: 0 },
              { name: "Week 3", value: 0 },
              { name: "Week 4", value: 0 },
            ]}
            title="Team Productivity"
            dataKey="value"
          />
          <BarChartComponent
            data={[
              { name: "Project A", value: 0 },
              { name: "Project B", value: 0 },
              { name: "Project C", value: 0 },
            ]}
            title="Project Progress"
            dataKey="value"
          />
        </div>
      </div>
    </div>
  );
}
