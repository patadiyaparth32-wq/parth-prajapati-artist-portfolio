# Contact Form Setup

The contact form uses a modern React Hook Form and Zod configuration.

## Validation Schema
Defined using Zod in `Contact.tsx`:
- **Name:** Required, minimum 2 characters.
- **Email:** Required, must be a valid email address.
- **Phone:** Optional, must be a valid phone number if provided.
- **Subject:** Required, minimum 3 characters.
- **Message:** Required, minimum 10 characters.

## Submission Workflow
1. **Validation:** Checks inputs client-side.
2. **Metadata Collection:** Fetches client IP via `api.ipify.org` and parses `navigator.userAgent` for device type.
3. **API Proxy Post:** Sends payload to the local Next.js `/api/contact` route.
4. **Proxy Forwarding:** The server forwards the JSON to the Google Apps Script Web App.
5. **Success Handling:** Resets fields and triggers a success toast.
6. **Error Handling:** Displays the server error message in an error toast without clearing inputs.
