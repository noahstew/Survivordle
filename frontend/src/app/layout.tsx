import './globals.css';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { ReturneeProvider } from '@/contexts/ReturneeContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-survivant">
        <ReturneeProvider>
          <NavBar />
          {children}
          <Footer />
        </ReturneeProvider>
      </body>
    </html>
  );
}
