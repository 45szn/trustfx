import {
  Cookie,
  Settings,
  Globe,
  Eye,
  TrendingDown,
  Zap,
  AlertTriangle,
  Shield,
  Lock,
} from "lucide-react";

export const cookieSections = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    icon: Cookie,
    content: `
      <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.</p>
      <br />
      <p><strong>We use cookies to:</strong></p>
      <ul>
        <li>• Remember your preferences and settings</li>
        <li>• Analyze how you use our website</li>
        <li>• Provide personalized content and advertisements</li>
        <li>• Ensure security and prevent fraud</li>
        <li>• Improve our services and user experience</li>
      </ul>
    `,
  },
  {
    id: "types-of-cookies",
    title: "Types of Cookies We Use",
    icon: Settings,
    content: `
      <h3><strong>Essential Cookies</strong></h3>
      <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.</p>

      <br />
      <h3><strong>Performance Cookies</strong></h3>
      <p>These cookies collect information about how visitors use our website, such as which pages are visited most often. This data helps us improve our website performance.</p>

      <br />
      <h3><strong>Functional Cookies</strong></h3>
      <p>These cookies allow the website to remember choices you make and provide enhanced, more personal features.</p>

      <br />
      <h3><strong>Targeting/Advertising Cookies</strong></h3>
      <p>These cookies are used to deliver advertisements more relevant to you and your interests. They also limit the number of times you see an advertisement.</p>

      <br />
      <h3><strong>Analytics Cookies</strong></h3>
      <p>We use analytics cookies to understand how visitors interact with our website by collecting and reporting information anonymously.</p>
    `,
  },
  {
    id: "third-party-cookies",
    title: "Third-Party Cookies",
    icon: Globe,
    content: `
      <p>We may allow third-party companies to serve cookies on our website for analytics, advertising, and other purposes:</p>

      <br />
      <h3><strong>Google Analytics</strong></h3>
      <p>We use Google Analytics to analyze website traffic and user behavior. Google may use this data in accordance with their privacy policy.</p>

      <br />
      <h3><strong>Social Media Cookies</strong></h3>
      <p>Social media platforms may set cookies when you share content or interact with social media features on our site.</p>

      <br />
      <h3><strong>Advertising Partners</strong></h3>
      <p>Our advertising partners may use cookies to show you relevant advertisements on other websites.</p>

      <br />
      <h3><strong>Payment Processors</strong></h3>
      <p>Payment service providers may use cookies to facilitate secure transactions and prevent fraud.</p>
    `,
  },
  {
    id: "managing-cookies",
    title: "Managing Your Cookie Preferences",
    icon: Eye,
    content: `
      <p>You have several options for managing cookies:</p>

      <br />
      <h3><strong>Browser Settings</strong></h3>
      <p>Most web browsers allow you to control cookies through their settings preferences. You can:</p>
      <ul>
        <li>• Block all cookies</li>
        <li>• Block third-party cookies only</li>
        <li>• Delete cookies when you close your browser</li>
        <li>• Set up notifications when cookies are being sent</li>
      </ul>

      <br />
      <h3><strong>Cookie Consent Tool</strong></h3>
      <p>We provide a cookie consent tool that allows you to:</p>
      <ul>
        <li>• Accept or reject different types of cookies</li>
        <li>• Change your preferences at any time</li>
        <li>• View detailed information about each cookie category</li>
      </ul>

      <br />
      <h3><strong>Opt-Out Links</strong></h3>
      <p>For third-party cookies, you can often opt out directly through the provider's website or through industry opt-out tools.</p>

      <br />
      <p><strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and your user experience.</p>
    `,
  },
];

export const riskSections = [
  {
    id: "investment-risks",
    title: "Investment Risks",
    icon: TrendingDown,
    content: `
      <h3><strong>Market Risk</strong></h3>
      <p>The value of investments can go down as well as up, and you may get back less than you invested.</p>

      <br />
      <h3><strong>Volatility Risk</strong></h3>
      <p>Investment values may fluctuate significantly over short periods.</p>

      <br />
      <h3><strong>Liquidity Risk</strong></h3>
      <p>Some investments may be difficult to sell quickly at a fair price.</p>

      <br />
      <h3><strong>Currency Risk</strong></h3>
      <p>If you invest in assets denominated in foreign currencies, changes in exchange rates may affect the value.</p>

      <br />
      <h3><strong>Inflation Risk</strong></h3>
      <p>The purchasing power of your investment returns may be eroded over time.</p>

      <br />
      <h3><strong>Interest Rate Risk</strong></h3>
      <p>Changes in interest rates can affect fixed-income investments.</p>
    `,
  },
  {
    id: "platform-risks",
    title: "Platform and Technology Risks",
    icon: Zap,
    content: `
      <h3><strong>Technology Risk</strong></h3>
      <p>Our platform relies on systems that may experience outages or failures.</p>

      <br />
      <h3><strong>Cybersecurity Risk</strong></h3>
      <p>Cyber attacks or data breaches could affect your account.</p>

      <br />
      <h3><strong>Operational Risk</strong></h3>
      <p>Errors in systems or processes could affect transactions.</p>

      <br />
      <h3><strong>Third-Party Risk</strong></h3>
      <p>Issues with external vendors could impact service.</p>

      <br />
      <h3><strong>Regulatory Risk</strong></h3>
      <p>Changes in laws could affect our services.</p>
    `,
  },
  {
    id: "specific-disclaimers",
    title: "Specific Disclaimers",
    icon: AlertTriangle,
    content: `
      <h3><strong>No Investment Advice</strong></h3>
      <p>Information is for educational purposes only.</p>

      <br />
      <h3><strong>Past Performance</strong></h3>
      <p>Past results do not guarantee future outcomes.</p>

      <br />
      <h3><strong>No Guarantees</strong></h3>
      <p>We do not guarantee investment results.</p>

      <br />
      <h3><strong>Independent Decision Making</strong></h3>
      <p>You must evaluate investments based on your risk.</p>

      <br />
      <h3><strong>Professional Advice</strong></h3>
      <p>Consult financial/tax/legal experts before investing.</p>

      <br />
      <h3><strong>Suitability</strong></h3>
      <p>Not all investments are right for all investors.</p>
    `,
  },
  {
    id: "regulatory-disclaimers",
    title: "Regulatory Disclaimers",
    icon: Shield,
    content: `
      <h3><strong>Securities Regulation</strong></h3>
      <p>Our services may be subject to various laws.</p>

      <br />
      <h3><strong>SIPC Protection</strong></h3>
      <p>SIPC does not protect against investment losses.</p>

      <br />
      <h3><strong>Anti-Money Laundering</strong></h3>
      <p>We comply with AML regulations.</p>

      <br />
      <h3><strong>Tax Implications</strong></h3>
      <p>You are responsible for understanding tax obligations.</p>

      <br />
      <h3><strong>International Investors</strong></h3>
      <p>Additional restrictions may apply outside the U.S.</p>

      <br />
      <h3><strong>Regulatory Changes</strong></h3>
      <p>Rules may change and impact your investments.</p>
    `,
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    icon: Lock,
    content: `
      <h3><strong>Service Availability</strong></h3>
      <p>We aim for uptime but cannot guarantee it.</p>

      <br />
      <h3><strong>Information Accuracy</strong></h3>
      <p>Data may not always be complete or accurate.</p>

      <br />
      <h3><strong>Third-Party Content</strong></h3>
      <p>We are not liable for third-party data.</p>

      <br />
      <h3><strong>Investment Losses</strong></h3>
      <p>We are not responsible for financial losses.</p>

      <br />
      <h3><strong>Force Majeure</strong></h3>
      <p>We are not liable for uncontrollable events.</p>

      <br />
      <h3><strong>Maximum Liability</strong></h3>
      <p>Liability is limited to fees paid in the last 12 months.</p>
    `,
  },
];
