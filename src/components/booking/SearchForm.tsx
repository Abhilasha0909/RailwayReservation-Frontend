"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define station type
interface Station {
  id: string;
  name: string;
  city: string;
}

export default function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fromStation: "",
    toStation: "",
    date: "",
    passengers: "1",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/stations");
        setStations(response.data);

        console.log(response.data);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          fetchStations: "Failed to fetch stations data",
        }));
      }
    };

    fetchStations();
  }, []);

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

    const passengers = parseInt(formData.passengers, 10);
    if (!Number.isInteger(passengers) || passengers < 1) {
      newErrors.passengers = "Please enter a valid number of passengers";
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
      // Format the date as yyyy/mm/dd
      const formattedDate = formData.date.split("-").join("/");

      const searchParams = new URLSearchParams({
        source: formData.fromStation,
        destination: formData.toStation,
        date: formattedDate, // Send the formatted date
        passengers: formData.passengers,
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
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            From Station <span className="text-red-500">*</span>
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
              <option key={station.stationId} value={station.stationName}>
                {station.stationName} - {station.city}
              </option>
            ))}
          </select>
          {errors.fromStation && (
            <p className="text-red-500 text-sm mt-1">{errors.fromStation}</p>
          )}
        </div>

        {/* To Station */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            To Station <span className="text-red-500">*</span>
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
              <option key={station.stationId} value={station.stationName}>
                {station.stationName} - {station.city}
              </option>
            ))}
          </select>
          {errors.toStation && (
            <p className="text-red-500 text-sm mt-1">{errors.toStation}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Travel Date <span className="text-red-500">*</span>
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
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Passengers <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleInputChange}
            min="1"
            step="1"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.passengers ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.passengers && (
            <p className="text-red-500 text-sm mt-1">{errors.passengers}</p>
          )}
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
