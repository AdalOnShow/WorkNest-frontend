"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { AvatarStep } from "@/components/onboarding/avatar-step";
import { ActionStep } from "@/components/onboarding/action-step";
import { JoinProjectModal } from "@/components/onboarding/join-project-modal";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <OnboardingShell step={step}>
      {/* Back link — only visible on step 2 */}
      {step === 2 && (
        <button
          type="button"
          onClick={() => setStep(1)}
          className="mb-5 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
        >
          <ChevronLeft className="size-4" />
          Back
        </button>
      )}

      {step === 1 && <AvatarStep onNext={() => setStep(2)} />}

      {step === 2 && (
        <>
          <ActionStep
            onCreateProject={() => router.push("/projects/new")}
            onJoinProject={() => setJoinModalOpen(true)}
            onSkip={() => router.push("/dashboard")}
          />
          <JoinProjectModal
            open={joinModalOpen}
            onClose={() => {
              setJoinModalOpen(false);
              router.push("/dashboard");
            }}
          />
        </>
      )}
    </OnboardingShell>
  );
}
