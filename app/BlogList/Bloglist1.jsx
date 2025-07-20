'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Bottom from '../components/Bottom';
import Navbar from '../components/Navbar';
import { useData } from '../DataContext';

const slugify = (str) => str?.trim().toLowerCase().replace(/\s+/g, '-');

const BlogListClientVertical = () => {
  const { sheetData, loading } = useData();
  const searchParams = useSearchParams();
  const selectedCategory = slugify(searchParams.get('cat'));
  const router = useRouter();

  const categories = Array.from(
    new Set(sheetData.map(post => post.category?.trim()).filter(Boolean))
  );
const handleCardClick = (post) => {
  const id = post.id || post.link;
  const keyword = post.slug; // 👈 Replace spaces with hyphens
  if (id && keyword) {
    localStorage.setItem('blogId', id); // 👈 store the id in sessionStorage
    router.push(`/${encodeURIComponent(keyword)}`);
  }
};
  const filteredCategories = selectedCategory
    ? categories.filter(cat => slugify(cat) === selectedCategory)
    : categories;

  const [visiblePosts, setVisiblePosts] = useState(50); // Initial 50 posts

  const renderPost = (post, idx) => (
    <div
      key={idx}
      onClick={() => handleCardClick(post)}
      className="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200"
    >
      <h3 className="text-lg font-semibold text-blue-800">{post.title}</h3>
      <p className="text-sm text-gray-600">
        {post.robottxt_publish_date} by {post.robottxt_auther_name || 'Unknown'}
      </p>
      <p className="text-sm text-gray-700">{post.robottxt_headline}</p>
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-40 object-cover rounded mt-2"
        />
      )}
    </div>
  );

  const loadMore = () => {
    setVisiblePosts(prev => prev + 50); // Load 50 more posts
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <Navbar />
      {loading ? (
        <div className="text-center py-10 font-semibold text-lg">Loading blog posts...</div>
      ) : (
        <div className="max-w-6xl mx-auto py-8 px-4">
          {filteredCategories.map((cat, idx) => {
            const postsForCategory = sheetData.filter(
              post => slugify(post.category) === slugify(cat)
            );
            const limitedPosts = postsForCategory.slice(0, visiblePosts);

            return (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">{cat}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {limitedPosts.map(renderPost)}
                </div>
              </div>
            );
          })}
          {sheetData.length > visiblePosts && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
      <Bottom />
    </div>
  );
};

export default BlogListClientVertical;
