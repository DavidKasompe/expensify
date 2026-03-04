import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expensify – The Easiest Way to Do Your Expenses",
  description:
    "Expensify is an all-in-one expense management platform. AI-powered expenses, travel, reimbursements, and corporate cards. 4,200+ 5-star reviews on G2.",
  keywords:
    "expense management, receipt scanning, corporate cards, expense reports, travel management, Expensify",
  openGraph: {
    title: "Expensify – The Easiest Way to Do Your Expenses",
    description:
      "Join 15 million+ members who trust Expensify for expense management, travel, and corporate cards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
