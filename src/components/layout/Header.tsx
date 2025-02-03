"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/images/logo.png"
              alt="JR Pass Logo"
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-blue-600">DMRC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-600 hover:text-blue-600">
              Search Trains
            </Link>
            <Link href="/booking" className="text-gray-600 hover:text-blue-600">
              My Bookings
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              href="/search"
              className="block text-gray-600 hover:text-blue-600"
            >
              Search Trains
            </Link>
            <Link
              href="/booking"
              className="block text-gray-600 hover:text-blue-600"
            >
              My Bookings
            </Link>
            <Link
              href="/dashboard"
              className="block text-gray-600 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="block bg-blue-600 text-white px-4 py-2 rounded-lg 
                       hover:bg-blue-700 text-center"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
