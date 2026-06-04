"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Users, ListChecks, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminProject } from "@/hooks/useAdmin";
import { useDeleteProject } from "@/hooks/useAdmin";

const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  ACTIVE: "default",
  COMPLETED: "secondary",
  ARCHIVED: "outline",
};

export default function AdminProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: project, isLoading, error } = useAdminProject(id);
  const deleteProject = useDeleteProject();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-destructive">
        Project not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/admin/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <div>
        <h2 className="text-2xl font-semibold">{project.name}</h2>
        {project.description && <p className="mt-1 text-muted-foreground">{project.description}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={statusColors[project.status] || "outline"} className="text-base">
              {project.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{project.memberCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{project.taskCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm">{new Date(project.createdAt).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      {project.deadline && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm">{new Date(project.deadline).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant="destructive" onClick={() => {
          if (confirm("Are you sure you want to delete this project?")) {
            deleteProject.mutate(project.id);
          }
        }} disabled={deleteProject.isPending}>
          <Trash2 className="h-4 w-4 mr-2" /> Delete Project
        </Button>
      </div>
    </div>
  );
}
