import Link from 'next/link';

export default function Headerfour({compname}) {
  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold text-white">
          {compname}
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/about" className="text-white hover:text-yellow-300">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-yellow-300">
            Services
          </Link>
          <Link href="/BlogList" className="text-white hover:text-yellow-300">
            Blogs
          </Link>
          <Link href="/contactus" className="text-white hover:text-yellow-300">
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <Link
          href="/contactus"
          className="border-2 border-yellow-300 text-yellow-300 px-6 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition"
        >
          Book a Demo
        </Link>
      </div>
    </header>
  );
}