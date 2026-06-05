"use client";
import React, { useState } from "react";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  MessageSquare,
  User,
  Mail,
  Phone,
  Folder,
  FileText,
  Send,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  Headphones,
  Loader2,
  AlertCircle,
} from "lucide-react";

const contactFormSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the processing of your information",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
  },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 },
  },
};

export default function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useReactHookForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      inquiryType: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  const messageContent = watch("message", "");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
  };

  return (
    <section className="relative w-full py-24 lg:py-32 bg-[#FAFBFF] overflow-hidden">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-50/60 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* --- Section Header --- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600">
              <MessageSquare size={14} />
            </span>
            <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Contact Support
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Let&apos;s Start the Conversation
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Have a question, concern, or business inquiry? Fill out the form
            below and our specialized team will get back to you as quickly as
            possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* --- Left Column: Information Panel --- */}
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 mb-8 border border-blue-100/50">
                <Headphones className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Why Contact Rydex?
              </h3>
              <p className="text-slate-600 mb-10 leading-relaxed">
                We are committed to providing an exceptional experience. Our
                support infrastructure is designed to resolve your inquiries
                efficiently and securely.
              </p>

              {/* Feature List */}
              <div className="flex flex-col gap-6 mb-10">
                {[
                  {
                    icon: Clock,
                    title: "Fast Response",
                    desc: "Average response within hours.",
                  },
                  {
                    icon: Award,
                    title: "Dedicated Support",
                    desc: "Specialized teams for every inquiry.",
                  },
                  {
                    icon: Shield,
                    title: "Secure Communication",
                    desc: "Your information remains protected.",
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats & Availability */}
              <div className="pt-8 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xl font-bold text-slate-900">24/7</p>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Availability
                    </p>
                  </div>
                  <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xl font-bold text-slate-900">98%</p>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Satisfaction
                    </p>
                  </div>
                </div>

                {/* Online Indicator */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    Support Team Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- Right Column: Form Card --- */}
          <motion.div
            variants={slideRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[2rem] p-8 lg:p-12 border border-slate-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] relative z-20">
              <AnimatePresence mode="wait">
                {isSuccess ?
                  /* --- Success State --- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      Message Sent Successfully
                    </h3>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                      Our support team has received your request. We aim to
                      respond to all inquiries within a few hours.
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-8 py-3 bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                : /* --- Form State --- */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                    noValidate
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="fullName"
                          className="text-sm font-semibold text-slate-700"
                        >
                          Full Name <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            {...register("fullName")}
                            aria-invalid={errors.fullName ? "true" : "false"}
                            className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                              errors.fullName ?
                                "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                              : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                            }`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />{" "}
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold text-slate-700"
                        >
                          Email Address <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                            aria-invalid={errors.email ? "true" : "false"}
                            className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                              errors.email ?
                                "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                              : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />{" "}
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone Number */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-semibold text-slate-700"
                        >
                          Phone Number{" "}
                          <span className="text-slate-400 font-normal">
                            (Optional)
                          </span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            {...register("phone")}
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                      </div>

                      {/* Inquiry Type */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="inquiryType"
                          className="text-sm font-semibold text-slate-700"
                        >
                          Inquiry Type <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <Folder className="w-5 h-5" />
                          </div>
                          <select
                            id="inquiryType"
                            {...register("inquiryType")}
                            aria-invalid={errors.inquiryType ? "true" : "false"}
                            className={`w-full pl-11 pr-10 py-3.5 bg-slate-50 border rounded-xl text-slate-900 appearance-none focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                              errors.inquiryType ?
                                "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                              : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                            }`}
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            <option value="General Inquiry">
                              General Inquiry
                            </option>
                            <option value="Ride Support">Ride Support</option>
                            <option value="Driver Support">
                              Driver Support
                            </option>
                            <option value="Safety Concern">
                              Safety Concern
                            </option>
                            <option value="Lost & Found">Lost & Found</option>
                            <option value="Business Partnership">
                              Business Partnership
                            </option>
                            <option value="Technical Support">
                              Technical Support
                            </option>
                          </select>
                          {/* Custom Dropdown Arrow */}
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        {errors.inquiryType && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />{" "}
                            {errors.inquiryType.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Subject <span className="text-blue-600">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                          <FileText className="w-5 h-5" />
                        </div>
                        <input
                          id="subject"
                          type="text"
                          placeholder="Briefly describe your request"
                          {...register("subject")}
                          aria-invalid={errors.subject ? "true" : "false"}
                          className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                            errors.subject ?
                              "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                          }`}
                        />
                      </div>
                      {errors.subject && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{" "}
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="message"
                          className="text-sm font-semibold text-slate-700"
                        >
                          Message <span className="text-blue-600">*</span>
                        </label>
                        <span
                          className={`text-xs ${
                            (
                              messageContent.length < 20 &&
                              messageContent.length > 0
                            ) ?
                              "text-red-500"
                            : "text-slate-400"
                          }`}
                        >
                          {messageContent.length}/500
                        </span>
                      </div>
                      <textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        maxLength={500}
                        {...register("message")}
                        aria-invalid={errors.message ? "true" : "false"}
                        className={`w-full p-4 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 resize-y min-h-[120px] focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                          errors.message ?
                            "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{" "}
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input
                            type="checkbox"
                            {...register("consent")}
                            className="peer w-5 h-5 appearance-none border border-slate-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-1 transition-all"
                          />
                          <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                          I agree to the processing of my information for
                          support purposes as outlined in the{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{" "}
                          {errors.consent.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`relative w-full flex items-center justify-center gap-2 mt-4 py-4 rounded-xl text-white font-semibold shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 ${
                        isSubmitting ?
                          "bg-indigo-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_12px_25px_-6px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 active:translate-y-0"
                      }`}
                    >
                      {isSubmitting ?
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      : <>
                          Send Message
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      }
                    </button>
                  </motion.form>
                }
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
