import React, { Suspense } from 'react';
import BlogListClient from './BlogListClient'; // client-side logic
import SkeletonLoader from '../components/SkeletonLoader';

export default function BlogListPage() {
  return (
    <Suspense fallback={<SkeletonLoader/>}>
      <BlogListClient />
    </Suspense>
  );
}
