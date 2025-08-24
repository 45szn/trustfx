import { Card, CardContent } from "@/components/ui/card";
import LinkWithLoader from "@/components/LinkWithLoader";
import { TrendingUp } from "lucide-react";

interface CTAProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    href?: string;
  };
  variant?: "light" | "dark";
}

export default function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "light",
}: CTAProps) {
  const isDark = variant === "dark";

  return (
    <div className={isDark ? "mt-16 text-center" : "relative"}>
      {!isDark && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 blur-2xl" />
      )}
      <Card
        className={
          isDark
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
            : "relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 shadow-xl"
        }
      >
        <CardContent className="p-12 text-center">
          {!isDark && (
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-lg animate-pulse">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          )}

          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h3>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDark ? "text-blue-100" : "text-gray-600"
            }`}
          >
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LinkWithLoader href={primaryAction.href}>
              <button
                className={`px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 group ${
                  isDark
                    ? "bg-white text-blue-600 hover:shadow-xl"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-xl"
                }`}
              >
                {primaryAction.label}
                {primaryAction.icon && (
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                    {primaryAction.icon}
                  </span>
                )}
              </button>
            </LinkWithLoader>

            {secondaryAction &&
              (secondaryAction.href ? (
                <LinkWithLoader href={secondaryAction.href}>
                  <button
                    className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 ${
                      isDark
                        ? "border-2 border-white text-white hover:bg-white/10"
                        : "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {secondaryAction.label}
                  </button>
                </LinkWithLoader>
              ) : (
                <button
                  className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 ${
                    isDark
                      ? "border-2 border-white text-white hover:bg-white/10"
                      : "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {secondaryAction.label}
                </button>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
