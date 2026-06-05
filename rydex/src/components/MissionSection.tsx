"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Rocket,
  Shield,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

interface PillarProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FloatingCardProps {
  icon: React.ElementType;
  title: string;
  position: string;
  delay: number;
}

interface MetricProps {
  value: string;
  label: string;
}

const missionPillars: PillarProps[] = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Ensuring secure rides through verified drivers, real-time tracking, and reliable support.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Building a trusted platform that benefits both riders and driver partners.",
  },
  {
    icon: Rocket,
    title: "Innovation Focused",
    description:
      "Leveraging modern technology to deliver smarter and more efficient transportation.",
  },
];

const floatingCards: FloatingCardProps[] = [
  {
    icon: Shield,
    title: "Safety",
    position: "-top-6 -left-4 sm:-left-12",
    delay: 0,
  },
  {
    icon: MapPin,
    title: "Accessibility",
    position: "-top-8 -right-4 sm:-right-8",
    delay: 0.5,
  },
  {
    icon: Clock,
    title: "Reliability",
    position: "-bottom-6 -left-2 sm:-left-8",
    delay: 1,
  },
  {
    icon: Sparkles,
    title: "Innovation",
    position: "-bottom-10 -right-6 sm:-right-12",
    delay: 1.5,
  },
];

const metrics: MetricProps[] = [
  { value: "10K+", label: "Rides Completed" },
  { value: "5K+", label: "Happy Riders" },
  { value: "500+", label: "Driver Partners" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function MissionSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const floatAnimation = (delay: number): Variants => ({
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  });

  return (
    <section className="relative w-full py-24 bg-slate-950 overflow-hidden font-sans text-slate-300">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-1/4 right-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center mb-20">
          {/* Left Side: Mission Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col text-center lg:text-left"
          >
            {/* Header Area */}
            <motion.div
              variants={itemFadeUp}
              className="flex flex-col items-center lg:items-start mb-6"
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-4">
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
                  Our Mission
                </span>
              </div>
              <h3 className="text-xl font-medium text-slate-400 mb-2">
                Why We Exist
              </h3>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Making Every Journey <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
                  Smarter, Safer & Accessible
                </span>
              </h2>
            </motion.div>

            {/* Mission Statements */}
            <motion.div
              variants={itemFadeUp}
              className="space-y-4 mb-10 text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto lg:mx-0"
            >
              <p>
                At Rydex, our mission is to transform the way people move by
                delivering reliable, affordable, and technology-driven
                transportation solutions. We strive to create a seamless
                mobility ecosystem that empowers riders, supports driver
                partners, and makes everyday travel effortless.
              </p>
              <p>
                Our focus is not just transportation—it is creating meaningful
                connections between people and opportunities through accessible
                mobility. By combining innovation, safety, and customer-first
                thinking, we aim to redefine the future of urban transportation.
              </p>
            </motion.div>

            {/* Mission Pillars */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full"
              role="list"
            >
              {missionPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  variants={slideLeft}
                  role="listitem"
                  className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300 text-left group"
                >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors">
                    <pillar.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Visual Showcase */}
          <div className="relative w-full max-w-md mx-auto mt-12 lg:mt-0 flex items-center justify-center min-h-[400px]">
            <div className="relative z-10 w-full">
              {/* Center Mission Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-20 w-full aspect-square max-w-[320px] mx-auto rounded-[2.5rem] bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-8 shadow-2xl flex flex-col items-center justify-center text-center"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#3b82f6_0%,transparent_70%)] opacity-20 rounded-[2.5rem]" />
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <Rocket className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-sm font-bold text-blue-400 tracking-widest uppercase mb-3">
                  Rydex Mission
                </h4>
                <p className="text-2xl font-bold text-white leading-snug">
                  Connecting People Through Smart Mobility
                </p>
              </motion.div>

              {/* Floating Orbiting Cards */}
              {floatingCards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={floatAnimation(card.delay)}
                  animate="animate"
                  className={`absolute ${card.position} z-30`}
                >
                  <div className="flex items-center gap-3 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 px-4 py-3 rounded-2xl shadow-xl">
                    <div className="bg-slate-900/80 p-2 rounded-lg text-blue-400">
                      <card.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white text-sm font-semibold whitespace-nowrap">
                      {card.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Area: Achievement Indicators */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-12 border-t border-slate-800/60"
          role="list"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemFadeUp}
              whileHover={{ scale: 1.03 }}
              role="listitem"
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300"
            >
              <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2">
                {metric.value}
              </span>
              <span className="text-sm sm:text-base font-medium text-blue-400/90 tracking-wide">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
