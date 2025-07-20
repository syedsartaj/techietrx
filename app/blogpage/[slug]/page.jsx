import React, { Suspense } from 'react';
import BlogPost from './BlogPost'; // ✅ Correct default import
import SkeletonLoader from '../../components/SkeletonLoader';

export default function BlogPage() {
  return (
    <Suspense fallback={<SkeletonLoader/>}>
      <BlogPost />
    </Suspense>
  );
}
