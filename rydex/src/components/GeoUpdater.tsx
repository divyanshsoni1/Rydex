"use client";
import { getSocket } from "@/lib/socket";
import React, { useEffect, useRef } from "react";

function GeoUpdater({ userId }: { userId: string }) {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!userId) return;
    if (!navigator.geolocation) return;

    socketRef.current = getSocket();

    const handleConnect = () => {
      console.log("Socket Connected");
      socketRef.current.emit("identity", userId);
    };

    if (socketRef.current.connected) {
      handleConnect();
    }

    socketRef.current.on("connect", handleConnect);

    const watcher = navigator.geolocation.watchPosition(
      ({ coords }) => {
        socketRef.current.emit("update-location", {
          userId,
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },

      (err) => {
        console.log(err);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 5000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watcher);
      socketRef.current.off("connect", handleConnect);
    };
  }, [userId]);

  return null;
}

export default GeoUpdater;
