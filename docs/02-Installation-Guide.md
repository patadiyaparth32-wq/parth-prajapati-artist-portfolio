# Installation Guide

Follow these steps to set up the local development environment.

## Prerequisites
- **Node.js:** v18.x or higher
- **Package Manager:** npm or yarn

## Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/gmwebstudio/parth-prajapati.git
   cd parth-prajapati
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzCsPGeCGzCryOIS4-gVJKYDBYfioLDbA7-eNruCpiUAyEiUCFDT0GQM9FLOugD787L/exec
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```
