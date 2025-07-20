'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Footerfour from '../components/Footerfour';
import Navbar from '../components/Navbar';
import { useData } from '../DataContext';
import { useRouter } from 'next/navigation';
import SkeletonLoader from '../components/SkeletonLoader';

const slugify = (str) => str?.trim().toLowerCase().replace(/\s+/g, '-');

const BlogListClientGrid = () => {
  const { sheetData, loading } = useData();
  const searchParams = useSearchParams();
  const selectedCategory = slugify(searchParams.get('cat'));
  const router = useRouter();

  const categories = Array.from(
    new Set(sheetData.map(post => post.category?.trim()).filter(Boolean))
  );
const handleCardClick = (post) => {
  const id = post.id || post.link;
  const keyword = post.slug// 👈 Replace spaces with hyphens
  if (id && keyword) {
    localStorage.setItem('blogId', id); // 👈 store the id in sessionStorage
    router.push(`/${encodeURIComponent(keyword)}`);
  }
};
  const filteredCategories = selectedCategory
    ? categories.filter(cat => slugify(cat) === selectedCategory)
    : categories;

  const renderPost = (post, idx) => (
    <div
      key={idx}
            onClick={() => handleCardClick(post)}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <h3 className="text-lg font-semibold text-blue-800">{post.title}</h3>
      <p className="text-sm text-gray-600">
        {post.robottxt_publish_date} by {post.robottxt_auther_name || 'John Doe'}
      </p>
      <p className="text-sm text-gray-700">{post.robottxt_headline}</p>
    </div>
  );

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <Navbar />
      {loading ? (
        <SkeletonLoader/>
      ) : (
        <div className="max-w-6xl mx-auto py-8 px-4">
          {filteredCategories.map((cat, idx) => {
            const postsForCategory = sheetData.filter(
              post => slugify(post.category) === slugify(cat)
            );
            return (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">{cat}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {postsForCategory.map(renderPost)}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Footerfour />
    </div>
  );
};

export default BlogListClientGrid;
