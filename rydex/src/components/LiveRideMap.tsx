import React, { useEffect, useState } from "react";
import { Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import dynamic from "next/dynamic";
import axios from "axios";

type Props = {
  driverLocation: [number, number] | null;
  pickUpLocation: [number, number] | null;
  dropLocation: [number, number] | null;
  mapStatus: string;
  onStats: (data: {
    distanceToPickUp: number;
    etaToPickup: number;
    distanceToDrop: number;
    etaToDrop: number;
  }) => void;
};

const pickUpIcon = new L.DivIcon({
  className: "",
  html: `
    <div class="live-pickup-container">
      <div class="pickup-label-card">
        <div class="live-indicator">
          <span class="live-dot"></span>
          <span class="live-ripple"></span>
        </div>
        <span class="pickup-text">PICKUP</span>
      </div>
      
      <div class="pin-base-anchor">
        <div class="sonar-wave"></div>
        <div class="core-pin"></div>
      </div>
    </div>

    <style>
      /* Main Container alignment */
      .live-pickup-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        width: 140px;
        height: 90px;
        perspective: 1000px;
      }

      /* Sleek Modern Label (Uber/Premium Style) */
      .pickup-label-card {
        background: #000000; /* Pure dark mode luxury aesthetic */
        padding: 5px 10px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        margin-bottom: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        /* Hardware accelerated micro-float */
        animation: premiumFloat 3.5s ease-in-out infinite;
        will-change: transform;
      }

      .pickup-text {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1.2px;
        color: #ffffff;
        white-space: nowrap;
      }

      /* Live Mode Active Micro-Indicators */
      .live-indicator {
        position: relative;
        width: 8px;
        height: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .live-dot {
        width: 6px;
        height: 6px;
        background: #22c55e; /* Vibrant Live Green */
        border-radius: 50%;
        z-index: 2;
      }

      .live-ripple {
        position: absolute;
        width: 14px;
        height: 14px;
        background: rgba(34, 197, 94, 0.4);
        border-radius: 50%;
        animation: liveAlert 1.5s infinite;
        z-index: 1;
      }

      /* Pin Base Setup */
      .pin-base-anchor {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        width: 20px;
      }

      /* The Anchor point on the map */
      .core-pin {
        width: 10px;
        height: 10px;
        background: #000000;
        border: 3px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        z-index: 3;
      }

      /* High-end Sonar Wave Radar Ring */
      .sonar-wave {
        position: absolute;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        background: radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%);
        border-radius: 50%;
        z-index: 1;
        transform: scale(0.5);
        opacity: 1;
        animation: absoluteSonar 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        will-change: transform, opacity;
      }

      /* Ultra-smooth animations optimized for rendering performance */
      @keyframes premiumFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }

      @keyframes liveAlert {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(1.8); opacity: 0; }
      }

      @keyframes absoluteSonar {
        0% { transform: scale(0.3); opacity: 1; border-color: rgba(0, 0, 0, 0.6); }
        100% { transform: scale(1.8); opacity: 0; border-color: rgba(0, 0, 0, 0); }
      }
    </style>
  `,
  // Perfectly proportioned to match container styles
  iconSize: [100, 90],
  // Anchor coordinates align flawlessly with the centered .core-pin at the bottom
  iconAnchor: [70, 80],
});

const dropOffIcon = new L.DivIcon({
  className: "custom-leaflet-icon",
  html: `
    <div class="premium-dropoff-hud">
      <div class="hud-label-card">
        <div class="square-status-node"></div>
        <span class="hud-text">DROP-OFF</span>
      </div>
      
      <div class="hud-target-anchor">
        <div class="target-radar-ring"></div>
        <div class="target-core-square"></div>
      </div>
    </div>

    <style>
      /* Base Wrapper Alignment */
      .premium-dropoff-hud {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        width: 140px;
        height: 90px;
      }

      /* Luxury Dark Card Styling */
      .hud-label-card {
        background: #111111; /* Pure dark mode luxury aesthetic */
        padding: 5px 10px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.08);
        margin-bottom: 12px;
        
        /* Smooth Entrance & Hardware Accelerated Float */
        animation: hudEntrance 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                   hudFloat 3.5s ease-in-out infinite;
        will-change: transform;
      }

      .hud-text {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1.2px;
        color: #FFFFFF;
        white-space: nowrap;
      }

      .square-status-node {
        width: 5px;
        height: 5px;
        background: #ef4444; /* Premium Crimson Red */
        border-radius: 1px;
      }

      /* Flat Ground Node Anchor (Replaces ugly traditional pins) */
      .hud-target-anchor {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        width: 20px;
      }

      /* The solid terminal destination square on the road */
      .target-core-square {
        width: 8px;
        height: 8px;
        background: #111111;
        border: 2.5px solid #ef4444; /* High-contrast crimson edge */
        border-radius: 2px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        z-index: 3;
        transform: rotate(45deg); /* Rotated to form a sharp diamond */
      }

      /* Continuous Red Radial Radar Pulse */
      .target-radar-ring {
        position: absolute;
        width: 40px;
        height: 40px;
        border: 1.5px solid rgba(239, 68, 68, 0.4);
        background: radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, rgba(239, 68, 68, 0) 70%);
        border-radius: 50%;
        z-index: 1;
        transform: scale(0.5);
        opacity: 1;
        animation: targetPulse 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        will-change: transform, opacity;
      }

      /* Smooth, performance-tuned animations */
      @keyframes hudEntrance {
        0% { transform: translateY(6px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }

      @keyframes hudFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }

      @keyframes targetPulse {
        0% { transform: scale(0.4); opacity: 1; border-color: rgba(239, 68, 68, 0.6); }
        100% { transform: scale(1.6); opacity: 0; border-color: rgba(239, 68, 68, 0); }
      }
    </style>
  `,
  // Perfectly proportioned bounding box to avoid blocking map taps
  iconSize: [140, 90],
  // Center point aligns directly on top of the map coordinates
  iconAnchor: [70, 84],
});

const createDriverIcon = (zoom: number) => {
  // Dynamic sizing based on zoom
  const size =
    zoom >= 16 ? 64
    : zoom >= 14 ? 54
    : zoom >= 12 ? 46
    : zoom >= 10 ? 38
    : 30;

  return new L.DivIcon({
    html: `
      <div
        style="
          width:${size}px;
          height:${size}px;
          display:flex;
          align-items:center;
          justify-content:center;
          position:relative;
          transition:all 0.25s ease;
        "
      >
        <!-- Pulse -->
        <div style="
          position:absolute;
          width:${size * 0.82}px;
          height:${size * 0.82}px;
          border-radius:999px;
          background:rgba(0,0,0,0.12);
          animation:pulseDriver 2s infinite;
        "></div>

        <!-- Main Marker -->
        <div style="
          width:${size * 0.78}px;
          height:${size * 0.78}px;
          border-radius:999px;
          background:linear-gradient(135deg,#111827,#000000);
          border:2px solid white;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:
            0 8px 24px rgba(0,0,0,0.28),
            0 2px 8px rgba(0,0,0,0.18);
          position:relative;
        ">
          
          <!-- Online Indicator -->
          <div style="
            position:absolute;
            top:1px;
            right:1px;
            width:${size * 0.16}px;
            height:${size * 0.16}px;
            border-radius:999px;
            background:#22c55e;
            border:2px solid white;
          "></div>

          <!-- Car SVG -->
          <svg
            width="${size * 0.36}"
            height="${size * 0.36}"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7 16V17C7 17.5523 6.55228 18 6 18C5.44772 18 5 17.5523 5 17V11L6.8 6.6C7.1 5.9 7.7 5.5 8.5 5.5H15.5C16.3 5.5 16.9 5.9 17.2 6.6L19 11V17C19 17.5523 18.5523 18 18 18C17.4477 18 17 17.5523 17 17V16H7Z"
              fill="white"
            />
            <circle cx="8" cy="14" r="1.3" fill="white"/>
            <circle cx="16" cy="14" r="1.3" fill="white"/>
          </svg>
        </div>

        <style>
          @keyframes pulseDriver {
            0% {
              transform: scale(1);
              opacity: 0.5;
            }
            100% {
              transform: scale(1.7);
              opacity: 0;
            }
          }
        </style>
      </div>
    `,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function ZoomHandler({
  setZoom,
}: {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}) {
  const map = useMap();

  useEffect(() => {
    const updateZoom = () => {
      setZoom(map.getZoom());
    };

    updateZoom();

    map.on("zoomend", updateZoom);

    return () => {
      map.off("zoomend", updateZoom);
    };
  }, [map, setZoom]);

  return null;
}

function LiveRideMap({
  driverLocation,
  pickUpLocation,
  dropLocation,
  mapStatus,
  onStats,
}: Props) {
  const [zoom, setZoom] = useState(1);

  const [routeToPickUp, setRouteToPickUp] = useState<[number, number][]>([]);
  const [routeToDrop, setRouteToDrop] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!driverLocation || !pickUpLocation || !dropLocation) return;
    const [pLat, pLon] = pickUpLocation;
    const [dLat, dLon] = dropLocation;
    const [drLat, drLon] = driverLocation;

    const getRoute = async (
      startLat: number,
      startLon: number,
      endLat: number,
      endLon: number,
    ) => {
      const res = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`,
      );
      return res.data.routes?.[0];
    };

    const fetchRoutes = async () => {
      try {
        if (mapStatus == "arriving") {
          const pickUpRoute = await getRoute(drLat, drLon, pLat, pLon);
          const dropRoute = await getRoute(dLat, dLon, drLat, drLon);

          if (pickUpRoute) {
            setRouteToPickUp(
              pickUpRoute.geometry.coordinates.map(([lon, lat]: number[]) => [
                lat,
                lon,
              ]),
            );
          }

          if (dropRoute) {
            setRouteToDrop(
              dropRoute.geometry.coordinates.map(([lon, lat]: number[]) => [
                lat,
                lon,
              ]),
            );
          }

          onStats?.({
            distanceToPickUp: (pickUpRoute?.distance ?? 0) / 1000,
            etaToPickup: (pickUpRoute?.duration ?? 0) / 60,
            distanceToDrop: (dropRoute?.distance ?? 0) / 1000,
            etaToDrop: (dropRoute?.duration ?? 0) / 60,
          });
        } else {
          setRouteToPickUp([]);
          const dropRoute = await getRoute(dLat, dLon, drLat, drLon);
          if (dropRoute) {
            setRouteToDrop(
              dropRoute.geometry.coordinates.map(([lon, lat]: number[]) => [
                lat,
                lon,
              ]),
            );
          }

          onStats?.({
            distanceToPickUp: 0,
            etaToPickup: 0,
            distanceToDrop: (dropRoute?.distance ?? 0) / 1000,
            etaToDrop: (dropRoute?.duration ?? 0) / 60,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoutes();
  }, [driverLocation, mapStatus]);

  const showPickUpMarker = mapStatus === "arriving";
  const showPickUpRoute = mapStatus === "arriving" && routeToPickUp.length > 0;
  const showDropRoute = mapStatus != "completed" && routeToDrop.length > 0;

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
        center={(pickUpLocation as any) ?? [0, 0]}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />

        {pickUpLocation && (
          <Marker position={pickUpLocation as any} icon={pickUpIcon} />
        )}

        {dropLocation && (
          <Marker position={dropLocation as any} icon={dropOffIcon} draggable />
        )}

        {driverLocation && (
          <Marker
            position={driverLocation as any}
            icon={createDriverIcon(zoom)}
          />
        )}

        {showPickUpRoute && (
          <>
            <Polyline
              positions={routeToPickUp}
              pathOptions={{
                color: "#888",
                weight: 4,
                dashArray: "2 10",
                lineCap: "round",
              }}
            />
          </>
        )}

        {showDropRoute && (
          <>
            <Polyline
              positions={routeToDrop}
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
    </div>
  );
}

export default LiveRideMap;
