"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define station type
interface Station {
  id: string;
  name: string;
  city: string;
}

// Sample stations data
const stations: Station[] = [
  { id: "tokyo", name: "Tokyo Station", city: "Tokyo" },
  { id: "kyoto", name: "Kyoto Station", city: "Kyoto" },
  { id: "osaka", name: "Osaka Station", city: "Osaka" },
  { id: "hiroshima", name: "Hiroshima Station", city: "Hiroshima" },
  { id: "sapporo", name: "Sapporo Station", city: "Sapporo" },
  { id: "nagoya", name: "Nagoya Station", city: "Nagoya" },
  { id: "fukuoka", name: "Hakata Station", city: "Fukuoka" },
  { id: "sendai", name: "Sendai Station", city: "Sendai" },
];

export default function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fromStation: "",
    toStation: "",
    date: "",
    passengers: "1",
    class: "economy",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fromStation) {
      newErrors.fromStation = "Please select departure station";
    }

    if (!formData.toStation) {
      newErrors.toStation = "Please select arrival station";
    }

    if (formData.fromStation === formData.toStation) {
      newErrors.toStation = "Departure and arrival stations cannot be the same";
    }

    if (!formData.date) {
      newErrors.date = "Please select travel date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const searchParams = new URLSearchParams({
        from: formData.fromStation,
        to: formData.toStation,
        date: formData.date,
        passengers: formData.passengers,
        class: formData.class,
      });

      router.push(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6"
      id="search-form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* From Station */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            From Station
            <span className="text-red-500">*</span>
          </label>
          <select
            name="fromStation"
            value={formData.fromStation}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.fromStation ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select departure station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name} - {station.city}
              </option>
            ))}
          </select>
          {errors.fromStation && (
            <p className="text-red-500 text-sm mt-1">{errors.fromStation}</p>
          )}
        </div>

        {/* To Station */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            To Station
            <span className="text-red-500">*</span>
          </label>
          <select
            name="toStation"
            value={formData.toStation}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.toStation ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select arrival station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name} - {station.city}
              </option>
            ))}
          </select>
          {errors.toStation && (
            <p className="text-red-500 text-sm mt-1">{errors.toStation}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Travel Date
            <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.date ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Passengers */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Passengers
          </label>
          <select
            name="passengers"
            value={formData.passengers}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>
        </div>

        {/* Class Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Search Trains
          </button>
        </div>
      </div>
    </form>
  );
}
