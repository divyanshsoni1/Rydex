"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Car,
  Gauge, // <-- Replaced SteeringWheel with Gauge
  ShieldCheck,
  Search,
  Handshake,
  MonitorSmartphone,
  ArrowRight,
  LifeBuoy,
} from "lucide-react";

// --- Types & Interfaces ---
interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  topics: string[];
  badge?: string;
  ctaLabel: string;
  href: string;
  theme: {
    bg: string;
    text: string;
    border: string;
    glow: string;
  };
}

// --- Data Configuration ---
const categories: SupportCategory[] = [
  {
    id: "rider-support",
    title: "Rider Support",
    description:
      "Help with ride bookings, cancellations, payments, fare questions, and trip-related concerns.",
    icon: Car,
    topics: ["Ride Issues", "Payment Support", "Booking Assistance"],
    badge: "Most Popular",
    ctaLabel: "Get Help",
    href: "#rider-support",
    theme: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "group-hover:border-blue-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(37,99,235,0.3)]",
    },
  },
  {
    id: "driver-support",
    title: "Driver Support",
    description:
      "Support for driver onboarding, earnings, account verification, and platform operations.",
    icon: Gauge, // <-- Update this line
    topics: ["Account Verification", "Earnings & Payouts", "Driver Resources"],
    ctaLabel: "Contact Driver Team",
    href: "#driver-support",
    theme: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "group-hover:border-emerald-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.3)]",
    },
  },
  {
    id: "safety-security",
    title: "Safety & Security",
    description:
      "Report incidents, safety concerns, emergency situations, or suspicious platform activity.",
    icon: ShieldCheck,
    topics: ["Incident Reports", "Emergency Assistance", "Safety Feedback"],
    badge: "Priority Response",
    ctaLabel: "Report Concern",
    href: "#safety-security",
    theme: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "group-hover:border-rose-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(225,29,72,0.3)]",
    },
  },
  {
    id: "lost-found",
    title: "Lost & Found",
    description:
      "Recover items left inside vehicles and track submitted recovery requests easily.",
    icon: Search,
    topics: ["Lost Items", "Recovery Status", "Item Claims"],
    ctaLabel: "Find Lost Item",
    href: "#lost-found",
    theme: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "group-hover:border-amber-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(217,119,6,0.3)]",
    },
  },
  {
    id: "business-partnerships",
    title: "Business Partnerships",
    description:
      "Fleet partnerships, corporate transportation programs, and strategic marketing collaborations.",
    icon: Handshake,
    topics: ["Fleet Programs", "Corporate Accounts", "Strategic Partnerships"],
    badge: "Enterprise Team",
    ctaLabel: "Partner With Us",
    href: "#business-partnerships",
    theme: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "group-hover:border-indigo-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(79,70,229,0.3)]",
    },
  },
  {
    id: "technical-support",
    title: "Technical Support",
    description:
      "App issues, login problems, payment failures, account access concerns, and bug reports.",
    icon: MonitorSmartphone,
    topics: ["Login Issues", "App Performance", "Account Recovery"],
    badge: "Dedicated Experts",
    ctaLabel: "Technical Assistance",
    href: "#technical-support",
    theme: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "group-hover:border-purple-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(147,51,234,0.3)]",
    },
  },
];

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

export default function SupportCategoriesSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Radial Gradients */}
        <div className="absolute top-0 right-[-10%] w-[50%] h-[500px] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[400px] rounded-full bg-indigo-50/50 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* --- Section Header --- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600">
              <LifeBuoy size={14} />
            </span>
            <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Support Departments
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Choose the Support You Need
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Whether you&apos;re a rider, driver, partner, or business customer,
            our specialized support teams are ready to assist you with fast and
            reliable solutions.
          </p>
        </motion.div>

        {/* --- Categories Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {categories.map((category) => (
            <motion.a
              key={category.id}
              href={category.href}
              variants={cardVariants}
              className={`group relative flex flex-col h-full bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${category.theme.border} ${category.theme.glow}`}
            >
              {/* Top Area: Icon & Badge */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`relative flex items-center justify-center w-14 h-14 rounded-2xl ${category.theme.bg} ${category.theme.text} transition-transform duration-300 group-hover:scale-110`}
                >
                  <category.icon className="w-6 h-6 relative z-10" />
                  {/* Subtle hover glow behind icon */}
                  <div className="absolute inset-0 rounded-2xl bg-current opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20" />
                </div>

                {category.badge && (
                  <span className="inline-flex items-center px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-50 border border-slate-100 rounded-full">
                    {category.badge}
                  </span>
                )}
              </div>

              {/* Middle Area: Title & Description */}
              <div className="mb-6 flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Topics Area */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {category.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-full transition-colors group-hover:bg-white group-hover:border-slate-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Area: CTA */}
              <div className="mt-auto pt-6 border-t border-slate-100 group-hover:border-transparent transition-colors duration-300">
                <div
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${category.theme.text}`}
                >
                  {category.ctaLabel}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* --- Bottom Assistance Banner --- */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 lg:mt-24 w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 md:p-12 shadow-2xl"
        >
          {/* Decorative Banner Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Not Sure Which Team to Contact?
              </h3>
              <p className="text-slate-300 text-lg">
                Submit a general inquiry, and our support specialists will
                rapidly direct your request to the right department.
              </p>
            </div>

            <button className="group relative flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 active:scale-95">
              Contact General Support
              <ArrowRight className="w-4 h-4 text-slate-600 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
