import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFB6C1',
};

export const metadata: Metadata = {
  title: 'Faith Bakes | Handcrafted Joy in Every Bite',
  description: 'Discover our delicious handcrafted cupcakes, custom cakes, cookies, and brownies. Made with love, delivered with joy!',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Faith Bakes',
  },
  icons: {
    icon: '/icons/icon-192.svg',
    apple: '/icons/icon-192.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Faith Bakes" />
      </head>
      <body className="paper-grain min-h-screen bg-cream text-chocolate antialiased overflow-x-hidden">
        <div className="custom-cursor hidden md:block" id="cursor" />
        <div id="particles-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
