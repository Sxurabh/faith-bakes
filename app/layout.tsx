import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Faith Bakes | Handcrafted Cupcakes, Cakes & More',
  description: 'Discover our delicious handcrafted cupcakes, custom cakes, cookies, and brownies. Order your perfect treat today!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="paper-grain min-h-screen bg-cream text-chocolate antialiased">
        {children}
      </body>
    </html>
  );
}
