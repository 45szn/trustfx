import React from "react";
import HereToHelp from "./components/HereToHelp";
import ContactOptions from "./components/ContactOptions";
import ContactForm from "./components/ContactForm";
// import ContactInfo from "./components/ContactInfo";
import ContactCTA from "./components/ContactCTA";

const Contact = () => {
  return (
    <>
      <HereToHelp />
      <ContactOptions />
      <ContactForm />
      {/* <ContactInfo /> */}
      <ContactCTA />
    </>
  );
};

export default Contact;
