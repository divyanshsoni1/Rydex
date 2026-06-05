"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Headphones,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Star,
  Zap,
  ShieldCheck,
} from "lucide-react";

// --- Data Configuration ---
const trustFeatures = [
  "24/7 Customer Support",
  "Fast Response Times",
  "Secure Communication",
];

const floatingCards = [
  {
    id: "request-received",
    text: "Support Request Received",
    icon: CheckCircle2,
    position: "top-[15%] left-[5%]",
    delay: 0,
  },
  {
    id: "satisfaction",
    text: "98% Satisfaction Rate",
    icon: Star,
    position: "top-[25%] right-[5%]",
    delay: 1.5,
  },
  {
    id: "fast-resolution",
    text: "Fast Resolution Team",
    icon: Zap,
    position: "bottom-[20%] left-[8%]",
    delay: 2,
  },
  {
    id: "trusted",
    text: "Trusted by Riders",
    icon: ShieldCheck,
    position: "bottom-[25%] right-[8%]",
    delay: 0.5,
  },
];

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const floatVariants = (delay: number): Variants => ({
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: delay,
    },
  },
});

export default function FinalCTASection() {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-[#FAFBFF] overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        
        {/* --- Main CTA Card --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.4)] px-6 py-16 md:py-24 lg:px-20"
        >
          {/* --- Background Visual Layer --- */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Blurred Gradient Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-400/20 blur-[100px]" />
            <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-purple-400/20 blur-[80px]" />
            
            {/* Soft Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* --- Floating Decorative Cards (Desktop Only) --- */}
          {floatingCards.map((card) => (
            <motion.div
              key={card.id}
              variants={floatVariants(card.delay)}
              animate="animate"
              className={`absolute z-10 hidden xl:flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl ${card.position}`}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                <card.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-white tracking-wide">
                {card.text}
              </span>
            </motion.div>
          ))}

          {/* --- Content Container --- */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto">
            
            {/* Premium Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-8"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-white">
                <Headphones size={14} />
              </span>
              <span className="text-sm font-semibold text-white tracking-wide uppercase">
                We&apos;re Ready to Help
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6"
            >
              Our Team Is Ready to Assist You
            </motion.h2>

            {/* Supporting Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl"
            >
              Whether you&apos;re booking your next ride, managing a driver
              account, exploring partnership opportunities, or need immediate
              assistance, the Rydex team is always here to help.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-12 w-full"
            >
              {trustFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white transition-all hover:bg-white/10 hover:-translate-y-0.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-300" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
            >
              <button className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-[0_8px_20px_-6px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_25px_-6px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50">
                Contact Support
                <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>
              
              <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50">
                Explore Help Center
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Support Availability Card */}
            <motion.div
              variants={itemVariants}
              className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-2xl bg-black/10 backdrop-blur-md border border-white/10"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-sm font-semibold text-white">
                  Support Team Online
                </span>
              </div>
              <span className="hidden sm:block text-white/30">•</span>
              <span className="text-sm text-indigo-100">
                Average response time under 5 minutes
              </span>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}