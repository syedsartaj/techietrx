import React, { Suspense } from 'react';
import BlogListClient from './BlogListClient'; // client-side logic

export default function BlogListPage() {
  return (
    <Suspense fallback={<div>Loading BlogList...</div>}>
      <BlogListClient />
    </Suspense>
  );
}
