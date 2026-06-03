import { FolderKanban } from "lucide-react";

interface OnboardingShellProps {
  step: 1 | 2;
  children: React.ReactNode;
}

export function OnboardingShell({ step, children }: OnboardingShellProps) {
  return (
    <div className="dark">
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FolderKanban className="size-5" />
          </span>
          <span className="text-xl font-bold text-foreground">
            Work<span className="text-primary">Nest</span>
          </span>
        </div>

        {/* Card */}
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-2xl">
          {/* Step indicator */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`size-2.5 rounded-full transition-colors duration-300 ${
                  step >= 1 ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
              <div className="h-px w-8 bg-border" />
              <div
                className={`size-2.5 rounded-full transition-colors duration-300 ${
                  step >= 2 ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            </div>

            {/* Progress bar */}
            <div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>

            <p className="text-xs text-muted-foreground">Step {step} of 2</p>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
