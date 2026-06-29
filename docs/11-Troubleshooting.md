# Troubleshooting

Common issues and how to resolve them.

## 1. "TypeError: Failed to fetch" on Form Submission
- **Cause:** Directly calling the Google Apps Script URL from the browser triggers a CORS preflight (`OPTIONS`) request, which is rejected by Google's servers.
- **Solution:** Ensure the form submits to the local Next.js API route `/api/contact` instead of the direct Google URL. The server-side proxy handles the request without CORS restrictions.

## 2. Chrome Autofill Blue Background
- **Cause:** Chrome applies default styles to autofilled inputs.
- **Solution:** Standard overrides are implemented in `globals.css` using `-webkit-box-shadow` and `-webkit-text-fill-color`.

## 3. Lightbox Images Not Loading
- **Cause:** The image path in `gallery.json` does not match the file location in `public/images/`.
- **Solution:** Verify file paths and check for case-sensitive filenames.
