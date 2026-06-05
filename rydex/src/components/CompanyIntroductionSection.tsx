"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  MapPinned,
  Wallet,
  Clock3,
  Smartphone,
  Car,
  Map,
  Shield,
  Zap,
  CheckCircle2,
  Navigation,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TrustStatProps {
  value: string;
  label: string;
}

const features: FeatureCardProps[] = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description: "Verified drivers and secure rides.",
  },
  {
    icon: MapPinned,
    title: "Live Tracking",
    description: "Track every ride in real time.",
  },
  {
    icon: Wallet,
    title: "Secure Payments",
    description: "Fast and protected transactions.",
  },
  {
    icon: Clock3,
    title: "Instant Booking",
    description: "Book rides within seconds.",
  },
];

const stats: TrustStatProps[] = [
  { value: "10,000+", label: "Rides Completed" },
  { value: "5,000+", label: "Happy Riders" },
  { value: "500+", label: "Driver Partners" },
];

export default function CompanyIntroductionSection() {
  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatVariants = (delay: number = 0): Variants => ({
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  });

  return (
    <section className="relative w-full py-24 overflow-hidden bg-slate-950 font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-30" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left Column: Visual Storytelling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-1 relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center"
          >
            {/* Connecting SVG Lines */}
            <svg
              className="absolute inset-0 w-full h-full text-slate-700/50"
              z-index="0"
            >
              <path
                d="M 50% 50% L 20% 25% M 50% 50% L 80% 25% M 50% 50% L 20% 75% M 50% 50% L 80% 75%"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
                fill="none"
              />
            </svg>

            {/* Central Ecosystem Hub (App) */}
            <motion.div
              variants={floatVariants(0)}
              animate="animate"
              className="relative z-10 w-64 h-80 bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] p-4 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="w-8 h-2 bg-slate-800 rounded-full" />
                <div className="w-16 h-2 bg-slate-800 rounded-full" />
              </div>

              {/* Mock Map Area */}
              <div className="flex-1 bg-slate-800/50 rounded-2xl relative overflow-hidden mb-4 border border-slate-700/50 p-3">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1e293b,transparent)] opacity-50" />
                {/* Route Line */}
                <svg
                  className="absolute inset-0 w-full h-full text-blue-500"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 20 80 Q 50 50 80 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="animate-[dash_20s_linear_infinite]"
                  />
                </svg>
                {/* Points */}
                <div className="absolute top-[15%] right-[15%] w-4 h-4 bg-white rounded-full border-[3px] border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10" />
                <div className="absolute bottom-[15%] left-[15%] w-4 h-4 bg-white rounded-full border-[3px] border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] z-10" />

                {/* Moving Car */}
                <motion.div
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-[50%] left-[50%] w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <Car className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Mock UI elements */}
              <div className="space-y-3">
                <div className="h-10 bg-slate-800/80 rounded-xl flex items-center px-3 gap-3 border border-slate-700/50">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Navigation className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="h-2 flex-1 bg-slate-700 rounded-full" />
                </div>
                <div className="h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 text-blue-400 text-sm font-semibold">
                  Searching for driver...
                </div>
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              variants={floatVariants(0.5)}
              animate="animate"
              className="absolute top-[10%] left-[5%] z-20"
            >
              <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 px-4 py-2 rounded-2xl shadow-xl">
                <div className="bg-emerald-500/20 p-1.5 rounded-lg text-emerald-400">
                  <Map className="w-4 h-4" />
                </div>
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  Real-Time Tracking
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={floatVariants(1.2)}
              animate="animate"
              className="absolute top-[15%] right-[0%] z-20"
            >
              <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 px-4 py-2 rounded-2xl shadow-xl">
                <div className="bg-amber-500/20 p-1.5 rounded-lg text-amber-400">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  Fast Booking
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={floatVariants(0.8)}
              animate="animate"
              className="absolute bottom-[15%] left-[0%] z-20"
            >
              <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 px-4 py-2 rounded-2xl shadow-xl">
                <div className="bg-blue-500/20 p-1.5 rounded-lg text-blue-400">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  Secure Payments
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={floatVariants(1.5)}
              animate="animate"
              className="absolute bottom-[10%] right-[5%] z-20"
            >
              <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 px-4 py-2 rounded-2xl shadow-xl">
                <div className="bg-purple-500/20 p-1.5 rounded-lg text-purple-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-white text-sm font-medium whitespace-nowrap">
                  Verified Drivers
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-2 lg:order-2 flex flex-col"
          >
            <motion.div variants={fadeUpVariants} className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700/50 text-blue-400 text-xs font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                About Rydex
              </div>
            </motion.div>

            <motion.h3
              variants={slideLeftVariants}
              className="text-xl font-medium text-slate-300 mb-2"
            >
              Who We Are
            </motion.h3>

            <motion.h2
              variants={slideLeftVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
            >
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
                Smarter Mobility
              </span>{" "}
              <br className="hidden sm:block" />
              for Modern Cities
            </motion.h2>

            <motion.div
              variants={fadeUpVariants}
              className="space-y-4 mb-10 text-slate-400 text-lg leading-relaxed"
            >
              <p>
                Rydex is a next-generation ride booking platform designed to
                connect riders and drivers through technology-driven mobility
                solutions. We simplify transportation by providing fast
                bookings, real-time tracking, secure payments, and reliable
                driver partnerships.
              </p>
              <p>
                Our platform is built with a mission to redefine urban
                transportation by making every journey safer, more efficient,
                and more accessible. Whether it's a daily commute or a
                long-distance ride, Rydex delivers a seamless travel experience
                powered by innovation.
              </p>
            </motion.div>

            {/* Feature Grid */}
            <motion.div
              variants={fadeUpVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Global CSS animation definition for the dashed line route */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `,
        }}
      />
    </section>
  );
}
