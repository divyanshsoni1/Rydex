"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, FileCheck, LoaderCircle, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

type docType = "aadhar" | "license" | "rc";

function page() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const [docs, setDocs] = useState<Record<docType, File | null>>({
    aadhar: null,
    license: null,
    rc: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handledocs = async () => {
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      if (!docs.aadhar || !docs.license || !docs.rc) {
        setError("All Documents are required");
        setLoading(false);
        return null;
      }
      formData.append("aadhar", docs.aadhar);
      formData.append("license", docs.license);
      formData.append("rc", docs.rc);
      const { data } = await axios.post(
        "/api/partner/onboarding/documents",
        formData,
      );
      setLoading(false);
      router.push("/partner/onboarding/bank");
    } catch (error: any) {
      setError(error?.response?.data?.message || " Something went wrong");
      console.log(error);
      setLoading(false);
    }
  };

  const handleImage = (doc: docType, file: File | null) => {
    if (!file) return;

    setDocs((prev) => ({ ...prev, [doc]: file }));
  };

  const isCompleted = docs.aadhar && docs.license && docs.rc;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8"
      >
        <div className="relative text-center">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
            onClick={handleBack}
          >
            <ArrowLeft size={18} />
          </motion.button>

          <p className="text-xs text-gray-500 font-medium">Step 2 of 3</p>

          <h1 className="text-2xl font-bold mt-1"> Upload Documents</h1>

          <p className="text-sm text-gray-500 mt-2">
            Required for verification
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <motion.label
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black transition"
          >
            {/* Left */}
            <div>
              <p className="text-sm font-semibold">Aadhar / ID Proof</p>
              <p className="text-xs text-gray-500">Goverment issued ID</p>
            </div>
            {/* Right */}
            <div>
              {docs.aadhar ?
                <span className="text-xs text-green-600 font-medium">
                  Uploaded
                </span>
              : <div>
                  <span className="text-xs text-gray-400 mb-2">Upload</span>
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    <UploadCloud size={20} />
                  </div>
                </div>
              }
            </div>

            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) =>
                handleImage("aadhar", e.target?.files?.[0] || null)
              }
            />
          </motion.label>
        </div>

        <div className="mt-8 space-y-5">
          <motion.label
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black transition"
          >
            {/* Left */}
            <div>
              <p className="text-sm font-semibold">Driving License</p>
              <p className="text-xs text-gray-500">Valid driving license</p>
            </div>
            {/* Right */}
            <div>
              {docs.license ?
                <span className="text-xs text-green-600 font-medium">
                  Uploaded
                </span>
              : <div>
                  <span className="text-xs text-gray-400 mb-2">Upload</span>
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    <UploadCloud size={20} />
                  </div>
                </div>
              }
            </div>

            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) =>
                handleImage("license", e.target?.files?.[0] || null)
              }
            />
          </motion.label>
        </div>

        <div className="mt-8 space-y-5">
          <motion.label
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black transition"
          >
            {/* Left */}
            <div>
              <p className="text-sm font-semibold">Vechile RC</p>
              <p className="text-xs text-gray-500">Registration certificate</p>
            </div>
            {/* Right */}
            <div>
              {docs.rc ?
                <span className="text-xs text-green-600 font-medium">
                  Uploaded
                </span>
              : <div>
                  <span className="text-xs text-gray-400 mb-2">Upload</span>
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    <UploadCloud size={20} />
                  </div>
                </div>
              }
            </div>

            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) => handleImage("rc", e.target?.files?.[0] || null)}
            />
          </motion.label>
        </div>

        <div className="mt-6 flex items-start gap-3 text-xs text-gray-500">
          <FileCheck size={16} />
          <p>
            Documents are securely stored and manually verified by our team.
          </p>
        </div>

        {error && <p className="text-red-500 mt-4">*{error}</p>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          disabled={!isCompleted || loading}
          onClick={handledocs}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition cursor-pointer"
        >
          {loading ?
            <LoaderCircle className="text-white animate-spin" />
          : "Continue"}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default page;
