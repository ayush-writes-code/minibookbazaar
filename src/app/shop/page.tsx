import { Suspense } from 'react';
import { getInventory } from '@/lib/inventory';
import CatalogClient from '@/components/CatalogClient';
import '@/app/globals.css';

export const metadata = {
  title: 'Shop - Mini Book Bazaar',
  description: 'Browse our collection of hand-picked new and pre-loved books.',
};

export default async function ShopPage() {
  const books = await getInventory();

  return (
    <div className="page-wrapper">
      <Suspense fallback={<div className="container section">Loading catalog...</div>}>
        <CatalogClient books={books} />
      </Suspense>
    </div>
  );
}
