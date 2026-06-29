# Project Structure

Detailed overview of the repository layout:

```
├── public/                  # Static assets
│   ├── images/
│   │   ├── gallery/         # Artwork images
│   │   └── testimonials/    # Ghibli-style avatars
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # Next.js API Routes
│   │   │   └── contact/
│   │   │       └── route.ts # Apps Script proxy
│   │   ├── globals.css      # Styling & theme variables
│   │   ├── layout.tsx       # Core layout & wrappers
│   │   └── page.tsx         # Main entry page
│   ├── components/          # React components
│   │   ├── Navbar.tsx       # Header navigation
│   │   ├── Hero.tsx         # Landing section
│   │   ├── Gallery.tsx      # Portfolio grid
│   │   ├── Testimonials.tsx # Review carousel
│   │   └── Contact.tsx      # Contact form
│   ├── context/             # React context (Theme)
│   └── data/                # JSON data stores
```
