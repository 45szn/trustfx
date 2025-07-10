import {
  Shield,
  Eye,
  Lock,
  Users,
  Globe,
  FileText,
  AlertTriangle,
  Mail,
} from "lucide-react";

export const sections = [
  {
    id: "overview",
    title: "Privacy Policy Overview",
    icon: Eye,
    content: `
      <p>At TrustFx, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our investment platform and services.</p>
      
      <p>This policy applies to all users of TrustFx services, including our website, mobile applications, and any related services or features we may offer.</p>
      <br />
      <h3><strong>Key Principles:</strong></h3>
      <ul>
        <li>• <strong>Transparency:</strong> We clearly explain what information we collect and how we use it</li>
        <li>• <strong>Control:</strong> You have control over your personal information and privacy settings</li>
        <li>• <strong>Security:</strong> We implement robust security measures to protect your data</li>
        <li>• <strong>Compliance:</strong> We comply with applicable privacy laws and regulations</li>
      </ul>
    `,
  },
  {
    id: "collection",
    title: "Information We Collect",
    icon: FileText,
    content: `
      <h3>Personal Information</h3>
      <p>We collect information that you provide directly to us, including:</p>
      <br />
      <ul>
        <li>• <strong>Account Information:</strong> Name, email address, phone number, date of birth</li>
        <li>• <strong>Identity Verification:</strong> Government-issued ID, Social Security Number, address verification</li>
        <li>• <strong>Financial Information:</strong> Bank account details, investment preferences, financial goals</li>
        <li>• <strong>Communication Data:</strong> Messages, support tickets, feedback, and survey responses</li>
      </ul>
      <br />
      <h3><strong>Automatically Collected Information:</strong></h3>
      <ul>
        <li>• <strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
        <li>• <strong>Usage Data:</strong> Pages visited, features used, time spent on platform, click patterns</li>
        <li>• <strong>Location Data:</strong> General geographic location based on IP address</li>
        <li>• <strong>Cookies and Tracking:</strong> Session data, preferences, authentication tokens</li>
      </ul>
      <br />
      <h3><strong>Third-Party Information</strong></h3>
      <p>We may receive information about you from:</p>
      <ul>
        <li>• Identity verification services</li>
        <li>• Credit reporting agencies</li>
        <li>• Financial institutions</li>
        <li>• Marketing partners (with your consent)</li>
      </ul>
    `,
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    icon: Users,
    content: `
      <h3>Primary Uses:</h3>
      <ul>
        <li>• <strong>Account Management:</strong> Creating and maintaining your investment account</li>
        <li>• <strong>Identity Verification:</strong> Complying with KYC (Know Your Customer) requirements</li>
        <li>• <strong>Investment Services:</strong> Processing transactions, managing portfolios, providing recommendations</li>
        <li>• <strong>Customer Support:</strong> Responding to inquiries, resolving issues, providing assistance</li>
      </ul>
      <br />
      <h3><strong>Legal and Compliance:</strong></h3>
      <ul>
        <li>• Complying with financial regulations and reporting requirements</li>
        <li>• Preventing fraud, money laundering, and other illegal activities</li>
        <li>• Conducting risk assessments and due diligence</li>
        <li>• Maintaining records as required by law</li>
      </ul>
      <br />
      <h3><strong>Platform Improvement:</strong></h3>
      <ul>
        <li>• Analyzing usage patterns to improve our services</li>
        <li>• Developing new features and investment products</li>
        <li>• Personalizing your experience and recommendations</li>
        <li>• Conducting research and analytics</li>
      </ul>
      <br />
      <h3><strong>Communication:</strong></h3>
      <ul>
        <li>• Sending account notifications and security alerts</li>
        <li>• Providing investment updates and market insights</li>
        <li>• Marketing communications (with your consent)</li>
        <li>• Educational content and platform updates</li>
      </ul>
    `,
  },
  {
    id: "sharing",
    title: "Information Sharing and Disclosure",
    icon: Globe,
    content: `
      <h3>We Do Not Sell Your Personal Information</h3>
      <p>TrustFx does not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
      <br />
      <h3>When We Share Information</h3>
      <ul>
        <li>• <strong>Service Providers:</strong> Third-party companies that help us operate our platform (payment processors, identity verification, cloud hosting)</li>
        <li>• <strong>Financial Partners:</strong> Banks, brokers, and other financial institutions necessary for investment services</li>
        <li>• <strong>Legal Requirements:</strong> When required by law, court order, or regulatory request</li>
        <li>• <strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
        <li>• <strong>Consent:</strong> When you explicitly consent to sharing with specific third parties</li>
      </ul>
      <br />
      <h3><strong>Data Processing Agreements</strong></h3>
      <p>All third-party service providers are bound by strict data processing agreements that:</p>
      <ul>
        <li>• Limit the use of your information to specified purposes</li>
        <li>• Require appropriate security measures</li>
        <li>• Prohibit unauthorized disclosure</li>
        <li>• Ensure compliance with applicable privacy laws</li>
      </ul>
    `,
  },
  {
    id: "security",
    title: "Data Security and Protection",
    icon: Shield,
    content: `
      <h3>Security Measures</h3>
      <ul>
        <li>• <strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
        <li>• <strong>Access Controls:</strong> Strict access controls and authentication requirements for all systems</li>
        <li>• <strong>Network Security:</strong> Firewalls, intrusion detection, and continuous monitoring</li>
        <li>• <strong>Regular Audits:</strong> Third-party security assessments and penetration testing</li>
      </ul>
      <br />
      <h3><strong>Data Storage:</strong></h3>
      <ul>
        <li>• Data is stored in secure, SOC 2 compliant data centers</li>
        <li>• Regular backups with encrypted storage</li>
        <li>• Geographic redundancy for disaster recovery</li>
        <li>• Secure data destruction when no longer needed</li>
      </ul>
      <br />
      <h3><strong>Employee Access:</strong></h3>
      <ul>
        <li>• Background checks for all employees with data access</li>
        <li>• Regular security training and awareness programs</li>
        <li>• Principle of least privilege access</li>
        <li>• Monitoring and logging of all data access</li>
      </ul>
      <br />
      <h3><strong>Incident Response:</strong></h3>
      <p>In the event of a security incident, we will:</p>
      <ul>
        <li>• Immediately investigate and contain the incident</li>
        <li>• Notify affected users within 72 hours</li>
        <li>• Report to relevant authorities as required</li>
        <li>• Implement additional safeguards to prevent recurrence</li>
      </ul>
    `,
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
    icon: Lock,
    content: `
      <h3><strong>Access and Control</strong></h3>
      <p>You have the following rights regarding your personal information:</p>
      <ul>
        <li>• <strong>Access:</strong> Request a copy of the personal information we hold about you</li>
        <li>• <strong>Correction:</strong> Update or correct inaccurate personal information</li>
        <li>• <strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
        <li>• <strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
        <li>• <strong>Restriction:</strong> Limit how we process your personal information</li>
        <li>• <strong>Objection:</strong> Object to certain types of processing</li>
      </ul>
      <br />
      <h3><strong>Marketing Communications:</strong></h3>
      <ul>
        <li>• Opt out of marketing emails at any time</li>
        <li>• Customize communication preferences in your account settings</li>
        <li>• Unsubscribe links in all marketing communications</li>
        <li>• Contact us directly to update preferences</li>
      </ul>
      <br />
      <h3><strong>Account Closure:</strong></h3>
      <p>If you close your account:</p>
      <ul>
        <li>• We will delete or anonymize your personal information where legally permissible</li>
        <li>• Some information may be retained for legal, regulatory, or legitimate business purposes</li>
        <li>• Financial records may be retained as required by law</li>
        <li>• You can request specific deletion of certain data types</li>
      </ul>
      <br />
      <h3>Exercising Your Rights</h3>
      <p>To exercise any of these rights, contact us at <a href="mailto:privacy@trustfx.com" class="text-blue-600 hover:text-blue-700">privacy@trustfx.com</a> or through your account settings. We will respond within 30 days of receiving your request.</p>
    `,
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    icon: AlertTriangle,
    content: `
      <h3>Types of Cookies We Use</h3>
      <ul>
        <li>• <strong>Essential Cookies:</strong> Required for basic platform functionality and security</li>
        <li>• <strong>Performance Cookies:</strong> Help us understand how users interact with our platform</li>
        <li>• <strong>Functional Cookies:</strong> Remember your preferences and settings</li>
        <li>• <strong>Marketing Cookies:</strong> Used for targeted advertising (with your consent)</li>
      </ul>
      <br />
      <h3><strong>Third-Party Tracking</strong></h3>
      <p>We may use third-party services for:</p>
      <ul>
        <li>• Google Analytics for website analytics</li>
        <li>• Marketing platforms for advertising campaigns</li>
        <li>• Customer support tools for chat functionality</li>
        <li>• Security services for fraud prevention</li>
      </ul>
      <br />
      <h3><strong>Managing Cookies</strong></h3>
      <ul>
        <li>• Adjust cookie preferences in your browser settings</li>
        <li>• Use our cookie consent manager when available</li>
        <li>• Opt out of third-party tracking through industry tools</li>
        <li>• Note that disabling cookies may affect platform functionality</li>
      </ul>
      <br />
      <h3>Do Not Track</h3>
      <p>We respect Do Not Track signals and will not track users who have enabled this setting in their browsers.</p>
    `,
  },
  {
    id: "international",
    title: "International Data Transfers",
    icon: Globe,
    content: `
      <h3>Global Operations</h3>
      <p>TrustFx operates globally and may transfer your personal information to countries other than your country of residence. These transfers are made in accordance with applicable privacy laws.</p>
      <br />
      <h3>Safeguards for International Transfers</h3>
      <ul>
        <li>• <strong>Adequacy Decisions:</strong> Transfers to countries with adequate privacy protections</li>
        <li>• <strong>Standard Contractual Clauses:</strong> EU-approved contracts for data protection</li>
        <li>• <strong>Binding Corporate Rules:</strong> Internal policies ensuring consistent protection</li>
        <li>• <strong>Certification Programs:</strong> Participation in recognized privacy frameworks</li>
      </ul>
      <br />
      <h3>Regional Compliance</h3>
      <ul>
        <li>• <strong>GDPR (EU):</strong> Full compliance with European data protection regulations</li>
        <li>• <strong>CCPA (California):</strong> Compliance with California Consumer Privacy Act</li>
        <li>• <strong>PIPEDA (Canada):</strong> Adherence to Canadian privacy legislation</li>
        <li>• <strong>Local Laws:</strong> Compliance with applicable local privacy requirements</li>
      </ul>
    `,
  },
  {
    id: "updates",
    title: "Policy Updates and Contact Information",
    icon: Mail,
    content: `
      <h3><strong>Policy Changes</strong></h3>
      <p>We may update this Privacy Policy from time to time to reflect:</p>
      <ul>
        <li>• Changes in our services or business practices</li>
        <li>• Updates to applicable laws and regulations</li>
        <li>• Improvements to our privacy and security measures</li>
        <li>• User feedback and industry best practices</li>
      </ul>
      <br />
      <h3><strong>Notification of Changes</strong></h3>
      <p>When we make material changes to this policy, we will:</p>
      <ul>
        <li>• Post the updated policy on our website</li>
        <li>• Send email notifications to registered users</li>
        <li>• Provide in-app notifications for significant changes</li>
        <li>• Allow time for review before changes take effect</li>
      </ul>
      <br />
      <h3><strong>Contact Information</strong></h3>
      <p>For questions about this Privacy Policy or our privacy practices, contact us:</p>
      <ul>
        <li>• <strong>Email:</strong> <a href="mailto:privacy@trustfx.com" class="text-blue-600 hover:text-blue-700">privacy@trustfx.com</a></li>
        <li>• <strong>Mail:</strong> TrustFx Privacy Office, 123 Financial District, New York, NY 10001</li>
        <li>• <strong>Phone:</strong> +1 (555) 123-PRIVACY</li>
        <li>• <strong>Online:</strong> Submit a privacy request through your account settings</li>
      </ul>
      <br />
      <h3>Data Protection Officer</h3>
      <p>Our Data Protection Officer can be reached at <a href="mailto:dpo@trustfx.com" class="text-blue-600 hover:text-blue-700">dpo@trustfx.com</a> for specific privacy concerns or regulatory inquiries.</p>
    `,
  },
];
