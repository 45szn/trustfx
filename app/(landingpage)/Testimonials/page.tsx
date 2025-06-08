import React from "react";
import WhatCustomersSays from "./components/WhatCustmersSays";
import TestimonialsStats from "./components/Stats";
import Testimonials from "@/components/Testimonials";

const TestimonialsPage = () => {
  return (
    <>
      <WhatCustomersSays />
      <TestimonialsStats />
      <Testimonials />
    </>
  );
};

export default TestimonialsPage;
