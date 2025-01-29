import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { createTheme, ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './globals.css';
import { PageProgressBar } from '@components/navigation-progress-bar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Inabase',
  description: 'Simple AppServer',
};

const theme = createTheme({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {children}
          <Notifications />
          <PageProgressBar />
        </MantineProvider>
      </body>
    </html>
  );
}
