"use client";
import Link from 'next/link';
 const Headerone = ({compname}) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          {compname}
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            Services
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link href="/BlogList" className="text-gray-600 hover:text-blue-600">
            Blog
          </Link>
          <Link href="/contactus" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <Link
          href="/contactus"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Headerone;