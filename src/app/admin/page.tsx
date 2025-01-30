"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your admin login logic here
    // On successful login, redirect to the admin dashboard
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}></div>
      <Card className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Input
            type="password"
            placeholder="Admin Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transform transition duration-300"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}