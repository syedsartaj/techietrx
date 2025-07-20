'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Footerfour from '../components/Footerfour';
import { useData } from '../DataContext'; // ✅ Update the path if different
import SkeletonLoader from '../components/SkeletonLoader';

const Contact = () => {
    const { sheet2Data, loading } = useData();
  if (loading) return <SkeletonLoader/>;

  // Safely extract body_aboutus from sheet2Data[0]
  
 const compname = sheet2Data.body_aboutus || '';

  return (
<div>
    <Navbar/>
      <div className="bg-white text-gray-900 py-10 px-6 max-w-6xl mx-auto">
        <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: compname }} />
      </div>
      <Footerfour />
    </div>
  );
};

export default Contact;