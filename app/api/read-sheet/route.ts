import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Client from '@/models/Client'; // adjust this path to your schema file

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const domain = process.env.DOMAIN!;
    const email = process.env.USER_EMAIL!;
    const mongoUri = process.env.MongoDB_URL!;

    if (!domain) {
      return NextResponse.json({ error: 'Missing domain' }, { status: 400 });
    }

    // Connect to MongoDB
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(mongoUri);
    }
//
    // Find the user by email
    const user = await Client.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the deployment with the matching domain
    const deployment = user.Deployments.find((d: any) => d.Domain === domain);

    if (!deployment) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    // Assuming only one Data item per deployment
    const data = deployment.Data[0];

    return NextResponse.json({
      sheet1: data.blogs,    // blogs
      sheet2: data.Layout    // layout
    });

  } catch (error: any) {
    console.error('❌ MongoDB fetch error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
