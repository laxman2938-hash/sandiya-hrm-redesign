import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandiya HR Management - Ethical Recruitment Services in Nepal",
  description: "Sandiya Human Resources offers zero-cost recruitment services connecting talented professionals with global job opportunities. Ethical HR practices, fair employment.",
  keywords: "recruitment, HR services, Nepal jobs, ethical recruitment, zero-cost recruitment, employment agency, international jobs, team hiring",
  authors: [{ name: "Sandiya HR" }],
  creator: "Sandiya Human Resources Pvt. Ltd.",
  publisher: "Sandiya HR",
  icons: {
    icon: '/sandhaya.ico',
  },
  metadataBase: new URL('https://sandiyahrm.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sandiyahrm.com',
    siteName: 'Sandiya HR Management',
    title: 'Sandiya HR Management - Ethical Recruitment Services',
    description: 'Connect with global job opportunities through ethical recruitment. Zero-cost services for professionals.',
    images: [
      {
        url: 'https://sandiyahrm.com/sandhaya.png',
        width: 1200,
        height: 630,
        alt: 'Sandiya HR - Ethical Recruitment',
        type: 'image/png',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandiya HR Management - Ethical Recruitment',
    description: 'Zero-cost recruitment connecting professionals with global opportunities',
    images: ['https://sandiyahrm.com/sandhaya.png'],
    creator: '@sandiyahrm',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://sandiyahrm.com',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Sandiya Human Resources Pvt. Ltd.',
              image: 'https://sandiyahrm.com/sandhaya.png',
              description: 'Ethical recruitment agency offering zero-cost services',
              url: 'https://sandiyahrm.com',
              telephone: '+977-14374161',
              email: 'info@sandiyahr.com.np',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Dhumbarahi',
                addressLocality: 'Kathmandu',
                postalCode: '44600',
                addressCountry: 'NP'
              },
              sameAs: [
                'https://www.facebook.com/p/Sandiya-Human-Resources-Pvt-Ltd-100064059644304/',
                'https://www.instagram.com/sandiyahrm',
                'https://www.linkedin.com/company/sandiya-hr'
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '150'
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sandiya Human Resources',
              url: 'https://sandiyahrm.com',
              logo: 'https://sandiyahrm.com/sandhaya.png',
              description: 'Zero-cost ethical recruitment services connecting professionals with global opportunities',
              sameAs: [
                'https://www.facebook.com/p/Sandiya-Human-Resources-Pvt-Ltd-100064059644304/',
                'https://www.instagram.com/sandiyahrm',
                'https://www.linkedin.com/company/sandiya-hr'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                telephone: '+977-14374161',
                email: 'info@sandiyahr.com.np',
                areaServed: ['NP', 'US', 'UK', 'AUS', 'NZ']
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-b from-white via-blue-50 to-white`}
      >
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
