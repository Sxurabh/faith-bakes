import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Faith Bakes | Handcrafted Cupcakes, Cakes, Cookies & Brownies',
  description: 'Handcrafted cupcakes, cakes, cookies & brownies made with love. Custom designs for birthdays, weddings, and special occasions.',
  keywords: ['cupcakes', 'cakes', 'cookies', 'brownies', 'baking', 'custom cakes', 'birthday cakes'],
  openGraph: {
    title: 'Faith Bakes | Handcrafted Treats',
    description: 'Handcrafted cupcakes, cakes, cookies & brownies made with love',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="paper-grain min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
