import { PageShell } from '@/components/layout';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';

const siteUrl = 'https://hanaasadoqi.dev';

// const ibmPlexSans = localFont({
//   src: [
//     {
//       path: '../../fonts/IBMPlexSans-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexSans-Italic.ttf',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexSans-Medium.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexSans-MediumItalic.ttf',
//       weight: '500',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexSans-SemiBold.ttf',
//       weight: '600',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexSans-SemiBoldItalic.ttf',
//       weight: '600',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexSans-Bold.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexSans-BoldItalic.ttf',
//       weight: '700',
//       style: 'italic',
//     },
//   ],
//   variable: '--font-plex-sans',
//   display: 'swap',
// });

// const ibmPlexSerif = localFont({
//   src: [
//     {
//       path: '../../fonts/IBMPlexSerif-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexSerif-Italic.ttf',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexSerif-Medium.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexSerif-MediumItalic.ttf',
//       weight: '500',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexSerif-SemiBold.ttf',
//       weight: '600',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexSerif-SemiBoldItalic.ttf',
//       weight: '600',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexSerif-Bold.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexSerif-BoldItalic.ttf',
//       weight: '700',
//       style: 'italic',
//     },
//   ],
//   variable: '--font-plex-serif',
//   display: 'swap',
// });

// const ibmPlexMono = localFont({
//   src: [
//     {
//       path: '../../fonts/IBMPlexMono-Thin.ttf',
//       weight: '100',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-ThinItalic.ttf',
//       weight: '100',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-ExtraLight.ttf',
//       weight: '200',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-ExtraLightItalic.ttf',
//       weight: '200',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-Light.ttf',
//       weight: '300',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-LightItalic.ttf',
//       weight: '300',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-Medium.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-MediumItalic.ttf',
//       weight: '500',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-SemiBold.ttf',
//       weight: '600',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-SemiBoldItalic.ttf',
//       weight: '600',
//       style: 'italic',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-Bold.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../fonts/IBMPlexMono-BoldItalic.ttf',
//       weight: '700',
//       style: 'italic',
//     },
//   ],
//   variable: '--font-plex-mono',
//   display: 'swap',
// });

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-serif',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-mono',
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
