"use client";
import React, { useEffect, useState } from "react";
import { motion, number } from "motion/react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Bike, Car, Package, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Vehicle {
  id: string;
  label: string;
  icon: React.ElementType;
  desc: string;
}

const VEHICLES: Vehicle[] = [
  { id: "bike", label: "Bike", icon: Bike, desc: "2 wheeler" },
  { id: "auto", label: "Auto", icon: Car, desc: "3 wheeler ride" },
  { id: "car", label: "Car", icon: Car, desc: "4 wheeler ride" },
  { id: "loading", label: "Loading", icon: Package, desc: "Small goods" },
  { id: "truck", label: "Truck", icon: Truck, desc: "Heavy transport" },
];

function page() {
  const [vechileType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handleVehicle = async () => {
    setError("");
    try {
      setloading(true);
      const { data } = await axios.post("/api/partner/onboarding/vehicle", {
        type: vechileType,
        number: vehicleNumber,
        vehicleModel,
      });
      setloading(false);
      router.push("/partner/onboarding/documents");
    } catch (error: any) {
      setError(error?.response?.data?.message ?? "Something went wrong");
      setloading(false);
      setError("");
    }
  };

  useEffect(() => {
    const handleGetVehicle = async () => {
      setError("");
      try {
        const { data } = await axios.get("/api/partner/onboarding/vehicle");
        setVehicleType(data.type);
        setVehicleNumber(data.number);
        setVehicleModel(data.vehicleModel);
      } catch (error: any) {
        setError(error?.response?.data?.message ?? "Something went wrong");
        setError("");
      }
    };

    handleGetVehicle();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8"
      >
        <div className="relative text-center">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
          </motion.button>

          <p className="text-xs text-gray-500 font-medium">Step 1 of 3</p>

          <h1 className="text-2xl font-bold mt-1">Vehicle Details</h1>

          <p className="text-sm text-gray-500 mt-2">
            Add Your Vehicle Information
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-3">
              Vehicle Type
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 cursor-pointer">
              {VEHICLES.map((v, idx) => {
                const Icon = v.icon;
                const active = vechileType == v.id;
                return (
                  <motion.div
                    key={v.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVehicleType(v.id)}
                    className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition ${active ? "bg-black text-white border-black" : "border-gray-200 hover:border-black"}`}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${active ? "bg-white text-black" : "bg-black text-white"}`}
                    >
                      <Icon />
                    </div>

                    <div className="text-sm font-semibold">{v.label}</div>

                    <p
                      className={`text-xs ${active ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="vm"
              className="text-sm text-gray-500 font-semibold mt-2"
            >
              Vehicle Number :
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              id="vm"
              placeholder="MP12AP2004"
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label
              htmlFor="vn"
              className="text-sm text-gray-500 font-semibold mt-2"
            >
              Vehicle Model :
            </label>
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              id="vn"
              placeholder="Tata Safari"
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition"
            />
          </div>
        </div>

        {error && <p className="text-red-500 mt-4">*{error}</p>}

        <motion.button
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVehicle}
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
