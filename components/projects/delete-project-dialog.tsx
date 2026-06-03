import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteProject } from "@/hooks/useProjects";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteProjectDialogProps {
  projectId: string;
  projectName: string;
  open: boolean;
  onClose: () => void;
}

export function DeleteProjectDialog({
  projectId,
  projectName,
  open,
  onClose,
}: DeleteProjectDialogProps) {
  const { mutate: deleteProject, isPending } = useDeleteProject();
  const router = useRouter();

  const handleDelete = () => {
    deleteProject(projectId, {
      onSuccess: () => {
        toast.success("Project deleted successfully");
        onClose();
        router.push("/projects");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to delete project",
        );
        onClose();
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={(val) => !val && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{projectName}</strong> and all
            its tasks, comments, and members. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
