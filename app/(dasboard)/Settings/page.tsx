"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "@/components/DashHead";

const Settings = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or handle this case differently, e.g., redirect
  }

  return (
    <>
      <DashHead title="Settings" />
    </>
  );
};

export default Settings;
