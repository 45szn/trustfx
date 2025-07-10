"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  FileText,
  Shield,
  CreditCard,
  AlertTriangle,
  Users,
  Globe,
  Gavel,
  Phone,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: FileText,
    content: `
      <h3>Agreement to Terms</h3>
      <p>By accessing, browsing, or using the TrustFx platform, website, mobile application, or any related services (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms") and our Privacy Policy.</p>
      
      <h3>Legal Capacity</h3>
      <p>You represent and warrant that:</p>
      <ul>
        <li>You are at least 18 years of age or the age of majority in your jurisdiction</li>
        <li>You have the legal capacity to enter into binding agreements</li>
        <li>You are not prohibited from using financial services under applicable laws</li>
        <li>All information you provide is accurate, current, and complete</li>
      </ul>
      
      <h3>Entity Users</h3>
      <p>If you are using our Services on behalf of an organization:</p>
      <ul>
        <li>You represent that you have authority to bind that organization</li>
        <li>The organization agrees to be bound by these Terms</li>
        <li>References to "you" include both you individually and the organization</li>
      </ul>
      
      <h3>Modifications</h3>
      <p>We reserve the right to modify these Terms at any time. Material changes will be communicated through:</p>
      <ul>
        <li>Email notifications to registered users</li>
        <li>Prominent notices on our platform</li>
        <li>In-app notifications for significant changes</li>
      </ul>
      <p>Continued use of our Services after changes constitutes acceptance of the modified Terms.</p>
    `,
  },
  {
    id: "services",
    title: "Description of Services",
    icon: CreditCard,
    content: `
      <h3>Investment Platform</h3>
      <p>TrustFx provides an online investment platform that offers:</p>
      <ul>
        <li><strong>Investment Management:</strong> Automated and managed investment portfolios</li>
        <li><strong>Financial Planning:</strong> Tools and guidance for financial goal setting</li>
        <li><strong>Market Analysis:</strong> Research, insights, and market data</li>
        <li><strong>Portfolio Tracking:</strong> Real-time monitoring and reporting</li>
      </ul>
      
      <h3>Investment Plans</h3>
      <p>We offer various investment plans with different:</p>
      <ul>
        <li>Risk levels and return expectations</li>
        <li>Investment minimums and maximums</li>
        <li>Time horizons and liquidity options</li>
        <li>Fee structures and management approaches</li>
      </ul>
      
      <h3>Technology Services</h3>
      <ul>
        <li><strong>Platform Access:</strong> Web and mobile application interfaces</li>
        <li><strong>Account Management:</strong> User dashboard and account controls</li>
        <li><strong>Security Features:</strong> Authentication and fraud protection</li>
        <li><strong>Customer Support:</strong> Help desk and educational resources</li>
      </ul>
      
      <h3>Service Availability</h3>
      <p>While we strive for continuous availability, our Services may be temporarily unavailable due to:</p>
      <ul>
        <li>Scheduled maintenance and updates</li>
        <li>Technical difficulties or system failures</li>
        <li>Market closures or trading halts</li>
        <li>Regulatory requirements or legal obligations</li>
      </ul>
    `,
  },
  {
    id: "account",
    title: "Account Registration and Security",
    icon: Shield,
    content: `
      <h3>Account Creation</h3>
      <p>To use our investment services, you must:</p>
      <ul>
        <li>Create an account with accurate personal information</li>
        <li>Complete identity verification (KYC) procedures</li>
        <li>Provide required financial information and documentation</li>
        <li>Accept applicable investment agreements and disclosures</li>
      </ul>
      
      <h3>Identity Verification</h3>
      <p>We are required by law to verify your identity, which may include:</p>
      <ul>
        <li>Government-issued photo identification</li>
        <li>Social Security Number or Tax ID verification</li>
        <li>Address verification through utility bills or bank statements</li>
        <li>Additional documentation as required by regulations</li>
      </ul>
      
      <h3>Account Security</h3>
      <p>You are responsible for:</p>
      <ul>
        <li>Maintaining the confidentiality of your login credentials</li>
        <li>Using strong passwords and enabling two-factor authentication</li>
        <li>Immediately notifying us of any unauthorized access</li>
        <li>Keeping your contact information current and accurate</li>
      </ul>
      
      <h3>Account Restrictions</h3>
      <p>We may suspend or terminate accounts that:</p>
      <ul>
        <li>Violate these Terms or applicable laws</li>
        <li>Engage in fraudulent or suspicious activities</li>
        <li>Fail to complete required verification procedures</li>
        <li>Remain inactive for extended periods</li>
      </ul>
      
      <h3>Multiple Accounts</h3>
      <p>Each individual may maintain only one personal account. Multiple accounts may result in:</p>
      <ul>
        <li>Account suspension or closure</li>
        <li>Forfeiture of promotional benefits</li>
        <li>Additional verification requirements</li>
      </ul>
    `,
  },
  {
    id: "investment",
    title: "Investment Terms and Risks",
    icon: AlertTriangle,
    content: `
      <h3>Investment Risks</h3>
      <p><strong>IMPORTANT:</strong> All investments carry risk, including the potential loss of principal. You acknowledge and understand that:</p>
      <ul>
        <li>Past performance does not guarantee future results</li>
        <li>Investment values may fluctuate and can go down as well as up</li>
        <li>You may lose some or all of your invested capital</li>
        <li>Market conditions can affect investment performance</li>
      </ul>
      
      <h3>Investment Decisions</h3>
      <p>You acknowledge that:</p>
      <ul>
        <li>You are responsible for your investment decisions</li>
        <li>Our recommendations are based on information you provide</li>
        <li>You should consider your financial situation and risk tolerance</li>
        <li>You may want to consult with independent financial advisors</li>
      </ul>
      
      <h3>Suitability and Risk Assessment</h3>
      <p>We will assess investment suitability based on:</p>
      <ul>
        <li>Your stated investment objectives and time horizon</li>
        <li>Financial situation and net worth</li>
        <li>Investment experience and knowledge</li>
        <li>Risk tolerance and capacity for loss</li>
      </ul>
      
      <h3>Investment Minimums and Maximums</h3>
      <ul>
        <li>Each investment plan has specified minimum investment amounts</li>
        <li>Maximum investment limits may apply based on regulations</li>
        <li>We reserve the right to reject investments that exceed risk parameters</li>
        <li>Concentration limits may apply to prevent over-exposure</li>
      </ul>
      
      <h3>Market Volatility</h3>
      <p>You understand that:</p>
      <ul>
        <li>Financial markets are subject to volatility and unpredictable events</li>
        <li>Economic, political, and social factors can affect investments</li>
        <li>Liquidity may be limited during certain market conditions</li>
        <li>Trading may be halted or restricted in extreme circumstances</li>
      </ul>
    `,
  },
  {
    id: "fees",
    title: "Fees and Payments",
    icon: CreditCard,
    content: `
      <h3>Fee Structure</h3>
      <p>Our fees are clearly disclosed and may include:</p>
      <ul>
        <li><strong>Management Fees:</strong> Annual percentage of assets under management</li>
        <li><strong>Performance Fees:</strong> Percentage of profits above specified benchmarks</li>
        <li><strong>Transaction Fees:</strong> Costs associated with buying and selling securities</li>
        <li><strong>Administrative Fees:</strong> Account maintenance and service charges</li>
      </ul>
      
      <h3>Fee Calculation and Payment</h3>
      <ul>
        <li>Management fees are typically calculated daily and charged monthly</li>
        <li>Performance fees are calculated and charged at specified intervals</li>
        <li>Fees are automatically deducted from your account balance</li>
        <li>Detailed fee information is provided in your investment agreement</li>
      </ul>
      
      <h3>Third-Party Costs</h3>
      <p>You may also incur costs from third parties, including:</p>
      <ul>
        <li>Underlying fund expense ratios</li>
        <li>Custodial and clearing fees</li>
        <li>Regulatory and exchange fees</li>
        <li>Wire transfer and processing charges</li>
      </ul>
      
      <h3>Fee Changes</h3>
      <p>We may modify our fee structure with:</p>
      <ul>
        <li>30 days advance written notice for increases</li>
        <li>Immediate effect for decreases</li>
        <li>Opportunity to close your account without penalty during notice period</li>
      </ul>
      
      <h3>Payment Methods</h3>
      <p>Accepted payment methods include:</p>
      <ul>
        <li>Bank transfers (ACH and wire)</li>
        <li>Certified checks and money orders</li>
        <li>Transfers from other investment accounts</li>
        <li>Cryptocurrency (where legally permitted)</li>
      </ul>
    `,
  },
  {
    id: "conduct",
    title: "User Conduct and Prohibited Activities",
    icon: Users,
    content: `
      <h3>Acceptable Use</h3>
      <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You will not:</p>
      <ul>
        <li>Violate any applicable laws, regulations, or third-party rights</li>
        <li>Engage in fraudulent, deceptive, or misleading activities</li>
        <li>Interfere with or disrupt our Services or servers</li>
        <li>Attempt to gain unauthorized access to our systems</li>
      </ul>
      
      <h3>Prohibited Financial Activities</h3>
      <ul>
        <li><strong>Money Laundering:</strong> Using our platform to launder money or finance illegal activities</li>
        <li><strong>Market Manipulation:</strong> Attempting to manipulate market prices or trading volumes</li>
        <li><strong>Insider Trading:</strong> Trading based on material non-public information</li>
        <li><strong>Fraud:</strong> Providing false information or engaging in deceptive practices</li>
      </ul>
      
      <h3>Account Misuse</h3>
      <p>Prohibited account activities include:</p>
      <ul>
        <li>Sharing account credentials with unauthorized persons</li>
        <li>Creating multiple accounts to circumvent restrictions</li>
        <li>Using automated systems without authorization</li>
        <li>Attempting to reverse engineer our platform</li>
      </ul>
      
      <h3>Content and Communications</h3>
      <p>When communicating through our platform, you may not:</p>
      <ul>
        <li>Post offensive, threatening, or inappropriate content</li>
        <li>Spam or send unsolicited communications</li>
        <li>Infringe on intellectual property rights</li>
        <li>Distribute malware or harmful code</li>
      </ul>
      
      <h3>Consequences of Violations</h3>
      <p>Violations may result in:</p>
      <ul>
        <li>Warning notices and account restrictions</li>
        <li>Temporary or permanent account suspension</li>
        <li>Forfeiture of account benefits or bonuses</li>
        <li>Legal action and reporting to authorities</li>
      </ul>
    `,
  },
  {
    id: "intellectual",
    title: "Intellectual Property Rights",
    icon: Globe,
    content: `
      <h3>Our Intellectual Property</h3>
      <p>TrustFx and its licensors own all rights, title, and interest in:</p>
      <ul>
        <li>The TrustFx platform, website, and mobile applications</li>
        <li>All software, algorithms, and proprietary technology</li>
        <li>Trademarks, logos, and brand elements</li>
        <li>Content, research, and analytical materials</li>
      </ul>
      
      <h3>Limited License</h3>
      <p>We grant you a limited, non-exclusive, non-transferable license to:</p>
      <ul>
        <li>Access and use our Services for personal investment purposes</li>
        <li>Download and use our mobile applications on your devices</li>
        <li>View and print materials for your personal records</li>
      </ul>
      
      <h3>Restrictions</h3>
      <p>You may not:</p>
      <ul>
        <li>Copy, modify, or create derivative works of our platform</li>
        <li>Reverse engineer, decompile, or disassemble our software</li>
        <li>Remove or alter any proprietary notices or labels</li>
        <li>Use our intellectual property for commercial purposes</li>
      </ul>
      
      <h3>User Content</h3>
      <p>For any content you submit to our platform:</p>
      <ul>
        <li>You retain ownership of your original content</li>
        <li>You grant us a license to use, store, and process such content</li>
        <li>You represent that you have the right to submit such content</li>
        <li>You agree not to submit confidential or proprietary information</li>
      </ul>
      
      <h3>Third-Party Content</h3>
      <p>Our platform may include content from third parties:</p>
      <ul>
        <li>Market data and financial information</li>
        <li>News articles and research reports</li>
        <li>Educational materials and tools</li>
        <li>Such content is owned by respective third parties</li>
      </ul>
      
      <h3>Copyright Infringement</h3>
      <p>If you believe your copyright has been infringed, please contact us with:</p>
      <ul>
        <li>Description of the copyrighted work</li>
        <li>Location of the allegedly infringing material</li>
        <li>Your contact information and electronic signature</li>
        <li>Statement of good faith belief that use is unauthorized</li>
      </ul>
    `,
  },
  {
    id: "liability",
    title: "Disclaimers and Limitation of Liability",
    icon: Gavel,
    content: `
      <h3>Service Disclaimers</h3>
      <p>OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, INCLUDING:</p>
      <ul>
        <li>Implied warranties of merchantability and fitness for a particular purpose</li>
        <li>Warranties regarding accuracy, reliability, or completeness of information</li>
        <li>Warranties that our Services will be uninterrupted or error-free</li>
        <li>Warranties regarding investment performance or returns</li>
      </ul>
      
      <h3>Investment Disclaimers</h3>
      <p>WE DO NOT GUARANTEE:</p>
      <ul>
        <li>Investment performance or specific returns</li>
        <li>Protection against market losses</li>
        <li>Accuracy of market predictions or forecasts</li>
        <li>Suitability of investments for your specific situation</li>
      </ul>
      
      <h3>Limitation of Liability</h3>
      <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRUSTFX SHALL NOT BE LIABLE FOR:</p>
      <ul>
        <li>INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES</li>
        <li>LOST PROFITS, REVENUE, OR BUSINESS OPPORTUNITIES</li>
        <li>INVESTMENT LOSSES OR MARKET VOLATILITY</li>
        <li>DAMAGES EXCEEDING THE FEES PAID TO US IN THE PRECEDING 12 MONTHS</li>
      </ul>
      
      <h3>Force Majeure</h3>
      <p>We are not liable for delays or failures due to:</p>
      <ul>
        <li>Natural disasters, wars, or terrorist attacks</li>
        <li>Government actions or regulatory changes</li>
        <li>Market closures or trading halts</li>
        <li>Internet outages or technical failures beyond our control</li>
      </ul>
      
      <h3>Indemnification</h3>
      <p>You agree to indemnify and hold us harmless from claims arising from:</p>
      <ul>
        <li>Your violation of these Terms or applicable laws</li>
        <li>Your investment decisions and activities</li>
        <li>Unauthorized use of your account</li>
        <li>Your breach of representations and warranties</li>
      </ul>
      
      <h3>State Law Variations</h3>
      <p>Some jurisdictions do not allow certain disclaimers or limitations, so the above may not apply to you. You may have additional rights under state or local laws.</p>
    `,
  },
  {
    id: "termination",
    title: "Termination and Account Closure",
    icon: Phone,
    content: `
      <h3>Termination by You</h3>
      <p>You may terminate your account at any time by:</p>
      <ul>
        <li>Submitting a written termination request</li>
        <li>Liquidating all investments and withdrawing funds</li>
        <li>Completing any required documentation</li>
        <li>Paying any outstanding fees or obligations</li>
      </ul>
      
      <h3>Termination by TrustFx</h3>
      <p>We may terminate your account immediately if:</p>
      <ul>
        <li>You violate these Terms or applicable laws</li>
        <li>You provide false or misleading information</li>
        <li>Your account remains inactive for extended periods</li>
        <li>We are required to do so by law or regulation</li>
      </ul>
      
      <h3>Account Closure Process</h3>
      <p>Upon termination:</p>
      <ul>
        <li>Your access to our Services will be suspended</li>
        <li>Investments will be liquidated according to your instructions</li>
        <li>Funds will be returned to your designated bank account</li>
        <li>Final statements and tax documents will be provided</li>
      </ul>
      
      <h3>Survival of Terms</h3>
      <p>The following provisions survive termination:</p>
      <ul>
        <li>Payment obligations and fee calculations</li>
        <li>Intellectual property rights and restrictions</li>
        <li>Disclaimers and limitation of liability</li>
        <li>Dispute resolution and governing law provisions</li>
      </ul>
      
      <h3>Data Retention</h3>
      <p>After account closure:</p>
      <ul>
        <li>We may retain records as required by law</li>
        <li>Personal information will be handled per our Privacy Policy</li>
        <li>You may request deletion of certain data types</li>
        <li>Some information may be anonymized for analytical purposes</li>
      </ul>
      
      <h3>Reinstatement</h3>
      <p>Terminated accounts may be reinstated at our discretion, subject to:</p>
      <ul>
        <li>Resolution of issues that led to termination</li>
        <li>Updated verification and documentation</li>
        <li>Compliance with current Terms and policies</li>
        <li>Payment of any applicable reinstatement fees</li>
      </ul>
    `,
  },
];

export default function TermsContent() {
  const [openSections, setOpenSections] = useState<string[]>(["acceptance"]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isOpen = openSections.includes(section.id);

            return (
              <Card
                key={section.id}
                className="border-2 border-gray-100 hover:border-gray-200 transition-colors"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-gradient-to-r from-slate-600 to-blue-600 text-white">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                          {section.title}
                        </h2>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isOpen
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 pt-6">
                        <div
                          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Important Notice */}
        <Card className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Important Legal Notice
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Investment Risk:</strong> All investments involve
                    risk, including potential loss of principal. Past
                    performance does not guarantee future results.
                  </p>
                  <p>
                    <strong>Regulatory Compliance:</strong> TrustFx is
                    registered with applicable financial authorities and
                    operates under strict regulatory oversight.
                  </p>
                  <p>
                    <strong>Professional Advice:</strong> These terms do not
                    constitute investment advice. Consider consulting with
                    qualified financial professionals before making investment
                    decisions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
