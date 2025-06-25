import type { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/-/g, " ")} | Blog - TrustFx`,
  };
}

export async function generateStaticParams() {
  return [
    { slug: "market-volatility-2024-strategies" },
    { slug: "cryptocurrency-traditional-portfolios" },
    { slug: "risk-management-101" },
    { slug: "the-future-of-ai-in-investment-management" },
  ];
}
