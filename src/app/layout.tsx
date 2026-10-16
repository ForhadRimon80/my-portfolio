import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ToastProvider from "@/components/providers/ToastProvider";
import ViewTracker from "@/components/stats/ViewTracker";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "Farhad Rimon — Web Developer",
    template: "%s | Farhad Rimon",
  },
  description:
    "A personal corner of the web. Explore Farhad Rimon’s projects, notes, and experiments with React, Next.js, and TypeScript.",
  openGraph: {
    title: "Farhad Rimon — Web Developer",
    description: "Thoughtful interfaces. Useful little details.",
    type: "website",
  },
  twitter: { card: "summary" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{document.documentElement.dataset.theme=localStorage.getItem("portfolio-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch{}',
          }}
        />
      </head>
      <body>
        <ToastProvider />
        <ViewTracker />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <div className="outer">
          <main id="main" className="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
