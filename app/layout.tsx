import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LiveChatWidget } from '@livechat/widget-react'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Qucik App',
  description: 'Quick arabic app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir='rtl'>
      <body >{children}
        <LiveChatWidget
          license="19233396"
          visibility="minimized"
        /></body>
    </html>
  );
}
