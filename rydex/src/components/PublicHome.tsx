"use client";
import React, { useState } from "react";
import HeroSection from "./HeroSection";
import Vechileslider from "./Vechileslider";
import AuthModal from "./AuthModal";

function PublicHome() {
  const [authopen, setAuthOpen] = useState(false);

  return (
    <>
      <HeroSection onAuthRequired={() => setAuthOpen(true)} />
      <Vechileslider />
      <AuthModal open={authopen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default PublicHome;
