"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Navigation,
  ShieldCheck,
  CreditCard,
  Zap,
  Headphones,
  Smartphone,
  CheckCircle2,
  CircleDot,
  MapPin,
  Car,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Interfaces for Data Structures
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface ShowcaseStep {
  title: string;
  icon: React.ElementType;
  status: "completed" | "active" | "upcoming";
}

// Data
const features: Feature[] = [
  {
    icon: Navigation,
    title: "Real-Time Ride Tracking",
    description:
      "Monitor your ride live with accurate location updates and seamless tracking from pickup to destination.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Driver Network",
    description:
      "Every driver goes through verification processes to ensure safer and more reliable journeys.",
  },
  {
    icon: CreditCard,
    title: "Secure Digital Payments",
    description:
      "Experience fast, protected, and hassle-free transactions through secure payment integrations.",
  },
  {
    icon: Zap,
    title: "Instant Booking Experience",
    description:
      "Book rides quickly with an optimized interface designed for speed and convenience.",
  },
  {
    icon: Headphones,
    title: "Dedicated Customer Support",
    description:
      "Access responsive support whenever assistance is needed throughout your travel experience.",
  },
  {
    icon: Smartphone,
    title: "Technology-Driven Platform",
    description:
      "Built using modern technologies to provide a smooth, reliable, and scalable transportation experience.",
  },
];

const showcaseSteps: ShowcaseStep[] = [
  { title: "Pickup Confirmed", icon: MapPin, status: "completed" },
  { title: "Driver Assigned", icon: Car, status: "completed" },
  { title: "Ride In Progress", icon: CircleDot, status: "active" },
  { title: "Destination Reached", icon: CheckCircle, status: "upcoming" },
];

const benefitsList: string[] = [
  "Easy ride scheduling",
  "Transparent ride information",
  "Reliable trip management",
  "Smooth booking workflow",
  "Consistent user experience",
];

export default function WhyChooseRydexSection() {
  // Animation Variants
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideRightVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const slideLeftVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const router = useRouter();

  return (
    <section className="relative w-full py-24 bg-slate-950 overflow-hidden font-sans text-slate-300">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-1/4 left-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[140px]" />
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
          <motion.div
            variants={fadeUpVariants}
            className="relative p-[1px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] mb-6"
          >
            <div className="bg-slate-950/80 backdrop-blur-md rounded-full px-5 py-2">
              <span className="text-cyan-400 text-xs font-extrabold tracking-widest uppercase">
                Why Choose Rydex
              </span>
            </div>
          </motion.div>

          <motion.h3
            variants={fadeUpVariants}
            className="text-xl font-medium text-blue-400/90 mb-3"
          >
            Designed Around Your Journey
          </motion.h3>

          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6"
          >
            Everything You Need For <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              A Better Ride Experience
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-lg text-slate-400 leading-relaxed"
          >
            Rydex is built to simplify transportation through intelligent
            technology, reliable service, and customer-focused innovation. Every
            feature is designed to make booking, tracking, and completing rides
            faster, safer, and more convenient.
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32"
          role="list"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              whileHover={{ scale: 1.03 }}
              role="listitem"
              className="group relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:bg-slate-800/60 hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgb(6,182,212,0.15)] transition-all duration-300 flex flex-col items-start"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/5 group-hover:to-cyan-400/5 rounded-3xl transition-colors duration-300" />

              <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-colors duration-300 relative z-10 shadow-lg">
                <feature.icon className="w-7 h-7 text-blue-400 group-hover:text-cyan-400 transition-colors" />
              </div>

              <h4 className="text-xl font-bold text-white mb-3 relative z-10">
                {feature.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Customer Experience Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center mb-32 overflow-hidden">
          {/* Left Side: Visual Mockup */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideRightVariants}
            className="w-full flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md p-8 rounded-[2.5rem] bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-2xl border border-slate-700/50 shadow-[0_0_50px_rgba(37,99,235,0.15)]">
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-8 text-center">
                Ride Experience
              </h4>

              <div className="relative pl-10 space-y-8">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-700/50 rounded-full">
                  <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
                </div>

                {/* Steps */}
                {showcaseSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-center">
                    {/* Status Indicator */}
                    <div className="absolute -left-10 w-6 h-6 rounded-full flex items-center justify-center bg-slate-900 border-2 z-10">
                      {step.status === "completed" ?
                        <div className="w-full h-full rounded-full bg-blue-500 border-2 border-slate-900 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      : step.status === "active" ?
                        <div className="w-full h-full rounded-full bg-cyan-400 border-2 border-slate-900 flex items-center justify-center relative">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                          <div className="w-2 h-2 rounded-full bg-white relative" />
                        </div>
                      : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                    </div>

                    {/* Step Content */}
                    <div
                      className={`flex items-center gap-4 w-full p-4 rounded-2xl border transition-all duration-300 ${
                        step.status === "active" ?
                          "bg-blue-600/10 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                        : "bg-slate-800/30 border-transparent hover:bg-slate-800/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl ${
                          step.status === "active" ?
                            "bg-cyan-500/20 text-cyan-400"
                          : "bg-slate-900 text-slate-400"
                        }`}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`font-semibold ${
                          step.status === "active" ? "text-white"
                          : step.status === "completed" ? "text-slate-200"
                          : "text-slate-500"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideLeftVariants}
            className="flex flex-col"
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Built Around Convenience
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              From booking a ride to reaching your destination, every
              interaction within Rydex is carefully designed to provide a
              seamless and stress-free travel experience.
            </p>

            <ul className="space-y-4" role="list">
              {benefitsList.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 bg-slate-900/30 border border-slate-800/60 p-4 rounded-2xl hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-slate-200 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Trust Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scaleInVariants}
          className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 via-slate-900 to-cyan-900/20 border border-blue-500/30 p-10 sm:p-14 text-center overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.15)]"
        >
          {/* Ambient overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2563eb_0%,transparent_60%)] opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Your Journey, Powered By Innovation
            </h3>
            <p className="text-slate-300 text-lg mb-10">
              Rydex combines technology, safety, and convenience to deliver a
              transportation experience built for modern lifestyles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Book Your Ride
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-600 text-white font-bold text-lg hover:bg-slate-700/50 hover:border-slate-400 transition-all duration-300 flex items-center justify-center"
              >
                Explore Features
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
