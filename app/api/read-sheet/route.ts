import { google } from 'googleapis';
import { NextResponse } from 'next/server';

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

    const fetchSheetData = async (sheetName: string) => {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetName,
      });

      const rows = response.data.values || [];
      const [header, ...body] = rows;
      return body.map((row: any) =>
        header.reduce((acc: any, key: any, i: any) => ({ ...acc, [key]: row[i] }), {})
      );
    };

    const [sheet1Data, sheet2Data] = await Promise.all([
      fetchSheetData('Sheet1'),
      fetchSheetData('Sheet2'),
    ]);

    return NextResponse.json({
      sheet1: sheet1Data,
      sheet2: sheet2Data,
    });
  } catch (error: any) {
    console.error("❌ Sheet read error:", error);
    return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
  }
}
