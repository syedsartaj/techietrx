'use client'; // Required for hooks

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // ✅ use Next.js version
import Bottom from '../components/Bottom';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { useData } from '../DataContext';

const slugify = (str) => str?.trim().toLowerCase().replace(/\s+/g, '-');

const BlogList = () => {
  const { sheetData, loading } = useData();
const searchParams = useSearchParams(); // ✅ This is correct for next/navigation
  const selectedCategory = slugify(searchParams.get('cat'));

  // Extract unique categories (raw)
  const categories = Array.from(
    new Set(sheetData.map(post => post.category?.trim()).filter(Boolean))
  );

  // Filter categories based on URL param
  const filteredCategories = selectedCategory
    ? categories.filter(cat => slugify(cat) === selectedCategory)
    : categories;

  return (
        <Suspense fallback={<div>Loading BlogList...</div>}>
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <Header />

      {loading ? (
        <div className="text-center py-10 font-semibold text-lg">Loading blog posts...</div>
      ) : (
        filteredCategories.map((cat, idx) => {
          const postsForCategory = sheetData.filter(
            post => slugify(post.category) === slugify(cat)
          );

          return (
            <Carousel key={idx} title={cat} posts={postsForCategory} />
          );
        })
      )}

      <Bottom />
    </div>
    </Suspense>
  );
};

export default BlogList;
