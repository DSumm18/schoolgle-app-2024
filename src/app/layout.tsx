import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Schoolgle - School Management System",
  description: "A comprehensive school management system with modular architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          /* High Contrast Mode Styles */
          html.high-contrast {
            filter: contrast(1.4);
          }
          html.high-contrast body {
            background: white;
            color: black;
          }
          html.high-contrast .dark body {
            background: black;
            color: white;
          }
          html.high-contrast img {
            filter: contrast(1.2);
          }
        `}} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          enableSystem={true}
        >
          <main className="flex flex-col min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}