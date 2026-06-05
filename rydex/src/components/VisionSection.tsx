"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Globe,
  Brain,
  Leaf,
  Rocket,
  BatteryCharging,
  Building2,
  Car,
} from "lucide-react";

interface VisionPillar {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FloatingCard {
  icon: React.ElementType;
  title: string;
  position: string;
  delay: number;
}

interface RoadmapItem {
  year: string;
  title: string;
}

const pillars: VisionPillar[] = [
  {
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Making transportation available and affordable for people everywhere.",
  },
  {
    icon: Brain,
    title: "Intelligent Mobility",
    description:
      "Using technology and data-driven insights to optimize every journey.",
  },
  {
    icon: Leaf,
    title: "Sustainable Future",
    description:
      "Supporting environmentally responsible transportation initiatives.",
  },
  {
    icon: Rocket,
    title: "Continuous Innovation",
    description:
      "Building next-generation mobility experiences for future cities.",
  },
];

const floatingCards: FloatingCard[] = [
  {
    icon: Brain,
    title: "AI Route Optimization",
    position: "-top-8 -left-4 sm:-left-16",
    delay: 0,
  },
  {
    icon: BatteryCharging,
    title: "Electric Mobility",
    position: "top-8 -right-4 sm:-right-20",
    delay: 0.8,
  },
  {
    icon: Building2,
    title: "Smart Cities",
    position: "bottom-16 -left-6 sm:-left-24",
    delay: 1.6,
  },
  {
    icon: Car,
    title: "Autonomous Ready",
    position: "-bottom-10 right-4 sm:-right-12",
    delay: 2.4,
  },
  {
    icon: Leaf,
    title: "Carbon Reduction",
    position: "-bottom-12 left-10 sm:left-6",
    delay: 3.2,
  },
];

const roadmap: RoadmapItem[] = [
  { year: "2026", title: "Enhanced Ride Experience" },
  { year: "2027", title: "Corporate Mobility Solutions" },
  { year: "2028", title: "EV Fleet Expansion" },
  { year: "2029", title: "AI-Powered Transportation" },
  { year: "2030", title: "Connected Smart Mobility Ecosystem" },
];

export default function VisionSection() {
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

  const slideLeftVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatAnimation = (delay: number): Variants => ({
    animate: {
      y: [0, -12, 0],
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
      {/* Background Future Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-25" />
        {/* Radial Glows */}
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center mb-32">
          {/* Left Column: Vision Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col text-center lg:text-left"
          >
            {/* Header Area */}
            <motion.div
              variants={scaleInVariants}
              className="flex flex-col items-center lg:items-start mb-6"
            >
              <div className="relative p-[1px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-5">
                <div className="bg-slate-950/80 backdrop-blur-md rounded-full px-4 py-1.5">
                  <span className="text-cyan-400 text-xs font-extrabold tracking-widest uppercase">
                    Our Vision
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-medium text-blue-400/90 mb-2">
                Where We're Going
              </h3>
              <motion.h2
                variants={slideLeftVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15]"
              >
                Building the Future of <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                  Connected Mobility
                </span>
              </motion.h2>
            </motion.div>

            {/* Vision Statements */}
            <motion.div
              variants={fadeUpVariants}
              className="space-y-5 mb-12 text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto lg:mx-0"
            >
              <p>
                At Rydex, we envision a future where transportation is seamless,
                intelligent, and accessible to everyone. Our goal is to create a
                connected mobility ecosystem that empowers people to travel
                efficiently while enhancing safety, sustainability, and
                convenience.
              </p>
              <p>
                We believe mobility should not be limited by geography,
                technology, or accessibility barriers. Through continuous
                innovation and smart transportation solutions, Rydex aims to
                become a trusted platform that transforms how cities move and
                grow.
              </p>
            </motion.div>

            {/* Vision Pillars Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
              role="list"
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  role="listitem"
                  className="flex flex-col p-6 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:bg-slate-800/60 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                    <pillar.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Future Mobility Showcase */}
          <div className="relative w-full max-w-lg mx-auto lg:mr-0 min-h-[500px] flex items-center justify-center mt-12 lg:mt-0">
            {/* Center Vision Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-20 w-full max-w-[340px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl blur-xl opacity-20" />
              <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center mb-6 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <Globe className="w-10 h-10 text-cyan-400" />
                </div>
                <h4 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                  RYDEX 2030
                </h4>
                <p className="text-cyan-400 font-medium text-sm uppercase tracking-widest mb-6">
                  The Future of Smart Transportation
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />
                <p className="text-slate-300 font-medium">
                  Connected • Intelligent • Sustainable
                </p>
              </div>
            </motion.div>

            {/* Floating Future Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                variants={floatAnimation(card.delay)}
                animate="animate"
                className={`absolute ${card.position} z-30 hidden sm:block`}
              >
                <div className="flex items-center gap-3 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 px-5 py-3 rounded-2xl shadow-2xl hover:scale-105 hover:border-cyan-500/50 transition-all duration-300 cursor-default group">
                  <div className="bg-slate-900 p-2.5 rounded-xl text-blue-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <span className="text-white text-sm font-semibold whitespace-nowrap">
                    {card.title}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Mobile-only visible floating cards (simplified layout) */}
            <div className="absolute inset-0 z-30 sm:hidden pointer-events-none">
              {floatingCards.slice(0, 3).map((card, index) => (
                <motion.div
                  key={`mobile-${index}`}
                  variants={floatAnimation(card.delay)}
                  animate="animate"
                  className={`absolute ${
                    index === 0 ? "-top-4 -left-2"
                    : index === 1 ? "-bottom-6 -right-2"
                    : "-bottom-12 left-1/4"
                  } pointer-events-auto scale-90`}
                >
                  <div className="flex items-center gap-2 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 px-4 py-2 rounded-2xl shadow-xl">
                    <div className="bg-slate-900 p-1.5 rounded-lg text-cyan-400">
                      <card.icon className="w-4 h-4" />
                    </div>
                    <span className="text-white text-xs font-semibold whitespace-nowrap">
                      {card.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Area: Roadmap Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 pt-16 border-t border-slate-800/60"
        >
          <motion.div variants={fadeUpVariants} className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white">
              Our Future Roadmap
            </h3>
          </motion.div>

          {/* Desktop/Tablet Horizontal Timeline */}
          <div className="hidden md:flex relative justify-between items-start">
            {/* Horizontal Line connecting nodes */}
            <div className="absolute top-5 left-8 right-8 h-[2px] bg-gradient-to-r from-blue-500/20 via-cyan-400/50 to-blue-500/20 z-0" />

            {roadmap.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                whileHover={{ y: -5 }}
                className="relative z-10 flex flex-col items-center w-1/5 px-2 group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center mb-4 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
                  <div className="w-3 h-3 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition-colors" />
                </div>
                <h4 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                  {item.year}
                </h4>
                <p className="text-sm font-medium text-slate-400 text-center leading-tight group-hover:text-slate-300 transition-colors">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Stacked Timeline */}
          <div className="md:hidden relative flex flex-col space-y-8 pl-6">
            {/* Vertical Line connecting nodes */}
            <div className="absolute top-4 bottom-4 left-8 w-[2px] bg-gradient-to-b from-blue-500/20 via-cyan-400/50 to-blue-500/20 z-0" />

            {roadmap.map((item, index) => (
              <motion.div
                key={index}
                variants={slideLeftVariants}
                className="relative z-10 flex items-center group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shrink-0 mr-6 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
                  <div className="w-3 h-3 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                    {item.year}
                  </h4>
                  <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
