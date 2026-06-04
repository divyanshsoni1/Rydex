"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle,
  CreditCard,
  Landmark,
  LoaderCircle,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUserData } from "@/redux/userSlice";

const IFSC_REGEX: RegExp = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const UPI_REGEX: RegExp = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

function page() {
  const router = useRouter();
  const [accountHolder, setAccountHolder] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [ifsc, setIfsc] = useState<string>("");
  const [upi, setUpi] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { update } = useSession();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const sanitizedIfsc = ifsc.trim().toUpperCase();
  const sanitizedUpi = upi.trim();
  const isNameValid = accountHolder.trim().length >= 3;
  const isAccountNumValid = accountNumber.trim().length >= 9;
  const isIfscValid = IFSC_REGEX.test(sanitizedIfsc);
  const isMobileNumValid = mobileNumber.trim().length == 10;
  const isUpiValid = UPI_REGEX.test(sanitizedUpi);
  const canSubmit =
    isNameValid && isAccountNumValid && isIfscValid && isMobileNumValid;

  const handleBank = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/partner/onboarding/bank", {
        accountHolder,
        accountNumber,
        ifsc: sanitizedIfsc,
        upi,
        mobileNumber,
      });
      await update({ role: "partner" });
      if (userData) {
        dispatch(setUserData({ ...userData, role: "partner" }));
      }
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      setError(error?.response?.data?.message || " Something went wrong");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetBank = async () => {
      try {
        const { data } = await axios.get("/api/partner/onboarding/bank");
        console.log(data);
        setAccountHolder(data.partnerBank.accountHolder);
        setAccountNumber(data.partnerBank.accountNumber);
        setIfsc(data.partnerBank.ifsc);
        setMobileNumber(data.mobileNumber);
        setUpi(data.partnerBank.upi);
      } catch (error: any) {
        console.log(error);
      }
    };
    handleGetBank();
  }, []);

  return (
    <div>
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

            <p className="text-xs text-gray-500 font-medium">Step 3 of 3</p>

            <h1 className="text-2xl font-bold mt-1">Bank & payout Setup</h1>

            <p className="text-sm text-gray-500 mt-2">
              Used for partner payouts
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="ahn"
                className="text-xs font-semibold text-gray-500"
              >
                Account Holder Name
              </label>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-gray-400">
                  <BadgeCheck size={18} />
                </div>
                <input
                  type="text"
                  onChange={(e) => setAccountHolder(e.target.value)}
                  value={accountHolder}
                  id="ahn"
                  placeholder="As per bank records"
                  className={`flex-1 border-b pb-2 text-sm focus:outline-none ${!isNameValid && accountHolder.length > 0 ? " border-red-500 focus:border-red-500" : " border-gray-300 focus:border-black"}`}
                />
              </div>
              {!isNameValid && accountHolder.length > 0 && (
                <p className="mt-1 text-xs text-red-500">
                  Minimum 3 characters are required
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="ban"
                className="text-xs font-semibold text-gray-500"
              >
                Bank account number
              </label>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-gray-400">
                  <CreditCard size={18} />
                </div>
                <input
                  type="text"
                  id="ban"
                  onChange={(e) => setAccountNumber(e.target.value)}
                  value={accountNumber}
                  placeholder="Enter account number"
                  className={`flex-1 border-b pb-2 text-sm focus:outline-none ${!isAccountNumValid && accountNumber.length > 0 ? " border-red-500 focus:border-red-500" : " border-gray-300 focus:border-black"}`}
                />
              </div>
              {!isAccountNumValid && accountNumber.length > 0 && (
                <p className="mt-1 text-xs text-red-500">
                  Account number must be atleast 9 digits
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="ifsc"
                className="text-xs font-semibold text-gray-500"
              >
                IFSC Code
              </label>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-gray-400">
                  <Landmark size={18} />
                </div>
                <input
                  type="text"
                  id="ifsc"
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  value={ifsc}
                  placeholder="HDFC0001234"
                  className={`flex-1 border-b pb-2 text-sm focus:outline-none ${!isIfscValid && ifsc.length > 0 ? " border-red-500 focus:border-red-500" : " border-gray-300 focus:border-black"}`}
                />
              </div>
              {!isIfscValid && ifsc.length > 0 && (
                <p className="mt-1 text-xs text-red-500">Invalid IFSC Code</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobnum"
                className="text-xs font-semibold text-gray-500"
              >
                Mobile Number
              </label>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-gray-400">
                  <Phone size={18} />
                </div>
                <input
                  type="text"
                  id="mobnum"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobileNumber}
                  placeholder="10 digit mobile number"
                  className={`flex-1 border-b pb-2 text-sm focus:outline-none ${!isMobileNumValid && mobileNumber.length > 0 ? " border-red-500 focus:border-red-500" : " border-gray-300 focus:border-black"}`}
                />
              </div>
              {!isMobileNumValid && mobileNumber.length > 0 && (
                <p className="mt-1 text-xs text-red-500">
                  Enter 10 digit mobile number
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="upi"
                className="text-xs font-semibold text-gray-500"
              >
                UPI ID (optional)
              </label>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-gray-400">
                  <BadgeCheck size={18} />
                </div>
                <input
                  type="text"
                  id="upi"
                  onChange={(e) => setUpi(e.target.value)}
                  value={upi}
                  placeholder="name@upi"
                  className={`flex-1 border-b pb-2 text-sm focus:outline-none ${!isUpiValid && upi.length > 0 ? " border-red-500 focus:border-red-500" : " border-gray-300 focus:border-black"}`}
                />
              </div>
              {!isUpiValid && upi.length > 0 && (
                <p className="mt-1 text-xs text-red-500">Invalid UPI ID</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 text-xs text-gray-500">
            <CheckCircle size={16} />
            <p>
              Bank details are verified before first payout. This usually takes
              24-48 hours.
            </p>
          </div>

          {error && <p className="text-red-500 mt-4">*{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            disabled={!canSubmit || loading}
            whileTap={{ scale: 0.95 }}
            onClick={handleBank}
            className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition cursor-pointer"
          >
            {loading ?
              <LoaderCircle className="text-white animate-spin" />
            : "Continue"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default page;
