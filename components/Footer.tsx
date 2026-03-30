import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-bold text-white">My Online Store</span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed">
              Your destination for quality products. Browse our curated collection and find exactly what you need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-navy-300 hover:text-white text-sm transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-navy-300 hover:text-white text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-navy-300 hover:text-white text-sm transition-colors">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>📧 hello@myonlinestore.com</li>
              <li>📞 (555) 123-4567</li>
              <li>📍 123 Commerce St, Business City</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-navy-800 text-center">
          <p className="text-navy-400 text-sm">
            &copy; {new Date().getFullYear()} My Online Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}