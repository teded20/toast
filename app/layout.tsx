import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { GlassChampagne } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Toast - Honeymoon Voting Registry',
  description: 'Vote for your favorite honeymoon destination',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="p-4 flex items-center justify-between bg-gradient-to-r from-amber-200 to-yellow-400">
            <div className="flex items-center space-x-2">
              <GlassChampagne className="h-8 w-8 text-amber-800" />
              <span className="text-2xl font-bold text-amber-800">Toast</span>
            </div>
          </header>
          <main>
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}