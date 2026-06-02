"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CheckCircle2,
  BarChart3,
  Shield,
  Bell,
  Paperclip,
  Search,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Project Management",
    description:
      "Create, organize, and track projects with customizable statuses. Keep everything in one central workspace.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: CheckCircle2,
    title: "Task Tracking",
    description:
      "Break projects into tasks with priorities, deadlines, and assignees. Never miss a deadline again.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite team members, assign roles, and collaborate in real-time with comments and activity feeds.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Visualize team productivity, task distributions, and project progress with interactive charts.",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Fine-grained permissions with Admin, Project Manager, and Team Member roles across projects.",
    gradient: "from-rose-500 to-pink-400",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Stay informed with task assignments, due date reminders, and status updates — right when you need them.",
    gradient: "from-sky-500 to-indigo-400",
  },
  {
    icon: Paperclip,
    title: "File Attachments",
    description:
      "Attach files to tasks with cloud-powered storage. Share designs, docs, and resources effortlessly.",
    gradient: "from-lime-500 to-green-400",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Find anything instantly. Search across projects, tasks, and team members with advanced filters.",
    gradient: "from-fuchsia-500 to-pink-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything your team needs to{" "}
            <span className="bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">
              deliver results
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From planning to launch, WorkNest gives your team the tools to manage
            every aspect of your projects — simply and beautifully.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
