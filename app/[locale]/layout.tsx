import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "@/components/layout/page-transition";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from "next/script";
import { CurrencyProvider } from "@/context/currency-context";


const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const baseUrl = "https://www.twjlabs.com"; // 👈 REPLACE with your actual domain

export const metadata: Metadata = {
  // 1. BASE URL: Critical for SEO. It resolves all relative URLs (images, og, etc.)
  metadataBase: new URL(baseUrl),

  // 2. TITLE: Uses a template for inner pages, optimizing for brand + keywords
  title: {
    default: "Best Web Development Agency in India | TWJ Labs",
    template: "%s | TWJ Labs",
  },

  // 3. DESCRIPTION: 155-160 characters, keyword-rich but readable
  description:
    "TWJ Labs is a premier web development agency specializing in Next.js, AI Integration, and Custom SaaS. We build high-performance digital solutions for global brands.",

  // 4. KEYWORDS: Mix of short-tail (broad) and long-tail (specific) keywords
  keywords: [
    // Core Services
    "Web Development Agency",
    "Custom Software Development",
    "Next.js Development Company",
    "React.js Specialists",
    "SaaS Application Development",
    "AI Integration Services",
    
    // Niche/Specifics
    "E-commerce Solutions (Shopify & Custom)",
    "Headless CMS (Sanity, Strapi)",
    "UI/UX Design Studio",
    "SEO Optimized Web Design",
    
    // Location Based (Crucial for Local SEO)
    "Web Development Agency in India",
    "Best Web Developers in Ghaziabad",
    "Software Agency Delhi NCR",
    "The Walking Jumbo",
    "TWJ Labs",
    "The Walking Jumbo",
  ],

  // 5. AUTHORS & OWNERSHIP: Builds E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
  authors: [{ name: "Harsh Goel", url: "https://www.linkedin.com/in/harshgoel-cs" }],
  creator: "Harsh Goel",
  publisher: "The Walking Jumbo",
  applicationName: "The Walking Jumbo",

  // 6. ROBOTS: Explicitly tell Google to index everything and follow links
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 7. ALTERNATES: The Canonical Tag (The #1 fix for duplicate content issues)
  alternates: {
    languages: {
      "en-US": "/en-US",
    },
  },

  // 8. OPEN GRAPH: For Facebook, LinkedIn, Discord, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "The Walking Jumbo",
    title: "The Walking Jumbo | Building the Future of Web",
    description: "We build pixel-perfect, lightning-fast web applications using Next.js and AI.",
    images: [
      {
        url: "/opengraph-image.png", // Ensure this image exists in your public folder (1200x630px)
        width: 1200,
        height: 630,
        alt: "The Walking Jumbo - Web Development Agency",
      },
    ],
  },

  // 9. TWITTER: For Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "The Walking Jumbo | Web Development Agency",
    description: "Expert web development services. Next.js, AI, and Custom Solutions.",
    images: ["/opengraph-image.png"], // Ensure this exists (1200x600px)
    creator: "@thewalkingjumbo", // Replace with your actual handle
    site: "@thewalkingjumbo",
  },


  // 11. CATEGORY: Helps with semantic understanding
  category: "technology",
  
  // 12. APP & FORMATTING: For mobile devices
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// 13. VIEWPORT: (Note: In Next.js 14+, Viewport is a separate export)
export const viewport = {
  themeColor: "#0c0c12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head />
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </NextIntlClientProvider>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5202236007367090"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
