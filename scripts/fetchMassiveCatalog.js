const fs = require('fs');

const categories = [
  { subject: 'fiction', display: 'Fiction' },
  { subject: 'history', display: 'History' },
  { subject: 'science', display: 'Science' },
  { subject: 'juvenile_fiction', display: 'Children' },
  { subject: 'self-help', display: 'Self-Help' },
  { subject: 'business', display: 'Business' }
];

async function generate() {
  console.log("Fetching massive catalog from Open Library using native fetch...");
  const results = [];
  let idCounter = 1;

  for (const cat of categories) {
    console.log(`Fetching ${cat.display}...`);
    try {
      const url = `https://openlibrary.org/subjects/${cat.subject}.json?limit=40`;
      // Adding a timeout signal
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        console.error(`Failed to fetch ${cat.display}: ${res.statusText}`);
        continue;
      }
      
      const data = await res.json();
      
      if (data.works) {
        for (const work of data.works) {
          if (!work.cover_id || !work.authors || work.authors.length === 0) continue;

          const title = work.title;
          const author = work.authors[0].name;
          const imageUrl = `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`;
          
          const price = Math.floor(Math.random() * (600 - 150 + 1) + 150);
          
          let originalPrice;
          if (Math.random() < 0.3) {
             originalPrice = Math.floor(price * (1.2 + Math.random() * 0.5)); 
          }

          const conditions = ['New', 'Pre-loved - Excellent', 'Pre-loved - Good'];
          const condition = conditions[Math.floor(Math.random() * conditions.length)];
          const stock = Math.floor(Math.random() * 16);
          const featured = Math.random() < 0.1;
          const publishedYear = work.first_publish_year ? work.first_publish_year.toString() : "Unknown";
          const pages = Math.floor(Math.random() * 400) + 100;
          const publisher = "Vintage Books"; 
          
          const description = `A captivating read about ${title.toLowerCase()}. ` +
                              `This edition is brought to you by ${publisher}. ` +
                              `Whether you're a long-time fan of ${author} or discovering their work for the first time, ` +
                              `this book is a must-have for your collection.`;

          results.push({
            id: idCounter.toString(),
            title,
            author,
            price,
            originalPrice,
            category: cat.display,
            condition,
            stock,
            imageUrl,
            description,
            featured,
            publishedYear,
            publisher,
            pages
          });
          
          idCounter++;
        }
      }
    } catch (e) {
      console.error(`Error fetching ${cat.display}:`, e);
    }
  }

  const header = "ID,Title,Author,Price,OriginalPrice,Category,Condition,Stock,Image URL,Description,Featured,PublishedYear,Publisher,Pages\n";
  const csvRows = results.map(r => {
    return `${r.id},"${r.title.replace(/"/g, '""')}","${r.author}",${r.price},${r.originalPrice || ''},"${r.category}","${r.condition}",${r.stock},"${r.imageUrl}","${r.description.replace(/"/g, '""')}",${r.featured ? 'Yes' : 'No'},"${r.publishedYear}","${r.publisher}",${r.pages}`;
  }).join('\n');
  
  fs.writeFileSync('preview_catalog.csv', header + csvRows);
  console.log(`Created preview_catalog.csv with ${results.length} items`);

  const mockString = `export const mockInventory: Book[] = ${JSON.stringify(results, null, 2)};`;
  fs.writeFileSync('generated_massive.js', mockString);
  console.log("Created generated_massive.js");
}

generate();
