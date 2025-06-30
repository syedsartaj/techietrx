import { NextResponse } from 'next/server'; // ✅ This line is required

export async function GET() {
  const baseUrl = 'http://localhost:3000';
  const sheetUrl = 'https://opensheet.elk.sh/1AwQWWJTAuf__DsRtL2Ma3BeP5xUh_5N15k5MDki-aUE/Sheet1';

  let sheetData = [];

  try {
    const res = await fetch(sheetUrl);
    sheetData = await res.json();
  } catch (error) {
    console.error('Failed to fetch sheet data for sitemap:', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sheetData
  .map(
    post => `
  <url>
    <loc>${baseUrl}/blogpage?id=${encodeURIComponent(post.id)}</loc>
    <lastmod>${new Date(post.robottxt_publish_date || new Date()).toISOString()}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
