import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Client from '@/models/Client';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const domain = process.env.DOMAIN!;
    const email = process.env.USER_EMAIL!;
    const mongoUri = process.env.MongoDB_URL!;

    if (!domain) {
      return NextResponse.json({ error: 'Missing domain' }, { status: 400 });
    }

    // ✅ Use global connection caching for Mongoose (important for serverless)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        dbName: 'test', // optional: set your specific db name if needed
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 3000,
      });
    }

    // ✅ Use projection and filter in a single query (more efficient)
    const user = await Client.findOne(
      { email, 'Deployments.Domain': domain },
      {
        'Deployments.$': 1, // only return the matched Deployment
      }
    ).lean() as any; // ✅ .lean() returns plain JS object (faster than Mongoose documents)

    if (!user || !user.Deployments?.length) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = user.Deployments[0];
    const data = deployment.Data?.[0] || {};

    return NextResponse.json({
      sheet1: data.blogs || [],
      sheet2: data.Layout || [],
    });
  } catch (error: any) {
    console.error('❌ MongoDB fetch error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
