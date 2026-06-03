"use client";

import { useParams, useRouter } from "next/navigation";
import { useProject } from "@/hooks/useProjects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Edit2,
  Trash2,
  Calendar,
  FolderKanban,
  CheckCircle2,
  Archive,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { EditProjectSheet } from "@/components/projects/edit-project-sheet";
import { DeleteProjectDialog } from "@/components/projects/delete-project-dialog";
import { MemberList } from "@/components/projects/member-list";
import { AddMemberForm } from "@/components/projects/add-member-form";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data: project, isLoading, error } = useProject(id);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-37.5" />
        <Skeleton className="h-50 w-full rounded-xl" />
        <Skeleton className="h-100 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center text-center">
        <h3 className="mb-2 text-xl font-semibold">Project not found</h3>
        <p className="mb-6 text-muted-foreground">
          The project you are looking for does not exist or you don&apos;t have
          access.
        </p>
        <Button onClick={() => router.push("/projects")}>
          Go back to projects
        </Button>
      </div>
    );
  }

  const isOwner = project.currentUserRole === "PROJECT_MANAGER";
  const progress =
    project.taskCount > 0
      ? Math.round((project.completedTaskCount / project.taskCount) * 100)
      : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "COMPLETED":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "ARCHIVED":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <FolderKanban className="mr-1.5 size-3.5" />;
      case "COMPLETED":
        return <CheckCircle2 className="mr-1.5 size-3.5" />;
      case "ARCHIVED":
        return <Archive className="mr-1.5 size-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to projects
      </Link>

      <div className="flex flex-col justify-between gap-4 rounded-xl border bg-card p-6 shadow-sm md:flex-row md:items-start">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={getStatusColor(project.status)}>
              {getStatusIcon(project.status)}
              {project.status.toLowerCase()}
            </Badge>
            {project.deadline && (
              <span className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1.5 size-4" />
                Deadline: {format(new Date(project.deadline), "MMMM d, yyyy")}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {project.name}
          </h1>
          {project.description && (
            <p className="max-w-3xl text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>

        {isOwner && (
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              <Edit2 className="mr-2 size-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="mr-2 size-4" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                  <div>
                    <strong className="text-foreground">
                      {project.completedTaskCount}
                    </strong>{" "}
                    completed
                  </div>
                  <div>
                    <strong className="text-foreground">
                      {project.taskCount - project.completedTaskCount}
                    </strong>{" "}
                    pending
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Recent Activity</h3>
              <div className="flex h-25 items-center justify-center text-sm text-muted-foreground">
                Activity log coming soon
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-0">
          <div className="flex min-h-75 items-center justify-center rounded-xl border border-dashed bg-card/50 text-center text-muted-foreground">
            Tasks module coming soon
          </div>
        </TabsContent>

        <TabsContent value="members" className="mt-0 space-y-6">
          {isOwner && <AddMemberForm projectId={project.id} />}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Project Members</h3>
            <MemberList projectId={project.id} isOwner={isOwner} />
          </div>
        </TabsContent>
      </Tabs>

      {editOpen && (
        <EditProjectSheet
          project={project}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
      {deleteOpen && (
        <DeleteProjectDialog
          projectId={project.id}
          projectName={project.name}
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
        />
      )}
    </div>
  );
}
