export interface ExtraBookDetails {
  averageRating?: number;
  ratingsCount?: number;
  snippet?: string;
  pageCount?: number;
  publisher?: string;
  publishedDate?: string;
  language?: string;
  isbn?: string;
}

export async function fetchExtraBookDetails(title: string, author: string): Promise<ExtraBookDetails> {
  try {
    const query = `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;
    
    const response = await fetch(url, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return {};
    }

    const volumeInfo = data.items[0].volumeInfo;
    const searchInfo = data.items[0].searchInfo;

    // Find ISBN-13 or ISBN-10
    let isbn;
    if (volumeInfo.industryIdentifiers) {
      const isbn13 = volumeInfo.industryIdentifiers.find((id: any) => id.type === 'ISBN_13');
      const isbn10 = volumeInfo.industryIdentifiers.find((id: any) => id.type === 'ISBN_10');
      isbn = isbn13 ? isbn13.identifier : (isbn10 ? isbn10.identifier : undefined);
    }

    // Clean up snippet from HTML tags
    let snippet = searchInfo?.textSnippet || volumeInfo.description;
    if (snippet) {
      snippet = snippet.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>?/gm, '');
    }

    return {
      averageRating: volumeInfo.averageRating,
      ratingsCount: volumeInfo.ratingsCount,
      snippet: snippet,
      pageCount: volumeInfo.pageCount,
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      language: volumeInfo.language,
      isbn: isbn
    };
  } catch (error) {
    console.error('Error fetching book details from Google Books:', error);
    return {};
  }
}
