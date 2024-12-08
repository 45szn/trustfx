"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "@/components/DashHead";

const Investments = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or handle this case differently, e.g., redirect
  }

  return (
    <>
      <DashHead title="Investments" />
    </>
  );
};

export default Investments;
