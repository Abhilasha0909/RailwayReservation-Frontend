import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">JR Pass</h3>
            <p className="text-gray-400">
              Experience the beauty of Japan through its extensive railway
              network. Fast, reliable, and comfortable travel across the
              country.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white">
                  Search Trains
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-gray-400 hover:text-white"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="text-gray-400 hover:text-white"
                >
                  Train Schedule
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Phone: +81 3-1234-5678</li>
              <li>Email: support@jrpass.jp</li>
              <li>
                Address: Tokyo Station, Marunouchi,
                <br />
                Chiyoda City, Tokyo 100-0005
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates about special offers and new routes.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        <div className="border-t border-g`ray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 JR Pass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
