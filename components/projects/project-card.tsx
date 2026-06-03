import { IProject } from "@/types/project.types";
import {
  MoreVertical,
  Calendar,
  Users,
  FolderKanban,
  CheckCircle2,
  Archive,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EditProjectSheet } from "./edit-project-sheet";
import { DeleteProjectDialog } from "./delete-project-dialog";
import { format, isPast, differenceInDays } from "date-fns";

interface ProjectCardProps {
  project: IProject;
  isOwner: boolean;
}

export function ProjectCard({ project, isOwner }: ProjectCardProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "COMPLETED":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "ARCHIVED":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <FolderKanban className="mr-1 size-3" />;
      case "COMPLETED":
        return <CheckCircle2 className="mr-1 size-3" />;
      case "ARCHIVED":
        return <Archive className="mr-1 size-3" />;
      default:
        return null;
    }
  };

  const getDeadlineColor = () => {
    if (!project.deadline) return "text-muted-foreground";
    const date = new Date(project.deadline);
    if (isPast(date)) return "text-destructive font-medium";
    if (differenceInDays(date, new Date()) <= 7)
      return "text-yellow-500 font-medium";
    return "text-muted-foreground";
  };

  const progress =
    project.taskCount > 0
      ? Math.round((project.completedTaskCount / project.taskCount) * 100)
      : 0;

  return (
    <>
      <div
        className="group relative flex cursor-pointer flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
        onClick={() => router.push(`/projects/${project.id}`)}
      >
        <div>
          <div className="mb-3 flex items-start justify-between">
            <Badge variant="outline" className={getStatusColor(project.status)}>
              {getStatusIcon(project.status)}
              {project.status.toLowerCase()}
            </Badge>

            {isOwner && (
              <div onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                    <MoreVertical className="size-4 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                      Edit project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                      onClick={() => setDeleteOpen(true)}
                    >
                      Delete project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <h3 className="mb-1 text-lg font-semibold tracking-tight text-foreground line-clamp-1">
            {project.name}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2 h-10">
            {project.description || "No description provided."}
          </p>

          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {project.completedTaskCount} of {project.taskCount} tasks
                completed
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 text-xs">
          <div className={`flex items-center ${getDeadlineColor()}`}>
            <Calendar className="mr-1.5 size-3.5" />
            {project.deadline
              ? format(new Date(project.deadline), "MMM d, yyyy")
              : "No deadline"}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-1.5 size-3.5" />
            {project.memberCount} member{project.memberCount !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

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
    </>
  );
}
