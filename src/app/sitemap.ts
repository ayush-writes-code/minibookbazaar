import { MetadataRoute } from 'next';
import { getInventory } from '@/lib/inventory';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const inventory = await getInventory();
  
  const baseUrl = 'https://minibookbazaar.com'; // Replace with real URL when going live

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.5,
    },
  ];

  const bookRoutes = inventory.map((book) => ({
    url: `${baseUrl}/shop/${book.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...bookRoutes];
}
