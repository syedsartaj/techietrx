import React, { Suspense } from 'react';
import BlogPost from './BlogPost'; // 👇 Moved logic here

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading blog post...</div>}>
      <BlogPost />
    </Suspense>
  );
}
