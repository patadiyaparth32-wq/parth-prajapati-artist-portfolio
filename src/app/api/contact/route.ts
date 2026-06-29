import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Send the request to Google Apps Script from the server side (bypassing browser CORS)
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzCsPGeCGzCryOIS4-gVJKYDBYfioLDbA7-eNruCpiUAyEiUCFDT0GQM9FLOugD787L/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Google Apps Script returned status ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
