import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
     credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ],
});

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client as any });

    const spreadsheetId = process.env.SPREADSHEET_ID!;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1',
    });

    const rows = response.data.values || [];
    const [header, ...body] = rows;
    const data = body.map((row : any) =>
      header.reduce((acc : any, key : any, i:any) => ({ ...acc, [key]: row[i] }), {})
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Sheet read error:", error);
    return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
  }
}
