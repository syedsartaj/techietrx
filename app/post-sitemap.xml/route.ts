import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Client from '@/models/Client';

export async function GET() {
  const baseUrl = process.env.DOMAIN!;
    const Domain = process.env.CUSTOM_DOMAIN!;
  const mongoUri = process.env.MongoDB_URL!;

  try {
    if (!baseUrl || !mongoUri) {
      return NextResponse.json({ error: 'Missing required env vars' }, { status: 400 });
    }


    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(mongoUri);
      console.log('✅ MongoDB connected');
    }

    const user = await Client.findOne({ 'Deployments.Domain': baseUrl });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const deployment = user.Deployments.find(
      (d: any) => d.Domain === baseUrl
    );

    if (!deployment || !deployment.Data?.[0]?.blogs) {
      return new NextResponse('No blog data found', { status: 404 });
    }

    const blogs = deployment.Data[0].blogs;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogs
  .map((blog: any) => {
    return `
  <url>
    <loc>${Domain}/${blog.slug}</loc>
    <lastmod>${new Date(
      blog.robottxt_publish_date || new Date()
    ).toISOString()}</lastmod>
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
    console.error('❌ Failed to generate sitemap:', err.message, err.stack);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
