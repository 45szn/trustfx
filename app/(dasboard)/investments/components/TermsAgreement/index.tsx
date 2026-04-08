// // components/InvestmentModal/TermsAgreement.tsx
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";

// interface TermsAgreementProps {
//   checked: boolean;
//   onCheckedChange: (checked: boolean) => void;
// }

// export function TermsAgreement({ checked, onCheckedChange }: TermsAgreementProps) {
//   return (
//     <div className="flex items-center space-x-2">
//       <Checkbox
//         id="terms"
//         checked={checked}
//         onCheckedChange={onCheckedChange}
//       />
//       <Label htmlFor="terms" className="text-sm leading-relaxed">
//         I agree to the{" "}
        
//           href="/termsofservices"
//           target="_blank"
//           className="text-blue-600 hover:underline"
//         >
//           Terms and Conditions
//         </a>{" "}
//         and understand the risks associated with this investment. I confirm
//         that I have read and understood the investment details.
//       </Label>
//     </div>
//   );
// }