'use client';

import Head from 'next/head';
import { useContext } from 'react';
import { useData } from './DataContext';
import SkeletonLoader from './components/SkeletonLoader';

export default function DynamicHead() {
  const { sheet2Data, loading } = useData();

  // Prevent rendering until data is loaded
  if (loading) return <SkeletonLoader/>;

  const Heading = sheet2Data.Header || 'Smaksly — Build & Deploy Your Website';
  const companySlogan = sheet2Data.companySlogan || 'Smaksly helps you create and launch modern websites effortlessly, including free hosting and SEO tools.';

  return (
    <Head>
      <title>{Heading}</title>
      <meta name="description" content={companySlogan} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={Heading} />
      <meta property="og:description" content={companySlogan} />
      <meta property="og:image" content="ps://i.postimg.cc/cLjLPgpD/Chat-GPT-Image-Jul-9-2025-01-34-08-AM.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="ps://i.postimg.cc/cLjLPgpD/Chat-GPT-Image-Jul-9-2025-01-34-08-AM.png" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={Heading} />
      <meta name="twitter:description" content={companySlogan} />
      <meta name="twitter:image" content="ps://i.postimg.cc/cLjLPgpD/Chat-GPT-Image-Jul-9-2025-01-34-08-AM.png" />
  </Head>
  );
}
