const fs = require('fs');

const popularBooks = [
  // Fiction & Literature
  { title: "The Midnight Library", author: "Matt Haig", category: "Fiction", condition: "New" },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", category: "Fiction", condition: "New" },
  { title: "Lessons in Chemistry", author: "Bonnie Garmus", category: "Fiction", condition: "Pre-loved - Excellent" },
  { title: "It Ends With Us", author: "Colleen Hoover", category: "Fiction", condition: "Pre-loved - Good" },
  { title: "Verity", author: "Colleen Hoover", category: "Fiction", condition: "New" },
  { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", category: "Fiction", condition: "Pre-loved - Excellent" },
  { title: "Daisy Jones & The Six", author: "Taylor Jenkins Reid", category: "Fiction", condition: "New" },
  { title: "Normal People", author: "Sally Rooney", category: "Fiction", condition: "Pre-loved - Good" },
  { title: "The Song of Achilles", author: "Madeline Miller", category: "Fiction", condition: "New" },
  { title: "A Court of Thorns and Roses", author: "Sarah J. Maas", category: "Fiction", condition: "New" },

  // Sci-Fi / Fantasy
  { title: "Dune", author: "Frank Herbert", category: "Science", condition: "New" },
  { title: "Project Hail Mary", author: "Andy Weir", category: "Science", condition: "New" },
  { title: "The Martian", author: "Andy Weir", category: "Science", condition: "Pre-loved - Good" },
  { title: "Fourth Wing", author: "Rebecca Yarros", category: "Science", condition: "New" },
  { title: "The Three-Body Problem", author: "Cixin Liu", category: "Science", condition: "Pre-loved - Excellent" },

  // Self-Help / Business
  { title: "Atomic Habits", author: "James Clear", category: "Self-Help", condition: "New" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "Self-Help", condition: "Pre-loved - Good" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Business", condition: "New" },
  { title: "Outliers", author: "Malcolm Gladwell", category: "Business", condition: "Pre-loved - Excellent" },
  { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "History", condition: "New" },
  { title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", category: "Business", condition: "New" },
  { title: "Deep Work", author: "Cal Newport", category: "Business", condition: "Pre-loved - Excellent" },
  { title: "Dare to Lead", author: "Brené Brown", category: "Self-Help", condition: "New" },

  // History / Non-fiction
  { title: "Born a Crime", author: "Trevor Noah", category: "History", condition: "New" },
  { title: "Educated", author: "Tara Westover", category: "History", condition: "Pre-loved - Excellent" },
  { title: "The Glass Castle", author: "Jeannette Walls", category: "History", condition: "Pre-loved - Good" },
  { title: "Killers of the Flower Moon", author: "David Grann", category: "History", condition: "New" },

  // Children / YA
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Children", condition: "New" },
  { title: "Percy Jackson and the Olympians: The Lightning Thief", author: "Rick Riordan", category: "Children", condition: "Pre-loved - Excellent" },
  { title: "The Hunger Games", author: "Suzanne Collins", category: "Children", condition: "New" },
  { title: "Wonder", author: "R. J. Palacio", category: "Children", condition: "Pre-loved - Good" }
];

async function fetchBookDetails() {
  const books = [];
  let idCounter = 1;

  for (const book of popularBooks) {
    try {
      console.log(`Fetching details for: ${book.title}`);
      const query = encodeURIComponent(`${book.title} ${book.author}`);
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`);
      
      if (!res.ok) {
        console.error(`Failed to fetch ${book.title}`);
        continue;
      }

      const data = await res.json();
      const doc = data.docs[0];

      if (!doc) {
        console.warn(`No results for ${book.title}`);
        continue;
      }

      const coverId = doc.cover_i;
      const imageUrl = coverId 
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : `https://via.placeholder.com/400x600.png?text=${encodeURIComponent(book.title)}`;

      // Generate realistic price
      const isNew = book.condition === "New";
      const basePrice = isNew ? Math.floor(Math.random() * 300) + 399 : Math.floor(Math.random() * 200) + 150; // New: 399-699, Preloved: 150-350
      
      // 30% chance of being discounted/featured
      const isDiscounted = Math.random() > 0.7;
      let originalPrice = undefined;
      let price = basePrice;

      if (isDiscounted) {
        originalPrice = Math.floor(basePrice * 1.4); // 40% markup for original
      }

      const isFeatured = Math.random() > 0.8;

      books.push({
        id: idCounter.toString(),
        title: book.title,
        author: doc.author_name ? doc.author_name[0] : book.author,
        price: price,
        originalPrice: originalPrice,
        imageUrl: imageUrl,
        category: book.category,
        description: doc.first_sentence ? doc.first_sentence[0] : `A fantastic ${book.category.toLowerCase()} book that has captivated millions of readers worldwide. Dive into the incredible world created by ${book.author}.`,
        condition: book.condition,
        stock: Math.floor(Math.random() * 15) + 2,
        featured: isFeatured,
        isbn: doc.isbn ? doc.isbn[0] : undefined,
        publisher: doc.publisher ? doc.publisher[0] : undefined,
        publishedYear: doc.first_publish_year,
        pages: doc.number_of_pages_median
      });

      idCounter++;
      
      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (e) {
      console.error(`Error processing ${book.title}:`, e.message);
    }
  }

  // Generate JS file
  const fileContent = `// Auto-generated modern catalog
export const books = ${JSON.stringify(books, null, 2)};
`;

  fs.writeFileSync('src/lib/generated_modern.js', fileContent);
  console.log(`Generated src/lib/generated_modern.js with ${books.length} books.`);
}

fetchBookDetails();
