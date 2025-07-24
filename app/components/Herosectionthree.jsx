'use client';

import Image from 'next/image';
import { useData } from '../DataContext';
import { useRouter } from 'next/navigation';

export default function FeaturedBanner() {
  const { sheetData, loading } = useData();
  const router = useRouter();

  if (loading || sheetData.length < 3) return null;

  // Get the last 3 posts (latest)
  const lastThreePosts = [...sheetData].slice(-3).reverse(); // [latest, 2nd latest, 3rd latest]
  const [main, topRight, bottomRight] = lastThreePosts;

  const openPost = (post) => {
    if (!post.slug) return;
    localStorage.setItem('blogId', post.id || post.link);
    router.push(`/${post.slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Large Left Card */}
      <div
        className="relative col-span-2 cursor-pointer h-[400px] md:h-[500px] rounded overflow-hidden"
        onClick={() => openPost(main)}
      >
        <img
          src={main.image_url}
          alt={main.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 p-6 flex flex-col justify-end text-white">
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold inline-block w-fit mb-2">
            {main.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug line-clamp-2">
            {main.title}
          </h2>
          <p className="text-sm mt-1">{main.robottxt_publish_date}</p>
        </div>
      </div>

      {/* Right Column (Top and Bottom) */}
      <div className="flex flex-col gap-6">
        {/* Top Right */}
        <div
          className="cursor-pointer flex flex-col md:flex-row gap-4"
          onClick={() => openPost(topRight)}
        >
          <img
            src={topRight.image_url}
            alt={topRight.title}
            className="w-full md:w-40 h-40 object-cover rounded"
          />
          <div>
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold inline-block w-fit mb-1">
              {topRight.category}
            </span>
            <h3 className="text-lg font-semibold leading-tight line-clamp-2">
              {topRight.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{topRight.robottxt_publish_date}</p>
          </div>
        </div>

        {/* Bottom Right */}
        <div
          className="cursor-pointer flex flex-col md:flex-row gap-4"
          onClick={() => openPost(bottomRight)}
        >
          <img
            src={bottomRight.image_url}
            alt={bottomRight.title}
            className="w-full md:w-40 h-40 object-cover rounded"
          />
          <div>
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold inline-block w-fit mb-1">
              {bottomRight.category}
            </span>
            <h3 className="text-lg font-semibold leading-tight line-clamp-2">
              {bottomRight.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{bottomRight.robottxt_publish_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
