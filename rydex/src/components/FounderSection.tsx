'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import {
  Lightbulb,
  ShieldCheck,
  Rocket,
  Globe,
  Mail,
  Code,
  Cpu,
  Car
} from 'lucide-react';
import Founder from "../../public/Founder.png"

// --- Custom Brand Icons (Replaces the removed Lucide brand icons) ---
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
// -------------------------------------------------------------------

interface Principle {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ElementType;
}

interface FloatingBadge {
  title: string;
  icon: React.ElementType;
  position: string;
  delay: number;
}

const principles: Principle[] = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Building solutions that simplify transportation through technology.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust',
    description: 'Creating reliable experiences for riders and driver partners.',
  },
  {
    icon: Rocket,
    title: 'Growth',
    description: 'Continuously improving the platform to meet evolving mobility needs.',
  },
];

const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/divyansh-soni', icon: LinkedinIcon },
  { name: 'GitHub', url: 'https://github.com/divyansh-soni', icon: GithubIcon },
  { name: 'Portfolio', url: 'https://divyanshsoni.com', icon: Globe },
  { name: 'Email', url: 'mailto:contact@divyanshsoni.com', icon: Mail },
];

const floatingBadges: FloatingBadge[] = [
  { title: 'Founder & Developer', icon: Code, position: 'top-10 -left-6 sm:-left-10', delay: 0 },
  { title: 'Full Stack Engineer', icon: Cpu, position: 'bottom-32 -right-6 sm:-right-10', delay: 1.5 },
  { title: 'Mobility Innovator', icon: Car, position: '-bottom-6 left-10 sm:left-16', delay: 3 },
];

export default function FounderSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const slideRightVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const slideLeftVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const floatAnimation = (delay: number): Variants => ({
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    },
  });

  return (
    <section className="relative w-full py-24 bg-slate-950 overflow-hidden font-sans text-slate-300">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-25" />
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideRightVariants}
            className="relative w-full max-w-md mx-auto lg:mx-0 lg:max-w-lg mt-10 lg:mt-0 order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-[2.5rem] blur-2xl opacity-20 transform -rotate-3 scale-105" />
            
            <div className="relative aspect-[4/5] rounded-[2.5rem] bg-slate-900 border border-slate-700/50 shadow-[0_0_50px_rgba(37,99,235,0.15)] overflow-hidden group">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src={Founder}
                alt="Divyansh Soni - Founder of Rydex"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent z-10 opacity-60" />
            </div>

            {floatingBadges.map((badge, index) => (
              <motion.div
                key={index}
                variants={floatAnimation(badge.delay)}
                animate="animate"
                className={`absolute ${badge.position} z-20`}
              >
                <div className="flex items-center gap-3 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 px-4 py-2.5 rounded-2xl shadow-xl shadow-black/20 group hover:border-cyan-500/50 transition-colors duration-300">
                  <div className="bg-slate-900/80 p-2 rounded-xl text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <badge.icon className="w-4 h-4" />
                  </div>
                  <span className="text-white text-sm font-semibold whitespace-nowrap">
                    {badge.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col order-1 lg:order-2"
          >
            <motion.div variants={fadeUpVariants} className="flex flex-col items-start mb-6">
              <div className="relative p-[1px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] mb-5">
                <div className="bg-slate-950/80 backdrop-blur-md rounded-full px-4 py-1.5">
                  <span className="text-cyan-400 text-xs font-extrabold tracking-widest uppercase">
                    Meet The Founder
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-medium text-blue-400/90 mb-2">The Person Behind Rydex</h3>
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-[1.15]">
                Driven by Innovation, <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                  Built with Purpose
                </span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mb-8">
              <h4 className="text-2xl font-bold text-white mb-1">Divyansh Soni</h4>
              <p className="text-cyan-400 font-medium">Founder & Full Stack Developer</p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="space-y-4 mb-10 text-[17px] leading-relaxed text-slate-400">
              <p>
                Divyansh Soni is the founder and creator of Rydex, a technology-driven vehicle booking platform focused on delivering smarter, safer, and more accessible transportation experiences. With a strong passion for software engineering and innovation, he built Rydex to address real-world mobility challenges through modern technology.
              </p>
              <p>
                From concept to deployment, every aspect of Rydex has been carefully designed and developed with the goal of creating a seamless transportation ecosystem. By combining user-centric design, scalable architecture, and real-time technologies, Divyansh continues to shape Rydex into a platform built for the future of mobility.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
            >
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  className="flex flex-col p-5 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                    <principle.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h5 className="text-white font-semibold mb-2">{principle.title}</h5>
                  <p className="text-slate-400 text-sm leading-relaxed">{principle.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.blockquote 
              variants={fadeUpVariants}
              className="relative pl-6 py-2 border-l-4 border-cyan-400 mb-10 bg-gradient-to-r from-cyan-900/10 to-transparent"
            >
              <p className="text-xl sm:text-2xl font-medium text-slate-200 italic mb-4 leading-relaxed">
                "Technology should make everyday life simpler. Rydex is my commitment to building transportation experiences that are reliable, accessible, and designed around people."
              </p>
              <footer className="flex flex-col">
                <strong className="text-white font-semibold">— Divyansh Soni</strong>
                <span className="text-slate-500 text-sm">Founder, Rydex</span>
              </footer>
            </motion.blockquote>

            <motion.div variants={fadeUpVariants} className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Divyansh Soni's ${social.name}`}
                  className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}