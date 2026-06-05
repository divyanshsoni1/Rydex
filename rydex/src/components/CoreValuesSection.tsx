"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Eye,
  Users,
  Leaf,
  Circle,
} from "lucide-react";

interface CoreValue {
  icon: React.ElementType;
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    icon: ShieldCheck,
    title: "Safety Above Everything",
    description:
      "We prioritize the well-being of riders and driver partners by promoting secure, dependable, and responsible transportation experiences.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Every feature, decision, and improvement begins with understanding and serving the needs of our users.",
  },
  {
    icon: Sparkles,
    title: "Innovation Without Limits",
    description:
      "We continuously explore new technologies and ideas to improve mobility and create smarter transportation experiences.",
  },
  {
    icon: Eye,
    title: "Transparency & Trust",
    description:
      "Open communication, honesty, and accountability are at the heart of every interaction within our platform.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description:
      "We believe successful mobility platforms are built by creating value for both riders and driver partners.",
  },
  {
    icon: Leaf,
    title: "Sustainable Progress",
    description:
      "We strive to contribute to a future where transportation becomes more efficient, responsible, and environmentally conscious.",
  },
];

const manifestoIndicators = [
  "Safety",
  "Trust",
  "Innovation",
  "Community",
  "Sustainability",
];

export default function CoreValuesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-24 bg-slate-950 overflow-hidden font-sans text-slate-300">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        {/* Radial Glows */}
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUpVariants}
            className="relative p-[1px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] mb-6"
          >
            <div className="bg-slate-950/80 backdrop-blur-md rounded-full px-5 py-2">
              <span className="text-cyan-400 text-xs font-extrabold tracking-widest uppercase">
                Core Values
              </span>
            </div>
          </motion.div>

          {/* Small Label */}
          <motion.h3
            variants={fadeUpVariants}
            className="text-xl font-medium text-blue-400/90 mb-3"
          >
            The Principles That Guide Us
          </motion.h3>

          {/* Main Heading */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6"
          >
            Building Trust Through <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Purpose-Driven Values
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="text-lg text-slate-400 leading-relaxed"
          >
            At Rydex, our values define how we serve riders, support driver
            partners, and build innovative transportation solutions. These
            principles guide every decision we make and shape the experiences we
            create.
          </motion.p>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
          role="list"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              role="listitem"
              className="group relative p-8 rounded-[2rem] bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:bg-slate-800/60 hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgb(6,182,212,0.12)] transition-all duration-300 flex flex-col items-start overflow-hidden"
            >
              {/* Internal Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/5 group-hover:to-cyan-400/5 rounded-[2rem] transition-colors duration-500" />

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-colors duration-300 relative z-10 shadow-lg">
                <value.icon className="w-8 h-8 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300 group-hover:scale-110" />
              </div>

              <h4 className="text-xl font-bold text-white mb-4 relative z-10 tracking-wide">
                {value.title}
              </h4>
              <p className="text-slate-400 text-[15px] leading-relaxed relative z-10">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Manifesto Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scaleInVariants}
          className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 via-slate-900 to-cyan-900/20 border border-blue-500/30 p-10 sm:p-16 text-center overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.1)]"
        >
          {/* Banner ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2563eb_0%,transparent_60%)] opacity-10" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Values That Move Us Forward
            </h3>

            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-12 max-w-3xl">
              Technology can improve transportation, but values create lasting
              trust. At Rydex, we remain committed to building a mobility
              platform that is safe, transparent, innovative, and centered
              around people.
            </p>

            {/* Value Indicators Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
              {manifestoIndicators.map((indicator, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-2 group cursor-default">
                    <span className="text-slate-200 font-semibold tracking-wide text-sm sm:text-base group-hover:text-cyan-400 transition-colors duration-300 uppercase">
                      {indicator}
                    </span>
                  </div>
                  {/* Separator */}
                  {index < manifestoIndicators.length - 1 && (
                    <div className="hidden sm:flex items-center justify-center text-slate-700">
                      <Circle className="w-1.5 h-1.5 fill-current" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
