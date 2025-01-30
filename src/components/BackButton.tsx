"use client";
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Back
    </button>
  );
}