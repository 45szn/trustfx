import React from 'react'
import AboutMission from './components/Missions';
import SetUsApart from './components/SetUsApart';
import AboutStandards from './components/Standards';
import FAQSection from '@/components/FAQs';

export default function AboutPage() {
  return (
    <>
      <AboutMission />
      <SetUsApart />
      <AboutStandards />
      <FAQSection />
    </>
  );
}
