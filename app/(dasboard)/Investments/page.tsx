"use client";

import React from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "@/app/(dasboard)/components/DashHead";
// import { useSearchParams } from "next/navigation";

const Investments = () => {
  const { user } = useAuth();
  // const searchParams = useSearchParams();
  // const plan = searchParams.get("plan");

  // optionally scroll, open modal, or pre-fill form with plan name

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
