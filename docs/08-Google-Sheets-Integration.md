# Google Sheets Integration

The Google Sheet acts as the database for the website's contact form.

## Spreadsheet Structure
Create a Google Sheet and name the headers in the first row as follows:

| Column | Header | Description |
| :--- | :--- | :--- |
| **A** | Timestamp | Date and time of submission |
| **B** | Name | User's full name |
| **C** | Email | User's email address |
| **D** | Phone | User's phone number |
| **E** | Subject | Inquiry subject |
| **F** | Message | Message body |
| **G** | IP | Client's public IP |
| **H** | Browser | User agent string |
| **I** | Device | Mobile or Desktop |

## Best Practices
- **Lead Management:** Create a "Status" column (e.g., Column J) with options like `New`, `In Progress`, `Completed` to manage leads.
- **Access Control:** Restrict editing permissions on the sheet to authorized emails.
