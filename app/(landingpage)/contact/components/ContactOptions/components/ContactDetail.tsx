// file: components/contact/ContactDetail.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ContactDetail as DetailType } from "./types";

interface Props {
  detail: DetailType;
  comingSoon: boolean;
}

export default function ContactDetail({ detail, comingSoon }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(detail.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const showCopy =
    !comingSoon && (detail.value.includes("@") || detail.value.includes("+1"));

  return (
    <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900">{detail.label}:</span>
        {showCopy && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0"
          >
            <Copy className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="text-lg font-medium text-gray-800 mb-1">
        {detail.value}
      </div>
      <div className="text-sm text-gray-600">{detail.note}</div>
      {copied && (
        <div className="text-xs text-green-600 mt-1">
          ✓ Copied to clipboard!
        </div>
      )}
    </div>
  );
}
