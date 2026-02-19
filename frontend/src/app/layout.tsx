import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { ReturneeProvider } from '@/contexts/ReturneeContext';

export const metadata: Metadata = {
  title: 'Survivordle - Guess the Survivor Returnee!',
  description:
    'A Wordle-style guessing game for Survivor fans! Can you guess the mystery Survivor returnee from Season 50?',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-survivant overflow-x-hidden">
        <ReturneeProvider>
          <NavBar />
          {children}
          <Footer />
        </ReturneeProvider>
      </body>
    </html>
  );
}
