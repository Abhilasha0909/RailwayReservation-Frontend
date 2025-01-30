"use client";
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { FaFileAlt, FaUsers,FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome Admin !</h1>
      <Card className="w-full max-w-4xl p-8 mb-4 min-h-[300px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <div className="flex justify-around mt-14">
          <div className="flex flex-col items-center">
            <Link href="/admin/financial-report" className="flex flex-col items-center text-blue-500 hover:underline">
              <FaFileAlt className="text-6xl mb-4" /> {/* Adjusted icon size and spacing */}
              <span className="text-xl">Financial Reports</span> {/* Adjusted text size */}
            </Link>
          </div>
          <div className="flex flex-col items-center">
          <Link href="/admin/financial-report-bystation" className="flex flex-col items-center text-blue-500 hover:underline">
            <FaMapMarkerAlt className="text-6xl mb-4" />
            <span className="text-xl">Financial Report by Station</span>
          </Link>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/admin/passenger-details" className="flex flex-col items-center text-blue-500 hover:underline">
              <FaUsers className="text-6xl mb-4" /> {/* Adjusted icon size and spacing */}
              <span className="text-xl">Passenger Details</span> {/* Adjusted text size */}
            </Link>
          </div>
          
        </div>
      </Card>
    </div>
  );
}