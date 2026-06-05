"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  ChevronRight,
  Mouse,
  Star,
  Navigation,
  Car,
  CreditCard,
  Headset,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface StatProps {
  value: string;
  label: string;
}

interface FeatureCardProps {
  title: string;
  icon: React.ElementType;
  position: string;
  delay: number;
}

const featuresData: FeatureCardProps[] = [
  {
    title: "Live Tracking",
    icon: Navigation,
    position: "-top-6 -right-6 lg:-right-12",
    delay: 0.2,
  },
  {
    title: "Secure Payments",
    icon: CreditCard,
    position: "-bottom-6 -left-6 lg:-left-12",
    delay: 0.4,
  },
  {
    title: "Verified Drivers",
    icon: UserCheck,
    position: "-bottom-8 -right-4 lg:-right-8",
    delay: 0.6,
  },
  {
    title: "24/7 Support",
    icon: Headset,
    position: "-top-4 -left-4 lg:-left-8",
    delay: 0.8,
  },
];

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const router = useRouter();
  return (
    <section className="relative min-h-screen w-full bg-slate-900 overflow-hidden flex items-center pt-24 pb-16 lg:pt-0 lg:pb-0 font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-10 z-10 lg:mt-30 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Column Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">
                Trusted by Thousands of Riders
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Driving the <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Future
              </span>{" "}
              of Smart Transportation
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-300 mb-10 max-w-xl leading-relaxed"
            >
              Rydex connects riders and drivers through a fast, secure, and
              intelligent booking experience. Our mission is to make
              transportation accessible, affordable, and reliable for everyone.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
            >
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
              >
                <span>Book a Ride</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  router.push("/partner/onboarding/vehicle");
                }}
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border border-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Become a Partner
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column Visuals */}
          <div className="relative w-full max-w-lg mx-auto lg:mr-0 mt-10 lg:mt-0">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative z-10 w-full rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-6 shadow-2xl"
            >
              {/* Booking Card UI */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/50">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Current Ride
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-emerald-400 text-sm font-medium">
                      On time
                    </span>
                  </div>
                </div>
                <div className="bg-blue-600/20 px-3 py-1.5 rounded-lg border border-blue-500/20">
                  <span className="text-blue-400 font-bold text-lg">3 min</span>
                  <span className="text-blue-400/80 text-xs ml-1 block text-center">
                    ETA
                  </span>
                </div>
              </div>

              <div className="relative pl-8 mb-8">
                {/* Timeline Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-700"></div>

                {/* Pickup */}
                <div className="relative mb-6">
                  <div className="absolute -left-8 top-1 w-6 h-6 bg-slate-900 rounded-full border-[3px] border-blue-500 z-10"></div>
                  <p className="text-slate-400 text-sm mb-1">Pickup Location</p>
                  <p className="text-white font-medium">
                    124 Innovation Drive, Tech Park
                  </p>
                </div>

                {/* Dropoff */}
                <div className="relative">
                  <div className="absolute -left-8 top-1 w-6 h-6 bg-slate-900 rounded-full border-[3px] border-slate-600 z-10"></div>
                  <p className="text-slate-400 text-sm mb-1">Destination</p>
                  <p className="text-white font-medium">
                    789 Horizon Avenue, Downtown
                  </p>
                </div>
              </div>

              {/* Driver Profile */}
              <div className="flex items-center gap-4 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="text-white w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Alex M.</h4>
                  <p className="text-slate-400 text-sm flex items-center gap-2">
                    <Car className="w-3 h-3" /> Premium Sedan
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold text-sm">4.9</span>
                  </div>
                  <span className="text-slate-400 text-xs mt-1">
                    2.4k rides
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Floating Feature Cards */}
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: feature.delay + 1, duration: 0.5 }}
                className={`absolute ${feature.position} z-20 hidden sm:flex items-center gap-3 bg-slate-800/80 backdrop-blur-md border border-slate-600/50 p-3 rounded-xl shadow-lg`}
              >
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                  <feature.icon className="w-5 h-5" />
                </div>
                <span className="text-slate-200 font-medium text-sm whitespace-nowrap">
                  {feature.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
