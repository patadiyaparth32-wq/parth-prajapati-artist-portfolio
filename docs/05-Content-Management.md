# Content Management

Adding, updating, and deleting content is done by editing JSON files in `src/data/`.

## 1. Gallery Artworks (`gallery.json`)
To add a new artwork:
1. Save the image in `public/images/gallery/`.
2. Add an entry to `src/data/gallery.json`:
   ```json
   {
     "id": "unique-id",
     "title": "Artwork Name",
     "category": "masterpiece | pencil | colour",
     "medium": "Medium Used",
     "dimensions": "Width" x Height"",
     "year": "2026",
     "image": "/images/gallery/filename.jpg",
     "tags": ["Tag1", "Tag2"]
   }
   ```

## 2. Testimonials (`testimonials.json`)
To update reviews:
1. Add the reviewer's avatar to `public/images/testimonials/` (WebP format recommended).
2. Add the review details to `src/data/testimonials.json`:
   ```json
   {
     "id": "test-unique",
     "name": "Person Name",
     "role": "Art Collector | Student",
     "avatar": "/images/testimonials/filename.webp",
     "text": "Review text here.",
     "category": "client | student"
   }
   ```
