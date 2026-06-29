# Parth Prajapati – Premium Drawing Artist Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-FF00C1?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A premium, responsive, and highly interactive portfolio website developed for **Parth Prajapati**, a professional drawing artist and educator. Designed and developed by **GM Web Studio**.

---

## 🎨 Project Overview

This website serves as a luxury digital gallery and business hub for the artist. It showcases masterpieces, pencil sketches, and color drawings while offering services like custom artwork commissions and professional drawing mentorship.

### Key Features
- **Cinematic Visuals:** Parallax effects, smooth animations, and interactive framed presentations.
- **Flexible Gallery:** Dynamic filters (`MASTERPIECES`, `PENCIL`, `COLOUR`, `EXHIBITIONS`) with an integrated lightbox.
- **Dual-Category Reviews:** A custom testimonial carousel featuring collector reviews and student feedback.
- **Robust Lead Capture:** Contact form integrated with Google Sheets and Gmail via a Next.js server-side API proxy.
- **Bilingual Theme System:** Sleek luxury dark mode and high-contrast light mode with automatic system detection.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS (Vanilla CSS variables for theme tokens)
- **Animations:** Framer Motion (page and element transitions), GSAP & ScrollTrigger (scroll effects), Lenis (smooth scrolling)
- **Forms:** React Hook Form + Zod (client validation)
- **Database / Backend:** Google Sheets + Google Apps Script Web App (lead storage)
- **Proxy Server:** Next.js API Routes (server-side fetch to bypass CORS)

---

## 📁 Folder Structure

```
├── public/                  # Static assets (images, avatars, logos)
├── src/
│   ├── app/                 # App router pages, layouts, and API routes
│   │   ├── api/contact/     # Next.js API route proxy
│   │   ├── globals.css      # Core styling and theme variables
│   │   ├── layout.tsx       # Root layout and theme provider
│   │   └── page.tsx         # Homepage composition
│   ├── components/          # Reusable React components (Navbar, Hero, Gallery, etc.)
│   ├── data/                # JSON data files (gallery, testimonials, FAQ, etc.)
│   └── context/             # Theme context and state
```

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/gmwebstudio/parth-prajapati.git
cd parth-prajapati
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Documentation

Comprehensive documentation is available in the [docs/](file:///e:/client/ps_art/docs/) directory:

1. [Project Overview](file:///e:/client/ps_art/docs/01-Project-Overview.md)
2. [Installation Guide](file:///e:/client/ps_art/docs/02-Installation-Guide.md)
3. [Project Structure](file:///e:/client/ps_art/docs/03-Project-Structure.md)
4. [Component Documentation](file:///e:/client/ps_art/docs/04-Component-Documentation.md)
5. [Content Management](file:///e:/client/ps_art/docs/05-Content-Management.md)
6. [Contact Form Setup](file:///e:/client/ps_art/docs/06-Contact-Form-Setup.md)
7. [Google Apps Script Setup](file:///e:/client/ps_art/docs/07-Google-Apps-Script-Setup.md)
8. [Google Sheets Integration](file:///e:/client/ps_art/docs/08-Google-Sheets-Integration.md)
9. [Deployment Guide](file:///e:/client/ps_art/docs/09-Deployment-Guide.md)
10. [Maintenance Guide](file:///e:/client/ps_art/docs/10-Maintenance-Guide.md)
11. [Troubleshooting](file:///e:/client/ps_art/docs/11-Troubleshooting.md)
12. [Performance Optimization](file:///e:/client/ps_art/docs/12-Performance-Optimization.md)
13. [Future Improvements](file:///e:/client/ps_art/docs/13-Future-Improvements.md)

---

## 🤝 Credits

- **Design & Development:** [GM Web Studio](https://gmwebstudio.vercel.app)
- **Lead Developer:** Gaurav Mandli

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
