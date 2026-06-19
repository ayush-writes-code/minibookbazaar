const https = require('https');

const urls = [
  'https://www.instagram.com/reel/DZuDWS0hk0b/',
  'https://www.instagram.com/reel/DYJxi-9xczX/',
  'https://www.instagram.com/reel/DW5pf7pkT4m/'
];

async function fetchOgImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) {
          resolve(match[1].replace(/&amp;/g, '&'));
        } else {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const url of urls) {
    const img = await fetchOgImage(url);
    console.log(`${url} -> ${img}`);
  }
}

main();
