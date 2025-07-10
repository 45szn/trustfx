// file: components/contact/types.ts
import { LucideIcon } from "lucide-react";

export interface ContactDetail {
  label: string;
  value: string;
  note: string;
}

export interface ContactOption {
  id: number;
  sectionid: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: ContactDetail[];
  gradient: string;
  bgGradient: string;
  comingSoon?: boolean;
}
