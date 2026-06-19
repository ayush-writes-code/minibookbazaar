# Mini Book Bazaar

A premium bookstore website designed for local independent bookstores in India.

## Inventory Management (Google Sheets)

You can manage your entire store's inventory simply by editing a Google Sheet!

**How to set it up:**
1. Create a new Google Sheet.
2. Add the following column headers exactly in the first row:
   `ID`, `Title`, `Author`, `Price`, `Category`, `Condition`, `Stock`, `Image URL`, `Description`, `Featured`
3. Fill in your books (one per row).
   - **Condition** should be things like "New", "Pre-loved - Excellent", "Pre-loved - Good", etc.
   - **Featured** should be "Yes" or "No" (this determines if it shows on the homepage).
   - **Image URL** must be a direct link to the image (e.g., from an image hosting site or your own server).
4. Go to **File > Share > Publish to web**.
5. Select **Entire Document** and change "Web page" to **Comma-separated values (.csv)**.
6. Click **Publish** and copy the generated URL.
7. Open the `.env.local` file (create it if it doesn't exist in the project root) and add:
   `GOOGLE_SHEETS_CSV_URL=your_copied_url_here`
8. Restart your server.

If the URL is missing or incorrect, the site will automatically fall back to mock data so it doesn't break!

## Tech Stack
- Next.js (App Router)
- React
- Vanilla CSS
- Papaparse (for CSV fetching)

## Development
To run locally:
```bash
npm install
npm run dev
```
