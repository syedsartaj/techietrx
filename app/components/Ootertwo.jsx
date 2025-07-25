import Link from 'next/link';

export default function Footertwo({ companyName, companySlogan, emailid }) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <Link href="/" className="text-2xl font-bold mb-4 block">
            {companyName}
          </Link>
          <p className="text-sm">{companySlogan}</p>
          <br/>
          <p className="text-sm">{emailid}</p>          
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link href="/BlogList" className="hover:text-blue-400">Blog</Link></li>
            <li><Link href="/contactus" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}