import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUpdateProject } from "@/hooks/useProjects";
import { IProject } from "@/types/project.types";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ProjectForm, projectFormSchema } from "./project-form";

interface EditProjectSheetProps {
  project: IProject;
  open: boolean;
  onClose: () => void;
}

export function EditProjectSheet({
  project,
  open,
  onClose,
}: EditProjectSheetProps) {
  const { mutate: updateProject, isPending } = useUpdateProject(project.id);

  const form = useForm({
    defaultValues: {
      name: project.name,
      description: project.description || '',
      status: project.status as "ACTIVE" | "COMPLETED" | "ARCHIVED",
      deadline: project.deadline ? project.deadline.split("T")[0] : '',
    } as z.infer<typeof projectFormSchema>,
    validators: {
      onSubmit: projectFormSchema,
    },
    onSubmit: async ({ value }) => {
      updateProject(
        {
          ...value,
          description: value.description || null,
          deadline: value.deadline || null,
        },
        {
          onSuccess: () => {
            toast.success("Project updated successfully");
            onClose();
          },
          onError: (error: any) => {
            toast.error(
              error.response?.data?.message || "Failed to update project",
            );
          },
        },
      );
    },
  });

  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
          <SheetDescription>
            Update the details for your project.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-6 flex h-[calc(100vh-8rem)] flex-col justify-between"
        >
          <ProjectForm form={form} />

          <div className="flex w-full justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button type="submit" disabled={!canSubmit || isPending}>
                  {isPending ? "Saving..." : "Save changes"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
