"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Bike, Car, ChevronRight, LogOut, Menu, Truck, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { setUserData } from "@/redux/userSlice";
import axios from "axios";
import { getSocket } from "@/lib/socket";
const Nav_items = ["Home", "Bookings", "About us", "Contact"];
const Partner_Nav_Items = [
  "Home",
  "Pending Requests",
  "Bookings",
  "Active Ride",
];

const partnerNavItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Pending Requests",
    href: "/partner/pending-requests",
  },
  {
    label: "Bookings",
    href: "/partner/bookings",
  },
  {
    label: "Active Ride",
    href: "/partner/active-ride",
  },
];

function Nav() {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.user);

  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [pendingCount, setPendingCount] = useState(0);

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

  const fetchCount = async () => {
    try {
      const { data } = await axios.get(
        "/api/partner/bookings/pending-requests-count",
      );
      console.log(data);
      setPendingCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData?.role === "partner") {
      fetchCount();
    }
  }, [userData?.role]);

  useEffect(() => {
    const socket = getSocket();
    socket.on("new-booking", (data) => {
      setPendingCount((prev) => prev + 1);
    });
    return () => {
      socket.off("new-booking");
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-3 left-1/2 -translate-x-1/2  w-[94%]  z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3"
        onClick={() =>
          profileOpen == true ? setProfileOpen(false) : profileOpen
        }
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
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

          <div className="hidden md:flex items-center gap-10">
            {userData?.role === "partner" ?
              partnerNavItems.map((item) => {
                const active = pathName === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-sm font-medium transition ${
                      active ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}

                    {item.label === "Pending Requests" && (
                      <span className="pointer-events-none absolute -top-2 -right-5 w-6 h-6 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold">
                        {pendingCount ?? 0}
                      </span>
                    )}
                  </Link>
                );
              })
            : Nav_items.map((i, index) => {
                let href;
                if (i == "Home") {
                  href = `/`;
                } else {
                  href = `/user/${i.toLowerCase()}`;
                }
                const active = href == pathName;
                return (
                  <Link
                    key={index}
                    href={href}
                    className={`text-sm font-medium transition ${active ? "text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    {i}
                  </Link>
                );
              })
            }
          </div>

          <div className="flex items-center relative gap-3">
            <div className="hidden md:block relative">
              {!userData ?
                <button
                  className="px-4 py-1.5 rounded-full bg-white text-black text-sm cursor-pointer"
                  onClick={() => setAuthOpen(true)}
                >
                  Login
                </button>
              : <>
                  <button
                    className="cursor-pointer w-11 h-11 rounded-full bg-white text-black font-bold"
                    onClick={() => setProfileOpen((p) => !p)}
                  >
                    {userData.name.charAt(0).toUpperCase()}
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-14 right-0 w-75 bg-white text-black rounded-2xl shadow-xl border"
                      >
                        <div className="p-5">
                          <p className="font-semibold text-lg">
                            {capitalizeFullName(userData.name)}
                          </p>
                          <p className="text-xs uppercase text-gray-500 mb-4">
                            {userData.role}
                          </p>
                          {userData.role == "user" && (
                            <div
                              className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl"
                              onClick={() =>
                                router.push("/partner/onboarding/vehicle")
                              }
                            >
                              <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                                  <Bike size={16} />
                                </div>
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                                  <Car size={16} />
                                </div>
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                                  <Truck size={16} />
                                </div>
                              </div>
                              Become a Partner
                              <ChevronRight size={16} className="ml-auto" />
                            </div>
                          )}

                          <button
                            className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl mt-2"
                            onClick={handleLogout}
                          >
                            <LogOut size={16} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              }
            </div>

            {/* For Mobile */}
            <div className="md:hidden">
              {!userData ?
                <button
                  className="px-4 py-1.5 rounded-full bg-white text-black text-sm cursor-pointer"
                  onClick={() => setAuthOpen(true)}
                >
                  Login
                </button>
              : <>
                  <button
                    className="cursor-pointer w-11 h-11 rounded-full bg-white text-black font-bold"
                    onClick={() => setProfileOpen((p) => !p)}
                  >
                    {userData.name.charAt(0).toUpperCase()}
                  </button>
                </>
              }
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen((p) => !p)}
            >
              {menuOpen ?
                <X size={26} />
              : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && userData?.role == "user" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-21.25 left-1/2 -translate-x-1/2 w-[92%] bg-[#0B0B0B] rounded-2xl shadow-2xl z-40 md:hidden overflow-hidden"
            >
              <div className="flex flex-col divide-y divide-white/10">
                {Nav_items.map((i, index) => {
                  let href;
                  if (i == "Home") {
                    href = `/`;
                  } else {
                    href = `/user/${i.toLowerCase()}`;
                  }

                  return (
                    <Link
                      key={index}
                      href={href}
                      className="px-6 py-4 text-gray-300 hover:bg-white/5"
                    >
                      {i}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && userData?.role == "partner" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-21.25 left-1/2 -translate-x-1/2 w-[92%] bg-[#0B0B0B] rounded-2xl shadow-2xl z-40 md:hidden overflow-hidden"
            >
              <div className="flex flex-col divide-y divide-white/10">
                {Partner_Nav_Items.map((i, index) => {
                  let href;
                  if (i == "Home") {
                    href = `/`;
                  } else if (i == "Pending Requests") {
                    href = `/partner/pending-requests`;
                  } else if (i == "Bookings") {
                    href = `/partner/bookings`;
                  } else if (i == "Active Ride") {
                    href = `/partner/active-ride`;
                  } else {
                    href = `/partner/${i.toLowerCase()}`;
                  }

                  return (
                    <Link
                      key={index}
                      href={href}
                      className="px-6 py-4 text-gray-300 hover:bg-white/5"
                    >
                      {i}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                {userData.role == "user" && (
                  <div
                    className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl"
                    onClick={() => router.push("/partner/onboarding/vehicle")}
                  >
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                        <Bike size={16} />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                        <Car size={16} />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                        <Truck size={16} />
                      </div>
                    </div>
                    Become a Partner
                    <ChevronRight size={16} className="ml-auto" />
                  </div>
                )}

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

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Nav;
