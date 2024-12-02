"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";

const Investments = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or handle this case differently, e.g., redirect
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Investments</h1>
    </div>
  );
};

export default Investments;
