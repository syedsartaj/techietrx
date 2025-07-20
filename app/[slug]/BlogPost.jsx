'use client';
import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect,useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useData } from '../DataContext';
import Navbar from '../components/Navbar';
import Footerfour from '../components/Footerfour';

const BlogPost = () => {

const params = useParams();
const slug = params?.slug; // this will be 'a-comprehensive-analysis-of-the-israel-vs-iran-conflict'

  // useEffect(() => {
  //   const id = localStorage.getItem('blogId');
  //   if (id) {
  //     setBlogId(id);
  //     console.log(id,'here');
  //     // fetch blog data using `id` if needed
  //   }
  // }, []);
  // const searchParams = useSearchParams();
  // const selectedId = searchParams.get('id');

  const { sheetData, loading } = useData();
  const blogPost = sheetData.find(post => post.slug === slug);

  //const blogPost = sheetData.find(post => post.id === blogId);

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <Navbar />
      {loading ? (
        <div className="text-center py-10 font-semibold text-lg">Loading blog post...</div>
      ) : blogPost ? (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">{blogPost.title}</h1>
          <img
            src={blogPost.image_url}
            alt={blogPost.title}
            className="w-full h-60 object-cover rounded mb-4"
          />
          <p className="text-sm text-gray-600 mb-2">
            {blogPost.robottxt_publish_date} by {blogPost.robottxt_auther_name || 'Unknown'}
          </p>
          <p className="text-gray-800">{blogPost.robottxt_headline}</p>
          {blogPost.body && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.body }}
            />
          )}
        </div>
      ) : (
        <div className="text-center py-10 font-semibold text-lg text-red-600">
          Blog post not found.
        </div>
      )}
      <Footerfour />
    </div>
  );
};

export default BlogPost; // ✅ This must be a default export
