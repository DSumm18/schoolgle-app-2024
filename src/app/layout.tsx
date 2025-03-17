import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SchoolProvider } from '@/contexts/SchoolContext';
import AuthProvider from '@/components/AuthProvider';
import EnhancedNavbar from '@/components/EnhancedNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Schoolgle - School Intranet Platform',
  description: 'A comprehensive intranet platform for schools and educational institutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <SchoolProvider>
              <div className="flex flex-col min-h-screen">
                <EnhancedNavbar />
                <main className="flex-grow">{children}</main>
                <footer className="py-6 px-4 lg:px-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} Schoolgle. All rights reserved.</p>
                    <p className="mt-1">
                      A comprehensive intranet platform for schools and educational institutions.
                    </p>
                  </div>
                </footer>
              </div>
            </SchoolProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}