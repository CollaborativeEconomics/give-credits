import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Providers from '@/components/providers';
import { ConfigProvider } from '@/components/config'
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/ErrorComponent";
import '@/styles/globals.css';
import TestComponent from '@/components/testComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Give Credit',
  description: 'Watch your donations make an impact',
};

export default function RootLayout({children}: {children: React.ReactNode}){
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ inter.className + ' bg-gradient-to-b from-white min-h-screen to-gray-50 dark:from-accent dark:to-secondary' }>
        <ConfigProvider>
          <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <Header />
            <TestComponent />
            {children}
            <Footer />
            <Toaster />
            </ErrorBoundary>
          </Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}
