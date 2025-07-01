// app/sitemap.xml/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.DOMAIN; // Replace with your actual domain in production

  const urls = [
    {
      loc: `${baseUrl}/post-sitemap.xml`,
      lastmod: '2025-06-25T11:11:00+00:00',
    },
    {
      loc: `${baseUrl}/page-sitemap.xml`,
      lastmod: '2025-06-19T12:09:00+00:00',
    },
    // {
    //   loc: `${baseUrl}/category-sitemap.xml`,
    //   lastmod: '2025-06-25T11:11:00+00:00',
    // },
    // {
    //   loc: `${baseUrl}/author-sitemap.xml`,
    //   lastmod: '2024-03-24T16:58:00+00:00',
    // },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <sitemap>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
