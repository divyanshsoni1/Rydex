"use client";
import AnimatedCard from "@/components/AnimatedCard";
import DocPreview from "@/components/DocPreview";
import { IPartnerBank } from "@/models/PartnerBank";
import { IPartnerDocs } from "@/models/PartnerDocs";
import { IUser } from "@/models/User";
import { IVehicle } from "@/models/vehicle.model";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  Car,
  CheckCircle,
  Clock,
  FileText,
  Landmark,
  LoaderCircle,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [vehicleDetail, setVehicleDetail] = useState<IVehicle | null>(null);
  const [partnerDocs, setPartnerDocs] = useState<IPartnerDocs | null>(null);
  const [partnerbank, setpartnerBank] = useState<IPartnerBank | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [rejectionReason, setRejectionreason] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setrejectLoading] = useState(false);

  const { id } = useParams();
  const router = useRouter();

  const handleGetpartner = async () => {
    try {
      const { data } = await axios.get(`/api/admin/reviews/partner/${id}`);
      setData(data.partner);
      setVehicleDetail(data.vehicle);
      setPartnerDocs(data.documents);
      setpartnerBank(data.bank);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetpartner();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Loading Partner Details...
      </div>
    );
  }

  const handleApprove = async () => {
    setApproveLoading(true);
    try {
      const { data } = await axios.get(
        `/api/admin/reviews/partner/${id}/approve`,
      );
      console.log(data);
      setApproveLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setApproveLoading(false);
    }
  };

  const handleReject = async () => {
    setrejectLoading(true);
    try {
      const { data } = await axios.post(
        `/api/admin/reviews/partner/${id}/reject`,
        { rejectionReason },
      );
      console.log(data);
      setrejectLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setrejectLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200">
      {/* Left */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex-1">
            <div className="font-semibold text-lg">{data?.name}</div>
            <div className="text-xs text-gray-500">{data?.email}</div>
          </div>
          {data?.partnerStatus === "approved" ?
            <div className="px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-green-100 text-green-700">
              <CheckCircle size={14} />
              Approved
            </div>
          : data?.partnerStatus === "rejected" ?
            <div className="px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-red-100 text-red-700">
              <XCircle size={14} />
              Rejected
            </div>
          : <div className="px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-yellow-100 text-yellow-700">
              <Clock size={14} />
              Pending
            </div>
          }
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
        <div className=" lg:col-span-2 space-y-8">
          {/* Vehicle Details */}
          <AnimatedCard title="Vehicle" icon={<Car size={18} />}>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Vehicle Type</span>
              <span className="font-semibold">
                {vehicleDetail?.type.toLocaleUpperCase() || "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Registration Number</span>
              <span className="font-semibold">
                {vehicleDetail?.number.toLocaleUpperCase() || "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Vehicle Model</span>
              <span className="font-semibold">
                {vehicleDetail?.vehicleModel.toLocaleUpperCase() || "-"}
              </span>
            </div>
          </AnimatedCard>

          <AnimatedCard title="Documents" icon={<FileText size={18} />}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <DocPreview label={"Aadhar"} url={partnerDocs?.aadharUrl} />
              <DocPreview
                label={"Registration certificate"}
                url={partnerDocs?.rcUrl}
              />
              <DocPreview
                label={"Driving License"}
                url={partnerDocs?.licenseUrl}
              />
            </div>
          </AnimatedCard>
        </div>

        {/* Right */}
        <div className="space-y-8">
          <AnimatedCard title={"Bank Details"} icon={<Landmark size={18} />}>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Account Holder Name</span>
              <span className="font-semibold">
                {partnerbank?.accountHolder.toLocaleUpperCase() || "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Account Number</span>
              <span className="font-semibold">
                {partnerbank?.accountNumber.toLocaleUpperCase() || "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">IFSC Code</span>
              <span className="font-semibold">
                {partnerbank?.ifsc.toLocaleUpperCase() || "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">UPI ID</span>
              <span className="font-semibold">{partnerbank?.upi || "-"}</span>
            </div>
          </AnimatedCard>

          {data?.partnerStatus == "pending" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl space-y-6"
            >
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck size={18} />
                Admin Check
              </div>
              <p className="text-sm text-gray-500">
                Verify documents carefully before approving.
              </p>

              <div className="flex flex-col gap-4">
                <button
                  className="py-3 rounded-2xl bg-linear-to-r from-black to-gray-800 text-white font-semibold hover:opacity-90 transition cursor-pointer"
                  onClick={() => setShowApprove(true)}
                >
                  Approve
                </button>
                <button
                  className="py-3 rounded-2xl border font-semibold hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => setShowReject(true)}
                >
                  Reject
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {showApprove && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 w-full max-w-sm"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h2>Approve Partner ?</h2>
              <p className="text-sm text-gray-500 mt-2">
                Confirm all information has been verified.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 py-2 rounded-xl border cursor-pointer"
                  onClick={() => setShowApprove(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 flex items-center justify-center rounded-xl bg-black text-white cursor-pointer"
                  onClick={handleApprove}
                  disabled={approveLoading}
                >
                  {approveLoading ?
                    <LoaderCircle className="text-white animate-spin" />
                  : "Yes , Approve"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 w-full max-w-sm"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h2>Reject Partner ?</h2>
              <p className="text-sm text-gray-500 mt-2">
                <textarea
                  placeholder="Enter rejection reason(required)"
                  className="w-full mt-3 border rounded-xl p-3 text-sm"
                  onChange={(e) => setRejectionreason(e.target.value)}
                  value={rejectionReason}
                />
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 py-2 rounded-xl border cursor-pointer"
                  onClick={() => setShowReject(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 flex items-center justify-center rounded-xl bg-black text-white cursor-pointer"
                  onClick={handleReject}
                  disabled={rejectLoading}
                >
                  {rejectLoading ?
                    <LoaderCircle className="text-white animate-spin" />
                  : "Reject"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default page;
