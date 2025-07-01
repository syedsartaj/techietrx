import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.DOMAIN!;
  const spreadsheetId = process.env.SPREADSHEET_ID!;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:S', // skip header, get all rows
    });

    const rows = res.data.values || [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows
  .map(row => {
    const [id, , , , , , , , , , , , robottxt_publish_date] = row;
    return `
  <url>
    <loc>${baseUrl}/blogpage?id=${encodeURIComponent(id)}</loc>
    <lastmod>${new Date(robottxt_publish_date || new Date()).toISOString()}</lastmod>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (err: any) {
    console.error('❌ Failed to generate sitemap:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
