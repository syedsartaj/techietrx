'use client';

import React, { useState } from 'react';
import Footerfour from './components/Footerfour';
import Header from './components/Header';
import Carousel from './components/Carousel';
import { useData } from './DataContext';
import Navbar from './components/Navbar';
import Herosection from './components/Herosection';

const Home = () => {
  const { sheetData, sheet2Data, loading } = useData();
  const categories = Array.from(
    new Set(sheetData.map(post => post.category?.trim()).filter(Boolean))
  );
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [openCategory, setOpenCategory] = useState(null);

  // Extract theme and layoutType from sheet2Data with fallback defaults
    const layoutt = sheet2Data.find(row => row.layoutType);
    const type = layoutt?.layoutType.toString().trim();
  const theme = {
    primaryColor: sheet2Data?.primaryColor || '#2563eb', // Blue
    secondaryColor: sheet2Data?.secondaryColor || '#e5e7eb', // Light gray
    fontFamily: sheet2Data?.fontFamily || 'Inter, sans-serif',
    layoutType: sheet2Data?.layoutType || type, // Default to Vertical Stacked
  };

  const renderCarouselLayout = () => {
    switch (type) {
      case '1': // Vertical Stacked Carousels
        return categories.map((cat, idx) => {
          const postsForCategory = sheetData.filter(
            post => post.category?.trim() === cat
          );
          return (
            <section
              key={idx}
              className="py-12"
              style={{ backgroundColor: theme.secondaryColor, fontFamily: theme.fontFamily }}
            >
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6" style={{ color: theme.primaryColor }}>
                  {cat}
                </h2>
                <Carousel title={cat} posts={postsForCategory} />
              </div>
            </section>
          );
        });

      case '2': // Grid-Based Carousels
        return (
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((cat, idx) => {
                const postsForCategory = sheetData.filter(
                  post => post.category?.trim() === cat
                );
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-lg shadow-md"
                    style={{ backgroundColor: theme.secondaryColor, fontFamily: theme.fontFamily }}
                  >
                    <h2
                      className="text-2xl font-semibold mb-4"
                      style={{ color: theme.primaryColor }}
                    >
                      {cat}
                    </h2>
                    <Carousel title={cat} posts={postsForCategory} />
                  </div>
                );
              })}
            </div>
          </div>
        );

      case '3': // Tabbed Carousels
        return (
          <section className="py-12" style={{ backgroundColor: theme.secondaryColor, fontFamily: theme.fontFamily }}>
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full font-semibold ${
                      activeCategory === cat
                        ? 'text-white'
                        : 'bg-white text-gray-800 hover:bg-blue-100'
                    }`}
                    style={{
                      backgroundColor: activeCategory === cat ? theme.primaryColor : undefined,
                      fontFamily: theme.fontFamily,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {activeCategory && (
                <div>
                  <h2
                    className="text-3xl font-bold mb-6 text-center"
                    style={{ color: theme.primaryColor }}
                  >
                    {activeCategory}
                  </h2>
                  <Carousel
                    title={activeCategory}
                    posts={sheetData.filter(post => post.category?.trim() === activeCategory)}
                  />
                </div>
              )}
            </div>
          </section>
        );

      case '4': // Alternating Carousels
        return categories.map((cat, idx) => {
          const postsForCategory = sheetData.filter(
            post => post.category?.trim() === cat
          );
          return (
            <section
              key={idx}
              className="py-12"
              style={{
                backgroundColor: idx % 2 === 0 ? theme.secondaryColor : theme.primaryColor + '20', // 20% opacity
                fontFamily: theme.fontFamily,
              }}
            >
              <div className="container mx-auto px-4">
                <h2
                  className="text-3xl font-bold mb-6 text-center"
                  style={{ color: idx % 2 === 0 ? theme.primaryColor : theme.primaryColor }}
                >
                  {cat}
                </h2>
                <div className={`max-w-5xl mx-auto ${idx % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                  <Carousel title={cat} posts={postsForCategory} />
                </div>
              </div>
            </section>
          );
        });

      case '5': // Accordion Carousels
        return (
          <section className="py-12" style={{ backgroundColor: theme.secondaryColor, fontFamily: theme.fontFamily }}>
            <div className="container mx-auto px-4">
              {categories.map((cat, idx) => {
                const postsForCategory = sheetData.filter(
                  post => post.category?.trim() === cat
                );
                const isOpen = openCategory === cat;
                return (
                  <div key={idx} className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenCategory(isOpen ? null : cat)}
                      className="w-full py-4 text-left text-2xl font-semibold hover:text-blue-600"
                      style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}
                    >
                      {cat}
                      <span className="float-right">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="py-4">
                        <Carousel title={cat} posts={postsForCategory} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      default:
        return <div className="text-center py-10 text-red-600">Invalid layout type</div>;
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen" style={{ fontFamily: theme.fontFamily }}>
      <Navbar />
      <Herosection />
      {loading ? (
        <div className="text-center py-10 font-semibold text-lg">Loading blog posts...</div>
      ) : (
        renderCarouselLayout()
      )}
      <Footerfour />
    </div>
  );
};

export default Home;