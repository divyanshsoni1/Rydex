"use client";
import axios from "axios";
import {
  Car,
  CheckCircle2,
  Clock,
  LogOut,
  User,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Kpi from "./Kpi";
import TabButton from "./TabButton";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import ContentList from "./ContentList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signOut } from "next-auth/react";
import { setUserData } from "@/redux/userSlice";
import AdminEarning from "./AdminEarning";

type Stats = {
  totalApprovedPartners: number;
  totalPartners: number;
  totalPendingPartners: number;
  totalRejectedPartners: number;
};

type Tab = "partner" | "kyc" | "vehicle";

function AdminDashboard() {
  const [stats, setstats] = useState<Stats | null>(null);
  const [activetab, setActiveTab] = useState<Tab>("partner");
  const [partnerReviews, setPartnerReviews] = useState<any>();
  const [pendindKyc, setPendindKyc] = useState<any>();
  const [vehicleReviews, setVehicleReviews] = useState<any>();
  const [profileOpen, setProfileOpen] = useState(false);

  const { userData } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleGetdata = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      setstats(data.stats);
      setPartnerReviews(data.pendingPartnersReviews);
      setVehicleReviews(data.pendingVehicles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetKyc = async () => {
    try {
      const { data } = await axios.get("/api/admin/video-kyc/pending");
      setPendindKyc(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: true });
    router.push("");
    dispatch(setUserData(null));
    setProfileOpen(false);
  };

  function capitalizeFullName(fullName: string): string {
    return fullName
      .toLowerCase()
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
  }

  useEffect(() => {
    handleGetdata();
    handleGetKyc();
  }, []);

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200"
      onClick={() =>
        profileOpen == true ? setProfileOpen(false) : profileOpen
      }
    >
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b z-40">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              alt="Rydex logo"
              width={50}
              height={44}
              priority
              className="cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
          {/* Right */}
          <div>
            <div
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-black text-white cursor-pointer"
              onClick={() => setProfileOpen(true)}
            >
              <User size={18} />
              Admin
            </div>

            <AnimatePresence>
              {profileOpen && userData && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-14 right-0 w-75 bg-white text-black rounded-2xl shadow-xl border hidden md:block"
                  >
                    <div className="p-5">
                      <p className="font-semibold text-lg">
                        {capitalizeFullName(userData.name)}
                      </p>
                      <p className="text-xs uppercase text-gray-500 mb-4">
                        {userData.role}
                      </p>

                      <button
                        className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl mt-2"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Kpi
            label="Total Partners"
            value={stats?.totalPartners}
            icon={<Users />}
            variant={"totalPartners"}
          />
          <Kpi
            label="Approved Partners"
            value={stats?.totalApprovedPartners}
            icon={<CheckCircle2 />}
            variant={"approved"}
          />
          <Kpi
            label="Pending Partners"
            value={stats?.totalPendingPartners}
            icon={<Clock />}
            variant={"pending"}
          />
          <Kpi
            label="Rejected Partners"
            value={stats?.totalRejectedPartners}
            icon={<XCircle />}
            variant={"rejected"}
          />
        </div>

        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 flex flex-wrap gap-2">
          <TabButton
            active={activetab == "partner"}
            count={partnerReviews?.length ?? 0}
            icon={<Users size={15} />}
            onClick={() => setActiveTab("partner")}
          >
            Partner Reviews
          </TabButton>

          <TabButton
            active={activetab == "kyc"}
            count={pendindKyc?.length ?? 0}
            icon={<Video size={15} />}
            onClick={() => setActiveTab("kyc")}
          >
            Pending Video KYC
          </TabButton>

          <TabButton
            active={activetab == "vehicle"}
            count={vehicleReviews?.length ?? 0}
            icon={<Car size={15} />}
            onClick={() => setActiveTab("vehicle")}
          >
            Partner Vehicle Reviews
          </TabButton>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activetab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-3"
          >
            {activetab == "partner" && (
              <ContentList data={partnerReviews ?? []} type={"partner"} />
            )}
            {activetab == "kyc" && (
              <ContentList data={pendindKyc ?? []} type={"kyc"} />
            )}
            {activetab == "vehicle" && (
              <ContentList data={vehicleReviews ?? []} type={"vehicle"} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {profileOpen && userData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0.5, y: 400 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.5, y: 400 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 md:hidden"
            >
              <div className="p-5">
                <p className="font-semibold text-lg">
                  {capitalizeFullName(userData.name)}
                </p>
                <p className="text-xs uppercase text-gray-500 mb-4">
                  {userData.role}
                </p>

                <button
                  className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl mt-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AdminEarning/>
    </div>
  );
}

export default AdminDashboard;
