import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Faith Bakes | Handcrafted Joy in Every Bite',
  description: 'Discover our delicious handcrafted cupcakes, custom cakes, cookies, and brownies. Made with love, delivered with joy!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="paper-grain min-h-screen bg-cream text-chocolate antialiased overflow-x-hidden">
        {/* Custom Cursor */}
        <div className="custom-cursor hidden md:block" id="cursor" />

        {/* Ambient Particles Container */}
        <div id="particles-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />

        {children}
      </body>
    </html>
  );
}