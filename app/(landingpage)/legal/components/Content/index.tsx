"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Cookie,
  AlertTriangle,
  Shield,
  Eye,
  Settings,
  Lock,
  Globe,
  Calendar,
  TrendingDown,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const cookieSections = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    icon: Cookie,
    content: `Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.

We use cookies to:
• Remember your preferences and settings
• Analyze how you use our website
• Provide personalized content and advertisements
• Ensure security and prevent fraud
• Improve our services and user experience`,
  },
  {
    id: "types-of-cookies",
    title: "Types of Cookies We Use",
    icon: Settings,
    content: `**Essential Cookies**
These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.

**Performance Cookies**
These cookies collect information about how visitors use our website, such as which pages are visited most often. This data helps us improve our website performance.

**Functional Cookies**
These cookies allow the website to remember choices you make and provide enhanced, more personal features.

**Targeting/Advertising Cookies**
These cookies are used to deliver advertisements more relevant to you and your interests. They also limit the number of times you see an advertisement.

**Analytics Cookies**
We use analytics cookies to understand how visitors interact with our website by collecting and reporting information anonymously.`,
  },
  {
    id: "third-party-cookies",
    title: "Third-Party Cookies",
    icon: Globe,
    content: `We may allow third-party companies to serve cookies on our website for analytics, advertising, and other purposes:

**Google Analytics**
We use Google Analytics to analyze website traffic and user behavior. Google may use this data in accordance with their privacy policy.

**Social Media Cookies**
Social media platforms may set cookies when you share content or interact with social media features on our site.

**Advertising Partners**
Our advertising partners may use cookies to show you relevant advertisements on other websites.

**Payment Processors**
Payment service providers may use cookies to facilitate secure transactions and prevent fraud.`,
  },
  {
    id: "managing-cookies",
    title: "Managing Your Cookie Preferences",
    icon: Eye,
    content: `You have several options for managing cookies:

**Browser Settings**
Most web browsers allow you to control cookies through their settings preferences. You can:
• Block all cookies
• Block third-party cookies only
• Delete cookies when you close your browser
• Set up notifications when cookies are being sent

**Cookie Consent Tool**
We provide a cookie consent tool that allows you to:
• Accept or reject different types of cookies
• Change your preferences at any time
• View detailed information about each cookie category

**Opt-Out Links**
For third-party cookies, you can often opt out directly through the provider's website or through industry opt-out tools.

**Note:** Disabling certain cookies may affect the functionality of our website and your user experience.`,
  },
];

const riskSections = [
  {
    id: "investment-risks",
    title: "Investment Risks",
    icon: TrendingDown,
    content: `**Market Risk**
The value of investments can go down as well as up, and you may get back less than you invested. Market conditions can change rapidly and unpredictably.

**Volatility Risk**
Investment values may fluctuate significantly over short periods. High volatility can result in substantial gains or losses.

**Liquidity Risk**
Some investments may be difficult to sell quickly at a fair price, especially during market stress or for less commonly traded securities.

**Currency Risk**
If you invest in assets denominated in foreign currencies, changes in exchange rates may affect the value of your investment.

**Inflation Risk**
The purchasing power of your investment returns may be eroded by inflation over time.

**Interest Rate Risk**
Changes in interest rates can affect the value of fixed-income investments and other interest-sensitive securities.`,
  },
  {
    id: "platform-risks",
    title: "Platform and Technology Risks",
    icon: Zap,
    content: `**Technology Risk**
Our platform relies on technology systems that may experience outages, delays, or technical failures that could affect your ability to access your account or execute transactions.

**Cybersecurity Risk**
Despite our security measures, cyber attacks, data breaches, or system failures could potentially compromise your personal information or account security.

**Operational Risk**
Errors in our operations, systems, or processes could affect the accuracy of account information or transaction processing.

**Third-Party Risk**
We rely on third-party service providers for various services. Failures or issues with these providers could impact our services.

**Regulatory Risk**
Changes in laws, regulations, or regulatory interpretation could affect our operations and the services we provide.`,
  },
  {
    id: "specific-disclaimers",
    title: "Specific Disclaimers",
    icon: AlertTriangle,
    content: `**No Investment Advice**
The information provided on our platform is for informational purposes only and does not constitute investment advice, financial advice, or recommendations.

**Past Performance**
Past performance is not indicative of future results. Historical returns do not guarantee future performance.

**No Guarantees**
We do not guarantee the performance of any investment or the accuracy of any projections, forecasts, or estimates.

**Independent Decision Making**
You are responsible for making your own investment decisions based on your financial situation, investment objectives, and risk tolerance.

**Professional Advice**
You should consult with qualified financial, tax, and legal advisors before making investment decisions.

**Suitability**
Not all investments are suitable for all investors. You should carefully consider whether an investment is appropriate for your circumstances.`,
  },
  {
    id: "regulatory-disclaimers",
    title: "Regulatory Disclaimers",
    icon: Shield,
    content: `**Securities Regulation**
Investments offered through our platform may be subject to various securities laws and regulations. We are registered with appropriate regulatory authorities.

**SIPC Protection**
Your securities may be protected by the Securities Investor Protection Corporation (SIPC) up to applicable limits, but SIPC does not protect against investment losses.

**Anti-Money Laundering**
We are required to comply with anti-money laundering laws and may be required to report suspicious activities to regulatory authorities.

**Tax Implications**
Investment activities may have tax consequences. You are responsible for understanding and complying with applicable tax laws.

**International Investors**
If you are investing from outside the United States, additional regulations and restrictions may apply.

**Regulatory Changes**
Regulatory requirements may change, which could affect our services or your investments.`,
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    icon: Lock,
    content: `**Service Availability**
We strive to maintain continuous service availability but cannot guarantee uninterrupted access to our platform.

**Information Accuracy**
While we endeavor to provide accurate information, we cannot guarantee the completeness or accuracy of all data and information.

**Third-Party Content**
We are not responsible for the accuracy or reliability of third-party information, research, or analysis provided through our platform.

**Investment Losses**
We are not liable for investment losses resulting from market conditions, investment decisions, or other factors beyond our control.

**Force Majeure**
We are not liable for delays or failures in performance resulting from circumstances beyond our reasonable control.

**Maximum Liability**
Our total liability to you for any claims related to our services is limited to the fees you have paid to us in the preceding 12 months.`,
  },
];

export function LegalContent() {
  const [expandedCookie, setExpandedCookie] = useState<string | null>(null);
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  const toggleCookieSection = (sectionId: string) => {
    setExpandedCookie(expandedCookie === sectionId ? null : sectionId);
  };

  const toggleRiskSection = (sectionId: string) => {
    setExpandedRisk(expandedRisk === sectionId ? null : sectionId);
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cookie Policy Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
          id="cookiepolicy"
        >
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-600/10 rounded-full">
                <Cookie className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cookie Policy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how we use cookies and similar technologies to improve your
              experience on our platform.
            </p>
          </div>

          <div className="space-y-4">
            {cookieSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleCookieSection(section.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg mr-4">
                          <section.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {section.title}
                        </h3>
                      </div>
                      {expandedCookie === section.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    {expandedCookie === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="prose prose-gray max-w-none">
                          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                            {section.content}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Disclaimer Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="riskdisclaimer"
        >
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-600/10 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Risk Disclaimers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Important information about the risks associated with investing
              and using our platform.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Important Risk Warning
                </h3>
                <p className="text-red-700">
                  All investments carry risk and you may lose some or all of
                  your money. Past performance does not guarantee future
                  results. Please read all risk disclosures carefully before
                  investing.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {riskSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleRiskSection(section.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-red-100 rounded-lg mr-4">
                          <section.icon className="h-5 w-5 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {section.title}
                        </h3>
                      </div>
                      {expandedRisk === section.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    {expandedRisk === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="prose prose-gray max-w-none">
                          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                            {section.content}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            Last updated: December 25, 2024
          </div>
        </motion.div>
      </div>
    </section>
  );
}
