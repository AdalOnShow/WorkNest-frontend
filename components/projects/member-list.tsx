import { useProjectMembers, useRemoveMember } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, UserCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";

interface MemberListProps {
  projectId: string;
  isOwner: boolean;
}

export function MemberList({ projectId, isOwner }: MemberListProps) {
  const { data: members, isLoading } = useProjectMembers(projectId);
  const { mutate: removeMember } = useRemoveMember(projectId);
  const { user } = useAuth();

  const handleRemove = (memberId: string) => {
    if (confirm("Are you sure you want to remove this member?")) {
      removeMember(memberId, {
        onSuccess: () => {
          toast.success("Member removed");
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message || "Failed to remove member",
          );
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
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

            {isOwner && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-destructive"
                onClick={() => handleRemove(member.id)}
                title="Remove member"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
