"use client";

import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Plus, FolderKanban } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/AuthProvider";

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your projects and collaborate with your team.
          </p>
        </div>
        <Button onClick={() => router.push("/projects/new")}>
          <Plus className="mr-2 size-4" />
          New project
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-50 rounded-xl" />
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isOwner={project.currentUserRole === "PROJECT_MANAGER"}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-100 flex-col items-center justify-center rounded-lg border border-dashed text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <FolderKanban className="size-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">No projects yet</h3>
          <p className="mb-6 mt-2 max-w-sm text-sm text-muted-foreground">
            Get started by creating a project to manage tasks and track your
            progress.
          </p>
          <Button onClick={() => router.push("/projects/new")}>
            <Plus className="mr-2 size-4" />
            Create your first project
          </Button>
        </div>
      )}
    </div>
  );
}
