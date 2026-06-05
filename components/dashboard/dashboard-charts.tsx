"use client";

import type {
  AdminDashboardData,
  MemberDashboardData,
  PMDashboardData
} from "@/types/dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";

type DashboardChartsProps = {
  data: AdminDashboardData | PMDashboardData | MemberDashboardData;
  isLoading?: boolean;
};

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
] as const;

export function DashboardCharts({ data }: DashboardChartsProps) {
  const chartProjectProgress = useMemo(() => {
    return data.projectProgress.map((p) => ({
      ...p,
      remainingTasks: Math.max(0, p.totalTasks - p.completedTasks),
    }));
  }, [data.projectProgress]);

  const tickFill = "hsl(var(--muted-foreground))";
  const gridStroke = "hsl(var(--border))";

  const tooltipStyle = {
    background: "hsl(var(--card))",
    borderColor: "hsl(var(--border))",
    color: "hsl(var(--foreground))",
  } as const;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Task Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.taskStatusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={() => undefined}
                >
                  {data.taskStatusDistribution.map((_, index) => (
                    <Cell
                      key={`cell-status-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: tickFill }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Task Priority Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.taskPriorityDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="priority" tick={{ fill: tickFill }} />
                <YAxis tick={{ fill: tickFill }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: tickFill }} />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Team Productivity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topUsersByProductivity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis type="number" tick={{ fill: tickFill }} />
                <YAxis
                  dataKey="userName"
                  type="category"
                  width={140}
                  tick={{ fill: tickFill }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: tickFill }} />
                <Bar
                  dataKey="completedTaskCount"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Project Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartProjectProgress} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis type="number" tick={{ fill: tickFill }} />
                <YAxis
                  dataKey="projectName"
                  type="category"
                  width={160}
                  tick={{ fill: tickFill }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: tickFill }} />
                <Bar
                  dataKey="completedTasks"
                  fill="hsl(var(--chart-2))"
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="remainingTasks"
                  stackId="a"
                  fill="hsl(var(--muted))"
                  radius={[4, 0, 0, 4]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
