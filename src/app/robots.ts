import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart'], // Prevent indexing the cart page
    },
    sitemap: 'https://minibookbazaar.com/sitemap.xml', // Replace with real URL when going live
  };
}
