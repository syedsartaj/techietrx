'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useData } from '../DataContext';

export default function Headerone({ compname }) {
  const { sheetData, loading } = useData();
  const [menuOpen, setMenuOpen] = useState(false);

  // Split compname
  let company = compname;
  let nametwo = '';
  if (compname.includes(' ')) {
    const parts = compname.split(' ');
    company = parts[0];
    nametwo = parts.slice(1).join(' ');
  }

  const categories = Array.from(
    new Set(sheetData.map(post => post.category?.trim()).filter(Boolean))
  );

  return (
    <header className="bg-[#fffef9] border-b border-black-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Socials */}
        <div className="hidden md:flex space-x-4 text-xl text-black">
          <a href="/" aria-label="Instagram"><FaInstagram /></a>
          <a href="/" aria-label="Facebook"><FaFacebookF /></a>
          <a href="/" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="/" aria-label="Pinterest"><FaPinterestP /></a>
        </div>

        {/* Center: Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
          <span className="text-black">{company}</span>{' '}
          {nametwo && <span className="text-red-600">{nametwo}</span>}
        </h1>

        {/* Right: Nav & Menu */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-2">
            <Link
              href="/about"
              className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 rounded"
            >
              About Us
            </Link>
            <Link
              href="/Contact"
              className="bg-white text-black border border-black px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded"
            >
              Contact
            </Link>
          </div>
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-black focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <div className="flex justify-center space-x-4 text-xl text-black">
            <a href="/" aria-label="Instagram"><FaInstagram /></a>
            <a href="/" aria-label="Facebook"><FaFacebookF /></a>
            <a href="/" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="/" aria-label="Pinterest"><FaPinterestP /></a>
          </div>
          <Link href="/about" className="block text-center py-2 text-black hover:text-red-600">About Us</Link>
          <Link href="/Contact" className="block text-center py-2 text-black hover:text-red-600">Contact</Link>
        </div>
      )}

      {/* Categories Navbar */}
      <nav className="border-t border-gray-300">
        <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-8 py-3 text-base sm:text-lg font-medium text-black px-2">
          {categories.map((item) => (
            <li key={item}>
              <Link
                href={`/BlogList?cat=${item.toLowerCase()}`}
                className="hover:text-red-600 transition"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
