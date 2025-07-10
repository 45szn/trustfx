// file: components/help/faqData.ts

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  popular: boolean;
}

export const categories = ["All", "Withdrawals", "Deposits", "Account"];

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "How much can I withdraw?",
    answer:
      "You can withdraw the full amount of your account balance minus the funds that are used currently for supporting opened positions. The available withdrawal amount is always displayed in your dashboard, ensuring you have complete transparency over your accessible funds.",
    category: "Withdrawals",
    popular: true,
  },
  {
    id: 2,
    question: "How will I know that the withdrawal has been successful?",
    answer:
      "You will get an automatic notification once we send the funds and you can always check your transactions or account balance. Your chosen payment system dictates how long it will take for the funds to reach you. We provide real-time updates throughout the entire withdrawal process.",
    category: "Withdrawals",
    popular: true,
  },
  {
    id: 3,
    question: "I forgot my password, what should I do?",
    answer:
      "Visit the password reset page, type in your email address and click the 'Reset' button. You'll receive a secure link to create a new password. For additional security, we recommend using a strong password with a combination of letters, numbers, and special characters.",
    category: "Account",
    popular: false,
  },
  {
    id: 4,
    question: "How do I check my account balance?",
    answer:
      "You can see your account balance anytime on your accounts dashboard. The dashboard provides real-time updates of your balance, including available funds, invested amounts, and pending transactions. You can also set up balance alerts for important thresholds.",
    category: "Account",
    popular: true,
  },
  {
    id: 5,
    question: "When can I deposit/withdraw from my Investment account?",
    answer:
      "Deposit and withdrawal are available at any time, 24/7. However, be sure that your funds are not used in any ongoing trade before attempting withdrawal. The available amount for withdrawal is shown in your dashboard on the main page of the Investing platform, updated in real-time.",
    category: "Deposits",
    popular: true,
  },
];
