"use client";
import React, { useEffect, useState } from "react";
import { Polyline, useMap } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Navigation2 } from "lucide-react";

type Props = {
  pickUp: string;
  drop: string;
  onChange: (p: string, d: string) => void;
  onDistance: (d: number) => void;
};

function FitBounds({ p1, p2 }: { p1: [number, number]; p2: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.fitBounds([p1, p2], {
      padding: [72, 72],
      maxZoom: 15,
      animate: true,
      duration: 1,
    });
  }, [p1, p2, map]);

  return null;
}

const pickUpIcon = new L.DivIcon({
  className: "",
  html: `
    <div class="marker-wrapper">
      <div class="label-card">
        <span class="dot"></span>
        <span class="text">Pickup Location</span>
      </div>
      
      <div class="pin-anchor">
        <div class="pulse-ring"></div>
        <div class="main-pin"></div>
      </div>
    </div>

    <style>
      .marker-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(-20px); /* Centers the pin over the coord */
      }

      .label-card {
        background: white;
        padding: 6px 12px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        border: 1px solid rgba(0,0,0,0.05);
        margin-bottom: 8px;
        animation: float 3s ease-in-out infinite;
      }

      .dot {
        width: 6px;
        height: 6px;
        background: #2563eb; /* Professional Blue */
        border-radius: 50%;
      }

      .text {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 12px;
        font-weight: 600;
        color: #1e293b;
        white-space: nowrap;
      }

      .pin-anchor {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .main-pin {
        width: 12px;
        height: 12px;
        background: #1e293b;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        z-index: 2;
      }

      .pulse-ring {
        position: absolute;
        width: 30px;
        height: 30px;
        background: rgba(37, 99, 235, 0.2);
        border-radius: 50%;
        z-index: 1;
        animation: pulse 2s infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }

      @keyframes pulse {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
    </style>
  `,
  iconSize: [120, 80], // Larger hit area for the floating label
  iconAnchor: [60, 65], // Anchors exactly on the main-pin
});

const dropOffIcon = new L.DivIcon({
  className: "custom-leaflet-icon",
  html: `
    <div class="marker-wrapper">
      <div class="label-card destination">
        <span class="square"></span>
        <span class="text">Drop-off Point</span>
      </div>
      
      <div class="pin-wrapper">
        <svg viewBox="0 0 24 36" width="10" height="17" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="34.5" rx="7" ry="1.5" fill="rgba(0,0,0,0.15)"/>
          <path d="M12 0C5.4 0 0 5.4 0 12c0 8.8 10.4 22.4 11.2 23.4.4.5 1.2.5 1.6 0C13.6 34.4 24 20.8 24 12c0-6.6-5.4-12-12-12z" fill="#ef4444"/>
          <rect x="8" y="8" width="8" height="8" fill="#ffffff" rx="1.5"/>
        </svg>
      </div>
    </div>

    <style>
      .marker-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end; 
        height: 100%;
        width: 100%;
      }

      .label-card {
        background: white;
        padding: 4px 10px; /* Tighter padding */
        border-radius: 16px; 
        display: flex;
        align-items: center;
        gap: 6px; /* Tighter gap */
        box-shadow: 0 3px 10px rgba(0,0,0,0.1); /* Softer, smaller shadow */
        border: 1px solid rgba(0,0,0,0.06);
        margin-bottom: 2px;
        animation: slideDown 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      .destination .square {
        width: 5px; /* Smaller indicator */
        height: 5px;
        background: #ef4444; 
        border-radius: 1px;
      }

      .text {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 11px; /* Optimal size for map readability */
        font-weight: 600;
        color: #1e293b;
        white-space: nowrap;
      }

      .pin-wrapper {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        animation: dropIn 0.3s ease-out forwards;
        transform-origin: bottom center;
      }

      /* Adjusted animations for a smaller scale */
      @keyframes dropIn {
        0% { transform: translateY(-8px) scale(0.9); opacity: 0; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes slideDown {
        0% { transform: translateY(-10px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
    </style>
  `,
  // Reduced the bounding box size so it doesn't block underlying map clicks
  iconSize: [120, 60],
  // Anchor remains perfectly centered at the bottom to touch the route
  iconAnchor: [60, 60],
});

function SearchMap({ pickUp, drop, onChange, onDistance }: Props) {
  const [p1, setP1] = useState<[number, number]>();
  const [p2, setP2] = useState<[number, number]>();
  const [route, setRoute] = useState<[number, number][]>([]);
  const [km, setkm] = useState<number | null>(0);
  const [ready, setReady] = useState(false);

  const geoCoding = async (q: string): Promise<[number, number] | null> => {
    try {
      const { data } = await axios.get(
        "https://api.geoapify.com/v1/geocode/autocomplete",
        {
          params: {
            text: q.trim(),
            apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
            filter: "countrycode:in",
            limit: 1,
          },
        },
      );
      if (!data.features.length) return null;
      const [lon, lat] = data.features[0].geometry.coordinates;
      return [lat, lon];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const reverseGeoCoding = async (lat: number, lon: number) => {
    try {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse`,
        {
          params: {
            lat,
            lon,
            apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
            filter: "countrycode:in",
          },
        },
      );
      if (!data.features.length || data.features.length === 0) return;
      const prop = data.features[0].properties;
      return [prop.name, prop.street, prop.city, prop.state, prop.country]
        .filter(Boolean)
        .join(",");
    } catch (error) {
      console.log("Reverse Geocoding error", error);
      return null;
    }
  };

  const getFormattedETA = (
    distanceKm: number,
    avgSpeedKmh: number = 25,
  ): string => {
    const baseDelayMinutes = 2;
    const rawMinutes = (distanceKm / avgSpeedKmh) * 60;

    const totalMinutes = Math.max(3, Math.round(rawMinutes + baseDelayMinutes));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
    }

    return `${minutes} min`;
  };

  const loadRoute = async (p: [number, number], d: [number, number]) => {
    // drop [latitude , longitude]
    try {
      const { data } = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${p[1]},${p[0]};${d[1]},${d[0]}?overview=full&geometries=geojson`,
      );
      if (!data.routes.length) return;
      setRoute(
        data.routes[0].geometry.coordinates.map(([lon, lat]: number[]) => [
          lat,
          lon,
        ]),
      );

      const distKm = +(data.routes[0].distance / 1000).toFixed(2);
      setkm(distKm);
      onDistance(distKm);
    } catch (error) {
      console.log(error);
    }
  };

  const dragPickUp = async (lat: number, lon: number) => {
    const add = await reverseGeoCoding(lat, lon);
    setP1([lat, lon]);
    if (p2) {
      loadRoute([lat, lon], p2);
    }
    onChange(add!, drop);
  };

  const dragDrop = async (lat: number, lon: number) => {
    const add = await reverseGeoCoding(lat, lon);
    setP2([lat, lon]);
    if (p1) {
      loadRoute(p1, [lat, lon]);
    }
    onChange(pickUp, add!);
  };

  useEffect(() => {
    setReady(false);
    if (pickUp && drop) {
      (async () => {
        const a = await geoCoding(pickUp);
        const b = await geoCoding(drop);
        if (!a || !b) {
          return;
        }

        await loadRoute(a, b);
        setP1(a);
        setP2(b);
        setReady(true);
      })();
    }
  }, [pickUp, drop]);

  const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false },
  );

  const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false },
  );

  const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false },
  );

  return (
    <div className="relative h-full w-full bg-zinc-100">
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={p1 ?? [0, 0]}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">"CARTO"</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        {p1 && p2 && <FitBounds p1={p1} p2={p2} />}

        {p1 && (
          <Marker
            position={p1}
            icon={pickUpIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const curr = e.target.getLatLng();
                dragPickUp(curr.lat, curr.lng);
              },
            }}
          />
        )}

        {p2 && (
          <Marker
            position={p2}
            icon={dropOffIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const curr = e.target.getLatLng();
                dragDrop(curr.lat, curr.lng);
              },
            }}
          />
        )}

        {route.length > 0 && (
          <>
            <Polyline
              positions={route}
              pathOptions={{
                color: "#2563EB",
                weight: 4,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </>
        )}
      </MapContainer>

      <AnimatePresence>
        {!ready && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 z-999 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-4"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-zinc-900"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-transparent border-t-zinc-300"
              />
              <MapPin size={16} className="text-zinc-800" />
            </div>
            <div className="text-center">
              <p className="text-zinc-900 text-xs font-black tracking-[0.22em] uppercase">
                Loading Map
              </p>
              <p className="text-zinc-400 text-[10px] font-medium tracking-wider mt-0.5">
                Plotting your route...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ready && km !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-8 left-4 z-500 flex items-center gap-2 bg-white border border-zinc-200 px-3.5 py-2 rounded-xl shadow-lg"
          >
            <Navigation2 size={13} className="text-zinc-900" />
            <span className="text-zinc-900 text-xs font-bold">{km} Km</span>
            <span className="w-px h-3 bg-zinc-200" />
            <span>~{getFormattedETA(km)}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchMap;
