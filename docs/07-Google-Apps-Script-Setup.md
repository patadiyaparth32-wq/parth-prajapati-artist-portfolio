# Google Apps Script Setup

The contact form is connected to a Google Sheet using Google Apps Script.

## Apps Script Code
Create a new Google Apps Script project and paste the following code:

```javascript
function doPost(e) {
  try {
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append lead to Google Sheet
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone || "",
      data.subject,
      data.message,
      data.ip || "",
      data.browser || "",
      data.device || ""
    ]);
    
    // Send email notification to artist
    var emailSubject = "New Portfolio Inquiry: " + data.subject;
    var emailBody = "You have received a new inquiry from your portfolio website.\n\n" +
                    "Name: " + data.name + "\n" +
                    "Email: " + data.email + "\n" +
                    "Phone: " + data.phone + "\n\n" +
                    "Message:\n" + data.message + "\n\n" +
                    "Metadata:\n" +
                    "IP Address: " + data.ip + "\n" +
                    "Device: " + data.device;
                    
    MailApp.sendEmail("gauravmandli2004@gmail.com", emailSubject, emailBody);
    
    return ContentService.createTextOutput(JSON.stringify({
      "success": true,
      "message": "Message saved successfully."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "success": false,
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Deployment Steps
1. Click **Deploy > New deployment**.
2. Select **Web app** as the deployment type.
3. Set **Execute as** to `Me`.
4. Set **Who has access** to `Anyone`.
5. Click **Deploy**, authorize permissions, and copy the Web App URL.
