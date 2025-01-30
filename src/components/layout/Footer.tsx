import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Company Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">JR Pass</h3>
            <p className="text-gray-400">
              Experience the beauty of Japan through its extensive railway
              network. Fast, reliable, and comfortable travel across the
              country.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex-1">
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

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white">
                  Search Trains
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-white">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Mission Statement */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-400">
              At JR Pass, we are committed to providing safe, reliable, and comfortable travel experiences across Japan, connecting people and places with excellence.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 JR Pass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}