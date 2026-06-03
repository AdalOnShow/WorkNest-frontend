/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(500).optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "ARCHIVED"]),
  deadline: z.string().optional(),
});

interface ProjectFormProps {
  form: any;
}

export function ProjectForm({ form }: ProjectFormProps) {
  return (
    <div className="space-y-4">
      <form.Field
        name="name"
        children={(field: any) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. Website Redesign"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="description"
        children={(field: any) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Description (optional)</Label>
            <textarea
              id={field.name}
              name={field.name}
              className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="What is this project about?"
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="status"
          children={(field: any) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Status</Label>
              <Select
                onValueChange={field.handleChange}
                value={field.state.value}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
              {field.state.meta.errors.length > 0 && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        />

        <form.Field
          name="deadline"
          children={(field: any) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Deadline (optional)</Label>
              <Input
                id={field.name}
                name={field.name}
                type="date"
                value={field.state.value || ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
