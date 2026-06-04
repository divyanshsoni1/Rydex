"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoaderCircle, Lock, Mail, User, X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type propType = {
  open: boolean;
  onClose: () => void;
};

type steptype = "login" | "signup" | "otp";

function AuthModal({ open, onClose }: propType) {
  const [step, setStep] = useState<steptype>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setError("");
      setStep("otp");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message ?? "Something went wrong!");
    }
  };

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/verify-email", {
        email,
        otp: otp.join(""),
      });
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setStep("login");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message ?? "Something went wrong!");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password");
      } else if (res?.ok) {
        router.push("/");
        onClose();
      }
    } catch (error: any) {
      setError(error.response.data.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const handleChangeOtp = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-90 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="fixed inset-0 z-100 flex items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
                {/* X button */}
                <div
                  className="absolute right-4 top-4 text-gray-500 hover:text-black transition cursor-pointer"
                  onClick={onClose}
                >
                  <X size={20} />
                </div>
                {/* Modal Heading */}
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-extrabold tracking-widest">
                    RYDEX
                  </h1>
                  <p className="mt-1 text-xs text-gray-500">
                    Premium Vehicle Booking
                  </p>
                </div>
                {/* Google Button */}
                <button
                  className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm cursor-pointer font-semibold hover:bg-black hover:text-white transition"
                  onClick={handleGoogleLogin}
                >
                  <Image
                    src={"/google.png"}
                    alt="google"
                    width={20}
                    height={20}
                  />
                  Continue with google
                </button>
                {/* OR Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-black/10" />
                  <div className="text-xm text-gray-500">OR</div>
                  <div className="flex-1 h-px bg-black/10" />
                </div>
                {/* Steps Div */}
                <div>
                  {/* Login */}
                  {step == "login" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h1 className="text-xl font-bold text-center">
                        Welcome Back!
                      </h1>
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>

                        <button
                          className="w-full cursor-pointer h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex items-center justify-center"
                          onClick={handleLogin}
                        >
                          {loading ?
                            <LoaderCircle
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          : "Login"}
                        </button>
                      </div>

                      <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{"  "}
                        <span
                          className="text-blue-500 font-medium cursor-pointer"
                          onClick={() => setStep("signup")}
                        >
                          SignUp
                        </span>
                      </p>
                    </motion.div>
                  )}

                  {/* SignUp */}
                  {step == "signup" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h1 className="text-xl font-bold text-center">
                        Create New Account
                      </h1>
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <User size={18} className="text-gray-500" />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>

                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-transparent outline-none text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-center">*{error}</p>
                        )}
                        <button
                          className="w-full cursor-pointer h-11 rounded-xl bg-black flex justify-center items-center text-white font-semibold hover:bg-gray-900 transition"
                          onClick={handleSignUp}
                          disabled={loading}
                        >
                          {loading ?
                            <LoaderCircle
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          : "Send OTP"}
                        </button>
                      </div>

                      <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{"  "}
                        <span
                          className="text-blue-500 font-medium cursor-pointer"
                          onClick={() => setStep("login")}
                        >
                          Login
                        </span>
                      </p>
                    </motion.div>
                  )}

                  {/* OTP */}
                  {step == "otp" && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-xl font-bold text-center">
                        Verify Email
                      </h2>

                      <div className="mt-6 flex justify-between gap-2">
                        {otp.map((digit, index) => {
                          return (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              value={digit}
                              maxLength={1}
                              className="w-10 h-12 sm:w-12 text-center text-lg font-semibold rounded-xl bg-white border border-black/20 outline-none"
                              onChange={(e) =>
                                handleChangeOtp(index, e.target.value)
                              }
                            />
                          );
                        })}
                      </div>

                      {error && (
                        <p className="text-red-500 text-center">*{error}</p>
                      )}
                      <button
                        className="mt-6 w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition cursor-pointer flex items-center justify-center"
                        onClick={handleVerifyEmail}
                      >
                        {loading ?
                          <LoaderCircle
                            size={18}
                            color="white"
                            className="animate-spin"
                          />
                        : "Verify and Create Acount"}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
