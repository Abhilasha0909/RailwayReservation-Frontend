"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Admin Dashboard</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/admin/dashboard" className="text-gray-300 hover:text-white">
              Dashboard
            </Link>
            <Link href="/admin/financial-report" className="text-gray-300 hover:text-white">
              Financial Report
            </Link>
            <Link href="/admin/passenger-details" className="text-gray-300 hover:text-white">
              Passenger Details
            </Link>
            <Link 
              href="/admin/logout" 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6 text-white" 
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
              href="/admin/dashboard" 
              className="block text-gray-300 hover:text-white"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/financial-report" 
              className="block text-gray-300 hover:text-white"
            >
              Financial Report
            </Link>
            <Link 
              href="/admin/passenger-details" 
              className="block text-gray-300 hover:text-white"
            >
              Passenger Details
            </Link>
            <Link 
              href="/admin/logout" 
              className="block bg-red-600 text-white px-4 py-2 rounded-lg 
                       hover:bg-red-700 text-center"
            >
              Logout
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}