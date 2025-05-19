import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | South Lamar Studios",
  description: "Get in touch with our team. We're here to answer your questions and help solve your business challenges.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 