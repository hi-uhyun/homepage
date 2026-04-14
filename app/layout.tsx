import type { ReactNode } from 'react';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-neutral-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
