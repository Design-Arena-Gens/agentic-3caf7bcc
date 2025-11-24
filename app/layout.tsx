import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "المجلس الرقمي",
  description:
    "مساحة تفاعلية ترحب بك وتعرّفك على تحيات عربية دافئة مع لمسات حديثة."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
