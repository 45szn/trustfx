import React from "react";
import Journey from "./components/Journey";
import InvestmentPlans from "@/components/Plans";
import PlansIncluded from "./components/IncludedPlans";
import PlansComparison from "./components/PlansComparisons";
import PlansFAQ from "./components/PlansFAQ";
import PlansCTA from "./components/CTA";

export default function Plans() {
  return (
    <>
      <Journey />
      <InvestmentPlans />
      <PlansIncluded />
      <PlansComparison />
      <PlansFAQ />
      <PlansCTA />
    </>
  );
}
