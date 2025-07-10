import SecurityHero from "./components/SecurityHero";
import SecurityFeatures from "./components/Features";
import SecurityCompliance from "./components/Compliances";
import SecurityEducation from "./components/SecurityEducation";
import SecurityReport from "./components/SecurityReport";

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <SecurityFeatures />
      <SecurityCompliance />
      <SecurityEducation />
      <SecurityReport />
    </>
  );
}
