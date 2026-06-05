"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  animate,
  Variants,
} from "framer-motion";
import {
  Star,
  Clock,
  Headphones,
  CheckCircle,
  Award,
  ShieldCheck,
  Zap,
  ThumbsUp,
  ArrowRight,
  MessageCircleHeart,
} from "lucide-react";

// --- Types & Interfaces ---
interface Metric {
  id: string;
  prefix?: string;
  numericValue: number;
  suffix?: string;
  label: string;
  description: string;
  icon: React.ElementType;
  theme: {
    bg: string;
    text: string;
    border: string;
    glow: string;
  };
}

// --- Data Configuration ---
const metricsData: Metric[] = [
  {
    id: "satisfaction",
    numericValue: 98,
    suffix: "%",
    label: "Customer Satisfaction",
    description: "Based on rider and driver feedback after support interactions.",
    icon: Star,
    theme: {
      bg: "bg-amber-50",
      text: "text-amber-500",
      border: "group-hover:border-amber-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(245,158,11,0.4)]",
    },
  },
  {
    id: "response-time",
    prefix: "< ",
    numericValue: 5,
    suffix: " Min",
    label: "Average Response Time",
    description: "Fast support responses across multiple communication channels.",
    icon: Clock,
    theme: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "group-hover:border-blue-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(37,99,235,0.4)]",
    },
  },
  {
    id: "availability",
    numericValue: 24,
    suffix: "/7",
    label: "Support Availability",
    description: "Dedicated teams available whenever assistance is needed.",
    icon: Headphones,
    theme: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "group-hover:border-purple-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(147,51,234,0.4)]",
    },
  },
  {
    id: "resolved-issues",
    numericValue: 50,
    suffix: "K+",
    label: "Issues Resolved",
    description: "Successfully resolved customer requests and inquiries.",
    icon: CheckCircle,
    theme: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "group-hover:border-emerald-200",
      glow: "group-hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.4)]",
    },
  },
];

// --- Custom Animated Counter Component ---
const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !inView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(currentValue) {
        node.textContent = `${prefix}${Math.floor(currentValue)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [value, prefix, suffix, inView]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
};

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const floatVariants = (delay: number): Variants => ({
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  },
});

export default function CustomerMetricsSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      {/* --- Background Decorative Elements --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Radial Gradients */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-[100px] translate-y-1/3" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* --- Section Header --- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
              <Award size={14} />
            </span>
            <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Customer Satisfaction
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Support You Can Count On
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Every interaction matters. Our support teams work around the clock
            to deliver fast responses, effective resolutions, and exceptional
            customer experiences.
          </p>
        </motion.div>

        {/* --- Metrics Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-24"
        >
          {metricsData.map((metric) => (
            <motion.div
              key={metric.id}
              variants={cardVariants}
              className={`group relative flex flex-col p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 ${metric.theme.border} ${metric.theme.glow}`}
            >
              {/* Top Section: Icon */}
              <div className="mb-8">
                <div
                  className={`relative flex items-center justify-center w-16 h-16 rounded-2xl ${metric.theme.bg} ${metric.theme.text} transition-transform duration-500 group-hover:scale-110`}
                >
                  <metric.icon className="w-8 h-8 relative z-10" />
                  {/* Subtle Glow Behind Icon on Hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl ${metric.theme.bg} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />
                </div>
              </div>

              {/* Middle Section: Counter & Label */}
              <div className="flex-grow">
                <div className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 transition-transform duration-500 origin-left group-hover:scale-105">
                  <AnimatedCounter
                    value={metric.numericValue}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {metric.label}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Featured Trust Banner --- */}
        <div className="relative">
          {/* Decorative Floating Cards (Desktop Only) */}
          <motion.div
            variants={floatVariants(0)}
            animate="animate"
            className="absolute -top-12 -left-10 z-20 hidden lg:flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-xl border border-slate-100"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <MessageCircleHeart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                98% Positive Feedback
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={floatVariants(1.5)}
            animate="animate"
            className="absolute -bottom-10 -right-8 z-20 hidden lg:flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-xl border border-slate-100"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Satisfaction Guaranteed
              </p>
            </div>
          </motion.div>

          {/* Main Trust Card */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.3)]"
          >
            {/* Card Background Glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
              <div className="max-w-2xl text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Committed to Exceptional Customer Experiences
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Our support specialists are trained to provide fast, reliable,
                  and personalized assistance to ensure every journey with Rydex
                  is smooth and worry-free.
                </p>

                {/* Trust Highlights */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6">
                  {[
                    { icon: ShieldCheck, label: "Verified Support Team" },
                    { icon: Award, label: "Secure Communication" },
                    { icon: Zap, label: "Priority Issue Resolution" },
                  ].map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-slate-200 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
                    >
                      <highlight.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">
                        {highlight.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-2xl shadow-[0_8px_20px_-6px_rgba(59,130,246,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(59,130,246,0.6)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50">
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Our Team
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}