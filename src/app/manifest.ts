import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hanaa Sadoqi',
    short_name: 'Hanaa Sadoqi',
    description:
      'Portfolio and digital garden for Hanaa Sadoqi, a software engineer focused on workflow-heavy products and operational systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#09090b',
    icons: [
      {
        src: '/icon.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}