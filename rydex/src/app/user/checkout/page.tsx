"use client";
import React, { useEffect, useState, Suspense } from "react";
import {
  ArrowRight,
  Banknote,
  Bike,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  IndianRupee,
  Loader2,
  MapPin,
  Navigation,
  ShieldCheck,
  Truck,
  Wallet,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getSocket } from "@/lib/socket";

const VEHICLE_META: any = {
  bike: { label: "Bike", Icon: Bike },
  auto: { label: "Auto", Icon: Car },
  car: { label: "Car", Icon: Car },
  loading: { label: "Loading", Icon: Truck },
  truck: { label: "Truck", Icon: Truck },
};

type Status =
  | "idle"
  | "requested"
  | "awaiting_payment"
  | "rejected"
  | "expired"
  | "payment"
  | "confirmed";

function CheckoutPageContent() {
  const params = useSearchParams();
  const [pickUp, setPickUp] = useState(params.get("pickUp") || "");
  const [drop, setDrop] = useState(params.get("drop") || "");
  const mobile = params.get("mobile");
  const [status, setStatus] = useState<Status>("idle");
  const [booking, setBooking] = useState<any>();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

  const pickUpLat =
    params.get("pickUpLat") ? Number(params.get("pickUpLat")) : null;

  const pickUpLon =
    params.get("pickUpLon") ? Number(params.get("pickUpLon")) : null;

  const dropLat = params.get("dropLat") ? Number(params.get("dropLat")) : null;
  const dropLon = params.get("dropLon") ? Number(params.get("dropLon")) : null;
  const vehicle = params.get("vehicle") || "";
  const driverId = params.get("driverId");
  const vehicleId = params.get("vehicleId");
  const fare = booking?.fare || Number(params.get("fare")) || 0;

  const { Icon, label } = VEHICLE_META[vehicle] || {
    Icon: Car,
    label: "Vehicle",
  };
  const [loading, setLoading] = useState(false);

  const handleRequestRide = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/booking/create", {
        driverId,
        vehicleId,
        pickUpAddress: pickUp,
        dropAddress: drop,
        pickUpLocation: {
          type: "Point",
          coordinates: [pickUpLon, pickUpLat],
        },
        dropLocation: {
          type: "Point",
          coordinates: [dropLon, dropLat],
        },
        fare,
        mobileNumber: mobile,
      });
      setBooking(data);
      setLoading(false);
      setStatus("requested");
    } catch (error: any) {
      console.log(error?.response?.data?.message || error);
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve(false);
        return;
      }

      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleConfirmPayment = async () => {
    if (!booking || !paymentMethod) return;
    setLoading(true);

    try {
      if (paymentMethod == "online") {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          alert("Razorpay script failed to Load.");
        }

        const { data } = await axios.post("/api/payment/create", {
          bookingId: booking._id,
        });

        const paymentObject = new (window as any).Razorpay({
          Key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          Currency: "INR",
          name: "Rydex Mobility Services",
          description: "Fast , secure and reliable ride booking platform",
          order_id: data.orderId,
          handler: async function (response: any) {
            const { data } = await axios.post("/api/payment/verify", {
              bookingId: booking._id,
              ...response,
            });

            setLoading(false);

            if (data.success) {
              setStatus("confirmed");
              window.location.href = `/user/ride/${booking._id}`;
            }
          },
        });

        paymentObject.open();
      } else {
        const { data } = await axios.get(`/api/booking/${booking._id}/confirm`);
        setLoading(false);
        if (data.success) {
          setStatus("confirmed");
          window.location.href = `/ride/${booking._id}`;
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Handle confirm payment error", error);
    }
  };

  const fetchActiveBooking = async () => {
    try {
      const { data } = await axios.get("/api/booking/active");
      if (data && data.booking) {
        setBooking(data.booking);
        const fetchedStatus = data.booking.bookingStatus || data.booking;
        if (fetchedStatus && fetchedStatus !== status) {
          setStatus(fetchedStatus);
        }
      }
    } catch (error) {
      console.log("Error fetching active booking:", error);
    }
  };

  useEffect(() => {
    fetchActiveBooking();
  }, []);

  const handleCancel = async () => {
    try {
      const { data } = await axios.get(`/api/booking/${booking._id}/cancel`);
      setStatus("idle");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status !== "awaiting_payment") return;
    const t = setTimeout(() => {
      setStatus("payment")
    }, 2050)
    return () => { clearTimeout(t) }
  }, [status]);

  useEffect(() => {
    const socket = getSocket();
    socket.on("accept-booking", (data) => {
      setStatus(data);
    });
    socket.on("reject-booking", (data) => {
      setStatus(data);
    });
    return () => {
      socket.off("accept-booking");
      socket.off("reject-booking");
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-12">
      <div className="relative max-w-6xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-8 bg-zinc-900" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Booking
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">
            Checkout
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5 font-medium">
            Review your ride and confirm
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
          >
            <div className="h-1 bg-zinc-900" />

            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 mb-1">
                    Selected Vehicle
                  </div>
                  <div className="text-3xl font-black tracking-tight text-zinc-900">
                    {vehicle}
                  </div>
                </div>

                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon size={28} className="text-white" />
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden mb-8">
                <div className="flex gap-4 px-5 py-4 border-b border-zinc-100">
                  <div className="flex flex-col items-center shrink-0 pt-0.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-900 border-2 border-white ring ring-zinc-300" />
                    <div
                      className="w-px flex-1 bg-zinc-300 my-1"
                      style={{ minHeight: 12 }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-400 mb-0.5">
                      PickUp
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 leading-snug truncate">
                      {pickUp}
                    </div>
                  </div>
                  <MapPin size={14} className="text-zinc-400 shrink-0 mt-1" />
                </div>

                <div className="flex gap-4 px-5 py-4 border-b border-zinc-100">
                  <div className="flex flex-col items-center shrink-0 pt-0.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-900 border-2 border-white ring ring-zinc-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-400 mb-0.5">
                      Drop
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 leading-snug truncate">
                      {drop}
                    </div>
                  </div>
                  <Navigation
                    size={14}
                    className="text-zinc-400 shrink-0 mt-1"
                  />
                </div>
              </div>

              <div className="flex items-end justify-between pt-6 border-t border-zinc-100 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 mb-1">
                    Total Fare
                  </p>
                  <p className="text-zinc-400 text-xs font-medium">
                    Includes base + distance charges
                  </p>
                </div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="flex items-baseline gap-1 shrink-0"
                >
                  <span className="text-zinc-400 text-lg font-black">
                    <IndianRupee />
                  </span>
                  <span className="text-zinc-900 text-5xl font-black tracking-tight leading-none whitespace-nowrap">
                    {Math.round(fare)}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.14,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] flex flex-col"
          >
            <div className="h-1 bg-zinc-900" />
            <div className="flex-1 p-8 sm:p-10 flex flex-col">
              <AnimatePresence mode="wait">
                {(status == "idle" || status == "rejected") && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col flex-1 justify-between"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 mb-1">
                        Ready to go?
                      </p>
                      <h3 className="text-2xl font-black text-zinc-900 mb-6">
                        Confirm Your Ride
                      </h3>
                      <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 space-y-3">
                        {[
                          {
                            icon: <Clock size={14} />,
                            text: "Driver will respond within 2 minutes",
                          },
                          {
                            icon: <ShieldCheck size={14} />,
                            text: "Verified & insured drivers only",
                          },
                          {
                            icon: <CreditCard size={14} />,
                            text: "Pay after driver accepts",
                          },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-xl bg-zinc-200 flex items-center justify-center text-zinc-600 shrink-0">
                              {item.icon}
                            </div>
                            <p className="text-zinc-500 text-xs font-medium">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={handleRequestRide}
                      className="w-full h-14 mt-8 bg-zinc-900 hover:bg-black disabled:opacity-40 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2.5 transition-colors shadow-md"
                    >
                      <span className=""> Request Ride </span>
                      <ArrowRight size={15} />
                    </motion.button>
                  </motion.div>
                )}

                {status == "requested" && (
                  <motion.div
                    key="requested"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col flex-1 items-center justify-center gap-6 text-center"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0, 0.2],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-zinc-900"
                      />

                      <div className="relative w-10 h-10 rounded-full bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center">
                        <Loader2
                          size={20}
                          className="text-zinc-900 animate-spin"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-zinc-900 mb-1">
                        Finding your driver
                      </h3>
                      <p className="text-zinc-400 text-sm font-medium">
                        Waiting for driver to accept...
                      </p>
                    </div>

                    <motion.button
                      onClick={handleCancel}
                      whileTap={{ scale: 0.96 }}
                      aria-label="Cancel ride request"
                      className=" group flex items-center cursor-pointer justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600  text-[15px] font-semibold tracking-tight transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500/40 active:bg-red-100 "
                    >
                      <XCircle
                        size={18}
                        strokeWidth={2.5}
                        className="text-gray-400 group-hover:text-red-500 transition-colors duration-200"
                      />
                      <span>Cancel Request</span>
                    </motion.button>
                  </motion.div>
                )}

                {status == "awaiting_payment" && (
                  <motion.div
                    key="awaiting_payment"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col flex-1 items-center justify-center gap-5 text-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                      }}
                      className="w-20 h-20 rounded-full bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center"
                    >
                      <CheckCircle size={36} className="text-zinc-900" />
                    </motion.div>

                    <div>
                      <h3 className="text-xl font-black text-zinc-900 mb-1">
                        Driver Accepted Your Ride
                      </h3>
                      <p className="text-zinc-400 text-sm font-medium">
                        Preparing payment options...
                      </p>
                    </div>

                    <div className="w-48 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                        className="h-full bg-zinc-900 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {status == "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col flex-1 gap-6"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 mb-1">
                        Almost There
                      </p>
                      <h3 className="text-2xl font-black text-zinc-900">
                        Select Payment Method
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          id: "cash",
                          Icon: Banknote,
                          title: "Cash",
                          sub: "Pay driver after ride",
                        },
                        {
                          id: "online",
                          Icon: Wallet,
                          title: "Online Payment",
                          sub: "UPI · Card · Netbanking",
                        },
                      ].map((p, i) => {
                        const active = paymentMethod == p.id;
                        return (
                          <motion.div
                            key={p.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setPaymentMethod(p.id as any)}
                            className={`w-full cursor-pointer flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${active ? "bg-zinc-900 border-zinc-900 text-white" : "bg-zinc-50 border-zinc-200 hover:border-zinc-400"}`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${active ? "bg-white/10" : "bg-zinc-200"}`}
                            >
                              <p.Icon
                                size={18}
                                className={
                                  active ? "text-white" : "text-zinc-600"
                                }
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-bold ${active ? "text-white" : "text-zinc-900"}`}
                              >
                                {p.title}
                              </p>
                              <p
                                className={`text-xs font-medium ${active ? "text-zinc-400" : "text-zinc-400"}`}
                              >
                                {p.sub}
                              </p>
                            </div>

                            <AnimatePresence>
                              {active && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <CheckCircle
                                    size={16}
                                    className="text-white shrink-0"
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleConfirmPayment}
                      whileHover={paymentMethod ? { scale: 1.02 } : {}}
                      disabled={!paymentMethod}
                      className="w-full h-14 bg-zinc-900 hover:bg-black disabled:opacity-30 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2.5 transition-colors shadow-md mt-auto"
                    >
                      {loading ?
                        <Loader2 size={17} className="animate-spin" />
                      : paymentMethod == "cash" ?
                        <>
                          <Banknote size={16} />
                          <span>Confirm Cash ride</span>
                        </>
                      : <>
                          <span className="cursor-pointer">
                            Proceed to payment
                          </span>{" "}
                          <ArrowRight size={16} />
                        </>
                      }
                    </motion.button>
                  </motion.div>
                )}

                {status == "confirmed" && (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col flex-1 items-center justify-center gap-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 14,
                        delay: 0.1,
                      }}
                      className="relative"
                    >
                      <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                        {[0, 1, 2].map((idx) => (
                          <motion.div
                            key={idx}
                            className="absolute inset-0 rounded-full border border-emerald-500/40"
                            initial={{
                              scale: 0.8,
                              opacity: 0.7,
                            }}
                            animate={{
                              scale: [0.8, 1.8, 2.4],
                              opacity: [0.7, 0.25, 0],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: idx * 0.5,
                            }}
                          />
                        ))}

                        <motion.div
                          className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 blur-2xl"
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.5, 0.9, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 12,
                          }}
                          className="relative z-10 flex items-center justify-center  w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.45)]"
                        >
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: 0.2,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.path d="M5 13l4 4L19 7" />
                          </motion.svg>
                        </motion.div>
                      </div>
                    </motion.div>
                    <div className="flex flex-col items-center justify-center mt-5 text-center px-4">
                      <motion.h3
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                        className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent"
                      >
                        Ride Confirmed!
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.35,
                        }}
                        className="mt-3 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>

                        <p className="text-xs sm:text-sm font-medium text-emerald-700">
                          Payment Successful
                        </p>
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                        }}
                        className="mt-4 max-w-70 sm:max-w-md text-sm sm:text-base leading-relaxed text-zinc-500"
                      >
                        Your driver has been notified and is preparing for
                        pickup. Track your ride status in real time.
                      </motion.p>
                    </div>
                    <motion.button
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.6,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        scale: 1.03,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() => {
                        window.location.href = `/user/ride/${booking._id}`;
                      }}
                      className="group relative overflow-hidden mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-55 rounded-2xl bg-linear-to-r from-zinc-900 via-black to-zinc-800 px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                      </span>

                      <span className="relative z-10">Track Your Ride</span>

                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
          <Loader2 className="animate-spin text-zinc-900" size={30} />
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}
