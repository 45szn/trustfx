"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "@/components/DashHead";

const Transactions = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or handle this case differently, e.g., redirect
  }

  return (
    <>
      <DashHead title="Transactions" />
    </>
  );
};

export default Transactions;
