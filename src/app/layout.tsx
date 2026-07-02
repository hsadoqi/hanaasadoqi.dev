import { PageShell } from '@/components/layout';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

const siteUrl = 'https://hanaasadoqi.dev';

const ibmPlexSans = localFont({
  src: [
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-sans/IBMPlexSans-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-plex-sans',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

const ibmPlexSerif = localFont({
  src: [
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-serif/IBMPlexSerif-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-plex-serif',
  fallback: ['ui-serif', 'Georgia', 'serif'],
});

const ibmPlexMono = localFont({
  src: [
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-ExtraLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-mono/IBMPlexMono-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-plex-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
});

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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <PageShell>{children}</PageShell>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
