"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "@/components/DashHead";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <DashHead title="Dashboard" />
    </div>
  );
};

export default Dashboard;
