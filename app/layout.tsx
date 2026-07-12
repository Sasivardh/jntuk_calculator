import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'JNTUK CGPA Calculator | R20 & R23 Regulations',
  description: 'Free online JNTUK CGPA and SGPA Calculator for R20 and R23 Regulations. Automatically calculates SGPA, CGPA, percentage, and tracks calculation history.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 transition-colors duration-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

