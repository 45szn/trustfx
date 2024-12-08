"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "@/components/DashHead";

const Portfolio = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <DashHead title="Portfolio" />
      <h1 className="text-xl font-bold">
        Welcome {user.displayName || user.email}!
      </h1>
    </>
  );
};

export default Portfolio;
