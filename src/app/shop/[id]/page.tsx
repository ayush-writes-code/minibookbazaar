import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getInventory } from '@/lib/inventory';
import ProductDetail from '@/components/ProductDetail';
import { fetchExtraBookDetails } from '@/lib/bookApi';
import Link from 'next/link';
import '@/app/globals.css';

export async function generateStaticParams() {
  const inventory = await getInventory();
  // Only pre-render the first 50 books at build time to avoid memory bloat
  // The rest will be generated on-demand (ISR)
  return inventory.slice(0, 50).map((book) => ({ id: book.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const inventory = await getInventory();
  const book = inventory.find(b => b.id === id);

  if (!book) {
    return { title: 'Book Not Found' };
  }

  return {
    title: `${book.title} by ${book.author} | Mini Book Bazaar`,
    description: book.description,
    openGraph: {
      title: `${book.title} - ₹${book.price}`,
      description: `Condition: ${book.condition}. ${book.description.substring(0, 100)}...`,
      images: [{ url: book.imageUrl }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inventory = await getInventory();
  const book = inventory.find(b => b.id === id);

  if (!book) {
    notFound();
  }

  const extraDetails = await fetchExtraBookDetails(book.title, book.author);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: book.author
    },
    image: book.imageUrl,
    description: book.description,
    isbn: extraDetails.isbn || book.isbn,
    numberOfPages: extraDetails.pageCount || book.pages,
    publisher: extraDetails.publisher || book.publisher,
    datePublished: extraDetails.publishedDate || book.publishedYear,
    aggregateRating: extraDetails.averageRating ? {
      '@type': 'AggregateRating',
      ratingValue: extraDetails.averageRating,
      reviewCount: extraDetails.ratingsCount
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: book.price,
      priceCurrency: 'INR',
      availability: book.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    }
  };

  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail book={book} allBooks={inventory} extraDetails={extraDetails} />
    </div>
  );
}
