import React from "react";
import WhatCustomersSays from "./components/WhatCustomerSays";
import TestimonialsStats from "./components/Stats";
import TestimonialSection from "@/components/Testimonials";

export default function Testimonials() {
  return (
    <>
      <WhatCustomersSays />
      <TestimonialsStats />
      <TestimonialSection />
    </>
  );
};