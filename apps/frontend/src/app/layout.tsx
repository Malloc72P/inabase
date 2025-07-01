import { GlobalLoadingContainer } from '@libs/stores/loading-overlay-provider';
import { PageProgressBar } from 'src/components/navigation-progress-bar';
import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from '@libs/stores/session-provider';
import { fetcher } from '@libs/fetcher';
import { PageLinkMap, ApiLinkMap } from '@libs/link-map';
import { CommonConstants, ProfileResult } from '@repo/dto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SessionProps } from '@libs/stores/session-store';
import { getServerSession } from './get-server-session';
import { ReactQueryProvider } from '@libs/query-client';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <GlobalLoadingContainer>
            <ReactQueryProvider>
              <SessionProvider {...session}>{children}</SessionProvider>
            </ReactQueryProvider>
          </GlobalLoadingContainer>
          <Notifications />
          <PageProgressBar />
        </MantineProvider>
      </body>
    </html>
  );
}
