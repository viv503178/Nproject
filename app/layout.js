import { Merriweather, Inter } from 'next/font/google';
import './globals.css';

// next/font self-hosts these at build time (no runtime call to Google's
// CDN), which keeps the Content-Security-Policy in next.config.js strict
// and avoids a third-party request on every page load.
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sanmitrabank.example';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sanmitra Co-operative Bank Ltd. | Loans, Deposits & Digital Banking',
    template: '%s | Sanmitra Co-operative Bank Ltd.',
  },
  description:
    'Sanmitra Co-operative Bank offers home loans, fixed deposits, savings accounts and digital banking with transparent interest rates and bank-approved housing projects.',
  keywords: [
    'co-operative bank',
    'home loan interest rate',
    'fixed deposit rates',
    'approved housing projects',
    'loan EMI calculator',
  ],
  authors: [{ name: 'Sanmitra Co-operative Bank Ltd.' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Sanmitra Co-operative Bank Ltd.',
    title: 'Sanmitra Co-operative Bank Ltd.',
    description:
      'Home loans, fixed deposits and digital banking from a cooperative bank trusted since 1965.',
    images: [{ url: '/images/carousel-1.svg', width: 1600, height: 600, alt: 'Sanmitra Co-operative Bank' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanmitra Co-operative Bank Ltd.',
    description: 'Home loans, fixed deposits and digital banking with transparent rates.',
  },
  icons: {
    icon: '/images/logo.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f2a4a',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BankOrCreditUnion',
  name: 'Sanmitra Co-operative Bank Ltd.',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.svg`,
  telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-22-1234-5678',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: ['https://facebook.com', 'https://twitter.com', 'https://instagram.com', 'https://linkedin.com'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable}`}>
      <body>
        {/* Skip link for keyboard / screen-reader users, satisfies basic a11y + SEO best practice */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Structured data is static, server-authored JSON — safe to inject directly.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
