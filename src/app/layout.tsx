import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { PageShell } from '@/components/layout';

const siteUrl = 'https://hanaasadoqi.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hanaa Sadoqi',
    template: '%s | Hanaa Sadoqi',
  },
  description:
    'Full-stack engineer focused on complex problem-solving, workflow-heavy features, internal tools, and reliable software for real-world systems.',
  applicationName: 'hanaasadoqi.dev',
  authors: [{ name: 'Hanaa Sadoqi', url: siteUrl }],
  creator: 'Hanaa Sadoqi',
  publisher: 'Hanaa Sadoqi',
  keywords: [
    'Hanaa Sadoqi',
    'software engineer',
    'product engineer',
    'full-stack engineer',
    'frontend engineer',
    'project engineer',
    'workflow systems',
    'internal tools',
    'RBAC',
    'permissions',
    'auditability',
    'operational software',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Hanaa Sadoqi',
    title: 'Hanaa Sadoqi',
    description:
      'Full-stack engineer focused on complex problem-solving, workflow-heavy features, internal tools, and reliable software for real-world systems.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Hanaa Sadoqi portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hanaa Sadoqi',
    description:
      'Full-stack engineer focused on complex problem-solving, workflow-heavy features, internal tools, and reliable software for real-world systems.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
