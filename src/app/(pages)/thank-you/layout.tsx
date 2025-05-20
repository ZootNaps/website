import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | South Lamar Studios",
  description: "Thank you for contacting us. We've received your message and will get back to you shortly.",
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 