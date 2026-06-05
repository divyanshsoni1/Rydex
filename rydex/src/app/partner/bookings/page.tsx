"use client";
import { BookingStatus, PaymentStatus } from "@/models/BookingModel";
import { IUser } from "@/models/User";
import { IVehicle } from "@/models/vehicle.model";
import axios from "axios";
import {
  Bike,
  Calendar,
  Car,
  ChevronDown,
  ChevronRightIcon,
  IndianRupee,
  ListFilter,
  Loader2,
  MapPin,
  Phone,
  Truck,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import CompletedScreen from "@/components/CompletedScreen";

interface IBooking {
  user: IUser;
  driver: IUser;
  vehicle: IVehicle;

  pickUpAddress: string;
  dropAddress: string;

  pickUpLocation: {
    type: "point";
    coordinates: [number, number];
  };
  dropLocation: {
    type: "point";
    coordinates: [number, number];
  };

  fare: number;
  userMobileNumber: string;
  driverMobileNumber: string;

  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentDeadline: Date;

  adminCommission: number;
  partnerAmount: number;

  pickUpOtp: string;
  pickUpOtpExpire: Date;
  dropOtp: string;
  dropOtpExpire: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
};

function page() {
  const [bookings, setBookings] = useState<IBooking[] | []>([]);
  const [selectStatus, setSelectStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/partner/bookings");
        setBookings(data);
        setLoading(false);
      } catch (error: any) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      completed: "bg-teal-50 text-teal-700 border-teal-200",
      requested: "bg-amber-50 text-amber-700 border-amber-200",
      awaiting_payment: "bg-blue-50 text-blue-700 border-blue-200",
      cancelled: "bg-rose-50 text-rose-700 border-rose-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      expired: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getVehicleIcon = (vehicleType?: string) => {
    switch (vehicleType?.toLowerCase()) {
      case "bike":
        return <Bike className="w-4 h-4 text-gray-400" />;
      case "auto":
        return <Car className="w-4 h-4 text-gray-400" />;
      case "truck":
        return <Truck className="w-4 h-4 text-gray-400" />;
      case "loading":
      case "car":
      default:
        return <Car className="w-4 h-4 text-gray-400" />;
    }
  };

  // const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  // const [showCompletedScreen, setShowCompletedScreen] = useState(false);

  // const handleCompletedRide = (booking: IBooking) => {
  //   setSelectedBooking(booking);
  //   setShowCompletedScreen(true);
  // };

  const filterBookings =
    selectStatus === "All" ? bookings : (
      bookings.filter((b) => b.bookingStatus === selectStatus.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden border-b border-gray-200 bg-linear-to-r from-white via-blue-50 to-indigo-50">
        {/* Background Blur Effects */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              {/* Left Content */}
              <div className="flex items-start sm:items-center gap-4">
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-200">
                  <Car className="w-7 h-7 text-white" />
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                      Partner Bookings
                    </h1>

                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-200">
                      Active
                    </span>
                  </div>

                  <p className="mt-1 text-sm sm:text-base text-gray-600">
                    You currently have{" "}
                    <span className="font-semibold text-blue-700">
                      {bookings?.length}
                    </span>{" "}
                    {bookings?.length === 1 ? "ride" : "rides"} assigned to you.
                  </p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="flex items-center gap-3">
                <div className="bg-white/80 backdrop-blur-md border border-white shadow-md rounded-2xl px-5 py-4 min-w-[130px]">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Total Rides
                  </p>

                  <div className="flex items-end gap-1 mt-1">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {bookings?.length || 0}
                    </h2>

                    <span className="text-sm text-gray-500 mb-1">Assigned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm;px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Left Side */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 border border-blue-100">
                <ListFilter className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Showing Results
                </p>

                <h3 className="text-lg font-semibold text-gray-900">
                  {filterBookings.length}{" "}
                  {filterBookings.length === 1 ? "Ride" : "Rides"}
                </h3>
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.target.value)}
                className="w-full sm:min-w-55 appearance-none bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 text-sm font-medium rounded-2xl px-4 py-3 pr-10 shadow-sm transition-all duration-200 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="requested">Requested</option>
                <option value="awaiting_payment">Awaiting Payment</option>
                <option value="confirmed">Confirmed</option>
                <option value="started">Started</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>

              {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center min-h-[55vh] px-4">
              <div className="w-full max-w-md">
                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[28px] border border-gray-200/70 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 sm:p-10">
                  {/* Top Accent */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

                  {/* Glow Background */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-blue-500/10 blur-3xl rounded-full" />

                  {/* Loader Animation */}
                  <div className="relative flex items-center justify-center">
                    {/* Outer Rotating Ring */}
                    <div className="absolute w-28 h-28 rounded-full border-[3px] border-blue-100 border-t-blue-500 animate-spin" />

                    {/* Middle Soft Ring */}
                    <div className="absolute w-20 h-20 rounded-full bg-blue-50 animate-pulse" />

                    {/* Car Icon */}
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-300/40">
                      <Car className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mt-10">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                      Loading Your Rides
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
                      Please wait while we fetch your latest assigned bookings
                      and trip updates.
                    </p>

                    {/* Animated Dots */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && filterBookings.length === 0 && (
            <div className="relative overflow-hidden rounded-[28px] border border-gray-200/70 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              {/* Top Accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

              {/* Background Glow */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-100/40 blur-3xl rounded-full" />

              <div className="relative flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20">
                {/* Icon Container */}
                <div className="relative">
                  {/* Pulse Ring */}
                  <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-30" />

                  <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-200/50">
                    <Car className="w-11 h-11 text-white" />
                  </div>
                </div>

                {/* Text */}
                <div className="mt-8 max-w-md">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                    No Bookings Available
                  </h2>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-500">
                    You don’t have any assigned rides at the moment. New
                    customer bookings and trip requests will automatically
                    appear here.
                  </p>
                </div>

                {/* Status Badge */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />

                  <span className="text-sm font-medium text-blue-700">
                    Waiting for new ride requests
                  </span>
                </div>
              </div>
            </div>
          )}

          {!loading && filterBookings.length > 0 && (
            <div className="space-y-5">
              {filterBookings.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <div className="group relative overflow-hidden rounded-[28px] border border-gray-200/70 bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
                    {/* Top Gradient Accent */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

                    {/* Header */}
                    <div className="relative p-5 sm:p-6 bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-cyan-50/50 border-b border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        {/* User Info */}
                        <div className="flex items-start gap-4">
                          <div className="relative shrink-0">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-200 flex items-center justify-center">
                              <User className="w-7 h-7 text-white" />
                            </div>

                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                                {b.user.name || "Customer"}
                              </h2>

                              <span
                                className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${getStatusColor(
                                  b.bookingStatus,
                                )}`}
                              >
                                {b.bookingStatus}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                              <Phone className="w-4 h-4" />
                              <span>{b.userMobileNumber}</span>
                            </div>
                          </div>
                        </div>

                        {/* Fare */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                            Ride Fare
                          </span>

                          <div className="flex items-center text-2xl font-bold text-gray-900">
                            <IndianRupee className="w-5 h-5" />
                            {b.fare}
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Card */}
                      <div className="mt-5">
                        <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 shadow-sm">
                          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50">
                            {getVehicleIcon(b.vehicle.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                              Assigned Vehicle
                            </p>

                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                              {b.vehicle.vehicleModel}
                            </h3>
                          </div>

                          <div className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700">
                            {b.vehicle.number || "Not Assigned"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ride Route */}
                    <div className="p-5 sm:p-6">
                      <div className="relative pl-2">
                        {/* Vertical Line */}
                        <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-green-300 via-gray-200 to-red-300" />

                        {/* Pickup */}
                        <div className="relative flex gap-4 pb-6">
                          <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 border border-green-200">
                            <MapPin className="w-3.5 h-3.5 text-green-600" />
                          </div>

                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                              Pickup Location
                            </p>

                            <p className="mt-1 text-sm sm:text-base leading-relaxed text-gray-700">
                              {b.pickUpAddress}
                            </p>
                          </div>
                        </div>

                        {/* Drop */}
                        <div className="relative flex gap-4">
                          <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-red-100 border border-red-200">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                          </div>

                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                              Drop Location
                            </p>

                            <p className="mt-1 text-sm sm:text-base leading-relaxed text-gray-700">
                              {b.dropAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/70 backdrop-blur-sm">
                      {/* Left */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(b.createdAt?.toString()!)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Payment</span>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              b.paymentStatus === "paid" ?
                                "bg-green-100 text-green-700 border border-green-200"
                              : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            }`}
                          >
                            {b.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Right */}
                      {(b.bookingStatus === "completed" ||
                        b.bookingStatus === "confirmed" ||
                        b.bookingStatus === "started") && (
                        <button
                          onClick={() => router.push("/partner/active-ride")}
                          className="group/button inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                        >
                          <span>View Ride Details</span>

                          <ChevronRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                        </button>
                      )}

                      {/* {b.bookingStatus === "completed" && (
                        <button
                          onClick={() => handleCompletedRide(b)}
                          className="group/button inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                        >
                          <span>View Ride Details</span>

                          <ChevronRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                        </button>
                      )} */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
