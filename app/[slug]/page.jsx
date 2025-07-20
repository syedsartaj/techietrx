import React, { Suspense } from 'react';
import BlogPost from './BlogPost'; // ✅ Correct default import

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading blog post...</div>}>
      <BlogPost />
    </Suspense>
  );
}
