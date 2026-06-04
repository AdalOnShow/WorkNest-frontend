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
import { useLeaveProject } from "@/hooks/useProjects";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LeaveProjectDialogProps {
  projectId: string;
  projectName: string;
  open: boolean;
  onClose: () => void;
}

export function LeaveProjectDialog({
  projectId,
  projectName,
  open,
  onClose,
}: LeaveProjectDialogProps) {
  const { mutate: leaveProject, isPending } = useLeaveProject(projectId);
  const router = useRouter();

  const handleLeave = () => {
    leaveProject(undefined, {
      onSuccess: () => {
        toast.success("You have left the project");
        onClose();
        router.push("/projects");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to leave project",
        );
        onClose();
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={(val) => !val && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave project?</AlertDialogTitle>
          <AlertDialogDescription>
            You will lose access to <strong>{projectName}</strong> and all its
            tasks. You can rejoin later if invited again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleLeave();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending ? "Leaving..." : "Leave"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
