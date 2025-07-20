'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Footerfour from '../components/Footerfour';
import Header from '../components/Header';
import { useData } from '../DataContext';
import Bloglist2 from './Bloglist2';
import Bloglist1 from './Bloglist1';

const slugify = (str) => str?.trim().toLowerCase().replace(/\s+/g, '-');

const BlogListClient = () => {
  const { sheetData, sheet2Data, loading } = useData();
  const searchParams = useSearchParams();
  const selectedCategory = slugify(searchParams.get('cat'));
  // Determine layout from sheet2Data
  const blogLayout = sheet2Data.bloglayout || '1'; // 
  const categories = Array.from(
    new Set(sheetData.map(post => post.category?.trim()).filter(Boolean))
  );

  const filteredCategories = selectedCategory
    ? categories.filter(cat => slugify(cat) === selectedCategory)
    : categories;

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
{loading ? (
        <div className="text-center py-10 font-semibold text-lg">Loading blog posts...</div>
      ) : blogLayout === '1' ? (
        <Bloglist1/>
      ) : blogLayout === '2' ? (
        (<Bloglist2/>)
      ) : (
        <div className="text-center py-10 text-red-600">Invalid layout type</div>
      )}
    </div>
  );
};

export default BlogListClient;
