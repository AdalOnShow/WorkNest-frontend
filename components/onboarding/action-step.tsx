import { FolderPlus, Users } from "lucide-react";

interface ActionStepProps {
  onCreateProject: () => void;
  onJoinProject: () => void;
  onSkip: () => void;
}

export function ActionStep({
  onCreateProject,
  onJoinProject,
  onSkip,
}: ActionStepProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          How do you want to get started?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You can do both at any time from your dashboard.
        </p>
      </div>

      {/* Cards */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Create a project */}
        <button
          type="button"
          onClick={onCreateProject}
          className="group flex flex-col items-start gap-4 rounded-xl border border-border bg-muted/30 p-5 text-left transition-all duration-200 hover:border-primary hover:bg-muted/50 hover:ring-2 hover:ring-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
            <FolderPlus className="size-5" />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-foreground">Create a project</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Start fresh. You&apos;ll be the Project Manager.
            </p>
          </div>

          <span className="text-xs font-medium text-primary transition-colors group-hover:text-primary/80">
            Get started →
          </span>
        </button>

        {/* Join a project */}
        <button
          type="button"
          onClick={onJoinProject}
          className="group flex flex-col items-start gap-4 rounded-xl border border-border bg-muted/30 p-5 text-left transition-all duration-200 hover:border-primary hover:bg-muted/50 hover:ring-2 hover:ring-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
            <Users className="size-5" />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-foreground">Join a project</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Already have a team? Ask your PM to add you.
            </p>
          </div>

          <span className="text-xs font-medium text-primary transition-colors group-hover:text-primary/80">
            How to join →
          </span>
        </button>
      </div>

      {/* Skip link */}
      <button
        type="button"
        onClick={onSkip}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
      >
        Skip for now, go to dashboard →
      </button>
    </div>
  );
}
