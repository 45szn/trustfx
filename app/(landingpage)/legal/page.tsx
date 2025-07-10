import { PageTransition } from "@/components/PageTransition";
import { LegalHero } from "./components/Hero";
import { LegalContent } from "./components/Content";
import { LegalContact } from "./components/Contact";

export default function LegalPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <LegalHero />
        <LegalContent />
        <LegalContact />
      </div>
    </PageTransition>
  );
}
