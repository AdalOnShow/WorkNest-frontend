import { useState } from "react";
import { useSearchUser, useAddMember } from "@/hooks/useProjects";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, UserCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberRole, IUserSearchResult } from "@/types/project.types";

interface AddMemberFormProps {
  projectId: string;
}

export function AddMemberForm({ projectId }: AddMemberFormProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MemberRole>("TEAM_MEMBER");
  const [foundUser, setFoundUser] = useState<IUserSearchResult | null>(null);
  const [searched, setSearched] = useState(false);

  const { mutate: searchUser, isPending: isSearching } = useSearchUser();
  const { mutate: addMember, isPending: isAdding } = useAddMember(projectId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    searchUser(email, {
      onSuccess: (user) => {
        setFoundUser(user);
        setSearched(true);
      },
      onError: () => {
        setFoundUser(null);
        setSearched(true);
      },
    });
  };

  const handleAdd = () => {
    if (!foundUser) return;

    addMember(
      { email: foundUser.email, role },
      {
        onSuccess: () => {
          toast.success("Member added successfully");
          setEmail("");
          setFoundUser(null);
          setSearched(false);
          setRole("TEAM_MEMBER");
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to add member");
        },
      },
    );
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <h3 className="font-medium">Add New Member</h3>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter user email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSearched(false);
            setFoundUser(null);
          }}
          className="max-w-md"
        />
        <Button type="submit" disabled={!email || isSearching}>
          <Search className="mr-2 size-4" />
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </form>

      {searched && !foundUser && (
        <div className="text-sm text-muted-foreground">
          No user found with that email address.
        </div>
      )}

      {foundUser && (
        <div className="mt-4 flex items-center justify-between rounded-lg border bg-accent/30 p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={foundUser.avatarUrl || undefined} />
              <AvatarFallback>
                <UserCircle2 className="size-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{foundUser.name}</p>
              <p className="text-xs text-muted-foreground">{foundUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={role}
              onValueChange={(val) => setRole(val as MemberRole)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TEAM_MEMBER">Member</SelectItem>
                <SelectItem value="PROJECT_MANAGER">Manager</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleAdd} disabled={isAdding}>
              <UserPlus className="mr-2 size-4" />
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
