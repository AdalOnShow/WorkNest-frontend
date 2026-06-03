/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectMembers, useRemoveMember } from "@/hooks/useProjects";
import { useAuth } from "@/providers/AuthProvider";
import { UserCircle2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MemberListProps {
  projectId: string;
  isOwner: boolean;
}

export function MemberList({ projectId, isOwner }: MemberListProps) {
  const { data: members, isLoading } = useProjectMembers(projectId);
  const removeMemberMutation = useRemoveMember(projectId);

  const isRemovingMember = removeMemberMutation.status === "pending";
  const { user } = useAuth();
  const [selectedMember, setSelectedMember] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRemoveClick = (memberId: string, memberName: string) => {
    setSelectedMember({ id: memberId, name: memberName });
    setConfirmOpen(true);
  };

  const handleConfirmRemove = () => {
    if (!selectedMember) return;

    removeMemberMutation.mutate(selectedMember.id, {
      onSuccess: () => {
        toast.success("Member removed");
        setConfirmOpen(false);
        setSelectedMember(null);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to remove member",
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-50" />
              <Skeleton className="h-3 w-37.5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!members || members.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        No members yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={member.user.avatarUrl || undefined} />
              <AvatarFallback>
                <UserCircle2 className="size-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {member.user.name}{" "}
                {member.user.id === user?.id && (
                  <span className="text-muted-foreground">(You)</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {member.user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge
              variant={
                member.role === "PROJECT_MANAGER" ? "default" : "secondary"
              }
            >
              {member.role === "PROJECT_MANAGER" ? "Manager" : "Member"}
            </Badge>

            {isOwner &&
              member.role !== "PROJECT_MANAGER" &&
              member.user.id !== user?.id && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveClick(member.id, member.user.name)}
                  title="Remove member"
                >
                  <X className="size-4" />
                </Button>
              )}
          </div>
        </div>
      ))}

      <AlertDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMember(null);
          }
          setConfirmOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedMember ? (
                <>This will remove <strong>{selectedMember.name}</strong> from the project. This action cannot be undone.</>
              ) : (
                <>Confirm member removal.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemovingMember}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmRemove}
              disabled={isRemovingMember}
            >
              {isRemovingMember ? "Removing..." : "Remove member"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
// removed local stub: useRemoveMember(projectId) from hooks provides the mutation

