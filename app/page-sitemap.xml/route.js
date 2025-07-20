import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.CUSTOM_DOMAIN; // Replace with your actual domain in production

  const pages = ['', 'about', 'contactus', 'BlogList'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      path => `<url>
    <loc>${baseUrl}/${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
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
