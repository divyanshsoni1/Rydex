"use client";
import { motion, Variants } from "framer-motion";
import {
  MessageCircle,
  Zap,
  Users,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Clock,
  ThumbsUp,
  ArrowRight,
  Headphones,
} from "lucide-react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// You should also do this for the container variants to be safe!
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

const floatVariants = (delay: number = 0) => ({
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: delay,
    },
  },
});

export default function ContactHero() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center mt-5 justify-center overflow-hidden bg-[#FAFBFF]">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* --- Left Column: Content --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left max-w-2xl"
          >
            {/* Premium Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600">
                <Headphones size={14} />
              </span>
              <span className="text-sm font-semibold text-slate-700">
                24/7 Customer Support
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
            >
              Get in Touch with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Rydex
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed"
            >
              Whether you have questions about bookings, partnerships, driver
              support, or technical issues, our team is ready to assist you with
              fast and reliable solutions.
            </motion.p>

            {/* Quick Contact Highlights */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 mb-10"
            >
              {[
                { icon: Zap, label: "Fast Response" },
                { icon: Users, label: "Dedicated Team" },
                { icon: ShieldCheck, label: "Secure Comms" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-slate-700"
                >
                  <feature.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(79,70,229,0.6)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Contact Support{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-300">
                Help Center
              </button>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Visual Area --- */}
          <div className="relative w-full h-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            {/* Main Glassmorphism Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative z-20 w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-8"
            >
              {/* Online Status Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                  </div>
                  <span className="font-semibold text-slate-800">
                    Support Team Online
                  </span>
                </div>
              </div>

              {/* Avatar Group */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex -space-x-4">
                  {[
                    "bg-gradient-to-br from-blue-400 to-blue-600",
                    "bg-gradient-to-br from-indigo-400 to-indigo-600",
                    "bg-gradient-to-br from-purple-400 to-purple-600",
                    "bg-gradient-to-br from-emerald-400 to-emerald-600",
                  ].map((bgClass, i) => (
                    <div
                      key={i}
                      className={`w-14 h-14 rounded-full border-4 border-white ${bgClass} flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white font-bold text-sm">
                        {["JD", "SA", "MK", "AL"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: Clock,
                    title: "< 5 Min Avg Response",
                    desc: "Lightning fast replies",
                  },
                  {
                    icon: ThumbsUp,
                    title: "98% Satisfaction Rate",
                    desc: "Consistently highly rated",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 border border-slate-100 shadow-sm"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">
                        {stat.title}
                      </h4>
                      <p className="text-xs text-slate-500">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* --- Floating Decorative Elements --- */}

            {/* Floating Card 1: Message Received */}
            <motion.div
              variants={floatVariants(0)}
              initial="initial"
              animate="animate"
              className="absolute -top-6 right-4 lg:-right-10 z-30 flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-xl border border-slate-100"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Message Received
                </p>
                <p className="text-[10px] text-slate-500">Agent assigned</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Support Resolved */}
            <motion.div
              variants={floatVariants(1.5)}
              initial="initial"
              animate="animate"
              className="absolute top-1/2 -left-6 lg:-left-16 z-30 flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-xl border border-slate-100"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-800">
                Request Resolved
              </p>
            </motion.div>

            {/* Floating Card 3: Location */}
            <motion.div
              variants={floatVariants(3)}
              initial="initial"
              animate="animate"
              className="absolute -bottom-8 right-10 z-30 flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-xl border border-slate-100"
            >
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Serving Riders
                </p>
                <p className="text-[10px] text-slate-500">Across India</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
