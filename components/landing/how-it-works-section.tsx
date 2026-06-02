"use client";

import { motion } from "framer-motion";
import { FolderPlus, UserPlus, ListChecks, Rocket } from "lucide-react";

const steps = [
  {
    icon: FolderPlus,
    step: "01",
    title: "Create a Project",
    description:
      "Set up your project with a name, description, and deadline. You're automatically assigned as the Project Manager.",
  },
  {
    icon: UserPlus,
    step: "02",
    title: "Invite Your Team",
    description:
      "Add team members and assign them roles. Everyone gets exactly the level of access they need.",
  },
  {
    icon: ListChecks,
    step: "03",
    title: "Organize Tasks",
    description:
      "Break your project into tasks with priorities, deadlines, and assignees. Track progress as your team works.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Ship & Celebrate",
    description:
      "Monitor progress with real-time analytics. Hit your milestones and deliver on time, every time.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            How it Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Get started in{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              four simple steps
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From zero to fully organized in minutes. No complicated setup, no learning curve.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
