"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Headphones,
  Phone,
  MapPin,
  Handshake,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

interface ContactCardData {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  primaryInfo: string;
  secondaryInfo: string;
  badgeText?: string;
  statusIndicator?: "online" | "offline";
  ctaLabel: string;
  ctaLink: string;
  theme: {
    iconBg: string;
    iconColor: string;
    hoverBorder: string;
  };
}

const contactCards: ContactCardData[] = [
  {
    id: "customer-support",
    icon: Headphones,
    title: "Customer Support",
    description:
      "Assistance with bookings, ride issues, and account management.",
    primaryInfo: "support@rydex.com",
    secondaryInfo: "Available 24/7",
    statusIndicator: "online",
    badgeText: "< 5 Min Response",
    ctaLabel: "Get Support",
    ctaLink: "#support",
    theme: {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverBorder: "hover:border-blue-200",
    },
  },
  {
    id: "call-support",
    icon: Phone,
    title: "Call Us",
    description: "For urgent inquiries, emergencies, and immediate assistance.",
    primaryInfo: "+1 (800) 555-0199",
    secondaryInfo: "Mon–Sun, 8am–8pm",
    badgeText: "Dedicated Team",
    ctaLabel: "Call Now",
    ctaLink: "tel:+18005550199",
    theme: {
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-200",
    },
  },
  {
    id: "head-office",
    icon: MapPin,
    title: "Head Office",
    description: "Main office location, legal inquiries, and corporate visits.",
    primaryInfo: "450 Mobility Avenue",
    secondaryInfo: "Vijay Nagar, Indore 452001",
     badgeText: "Office Address",
    ctaLabel: "View Location",
    ctaLink: "#location",
    theme: {
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverBorder: "hover:border-purple-200",
    },
  },
  {
    id: "partnerships",
    icon: Handshake,
    title: "Partnerships",
    description:
      "Corporate partnerships, fleet collaborations, and B2B inquiries.",
    primaryInfo: "partners@rydex.com",
    secondaryInfo: "Business Support Team",
    badgeText: "Business Hours",
    ctaLabel: "Contact Business Team",
    ctaLink: "#partnerships",
    theme: {
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      hoverBorder: "hover:border-indigo-200",
    },
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function ContactCardsSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-[#FAFBFF] overflow-hidden">
      {/* --- Background Design Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-blue-100/50 to-transparent blur-[100px] rounded-full" />
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600">
              <MessageSquare size={14} />
            </span>
            <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Contact Information
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Multiple Ways to Reach Us
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Whether you need booking assistance, partnership support, or
            technical help, our dedicated team is available through multiple
            communication channels.
          </p>
        </motion.div>

        {/* --- Contact Cards Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className={`group relative flex flex-col p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out hover:-translate-y-2 ${card.theme.hoverBorder} focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none`}
              tabIndex={0}
              aria-label={`Contact option: ${card.title}`}
            >
              {/* Top Area: Icon & Badges */}
              <div className="flex items-start justify-between mb-8">
                <div
                  className={`relative flex items-center justify-center w-14 h-14 rounded-2xl ${card.theme.iconBg} ${card.theme.iconColor} transition-transform duration-500 group-hover:scale-110`}
                >
                  <card.icon className="w-6 h-6 relative z-10" />
                  {/* Subtle Glow Behind Icon on Hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl ${card.theme.iconBg} blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />
                </div>

                {/* Optional Status Indicators / Badges */}
                {card.statusIndicator === "online" && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Online
                    </span>
                  </div>
                )}

                {card.badgeText && !card.statusIndicator && (
                  <div className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {card.badgeText}
                    </span>
                  </div>
                )}
              </div>

              {/* Middle Area: Title & Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom Area: Contact Details & CTA */}
              <div className="mt-auto pt-6 border-t border-slate-100">
                <div className="mb-6">
                  <p className="text-base font-semibold text-slate-900 mb-1">
                    {card.primaryInfo}
                  </p>
                  <p className="text-sm text-slate-500">{card.secondaryInfo}</p>
                </div>

                <a
                  href={card.ctaLink}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-md"
                >
                  {card.ctaLabel}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
