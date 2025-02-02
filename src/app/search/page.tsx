"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import TrainList from "@/components/booking/TrainList";
import { Train } from "@/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrains = async () => {
      const source = searchParams.get("source");
      const destination = searchParams.get("destination");
      const date = searchParams.get("date");
      const passengers = searchParams.get("passengers");

      if (!source || !destination || !date) {
        setError("Missing search parameters");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/trains/search",
          {
            params: { source, destination, date },
          }
        );

        setTrains(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch train data");
        setLoading(false);
      }
    };

    fetchTrains();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>

        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-semibold">{searchParams.get("source")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">To</p>
              <p className="font-semibold">{searchParams.get("destination")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{searchParams.get("date")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Passengers</p>
              <p className="font-semibold">{searchParams.get("passengers")}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <TrainList
            trains={trains}
            passengers={parseInt(searchParams.get("passengers") || "1", 10)}
            source={searchParams.get("source")}
            destination={searchParams.get("destination")}
          />
        )}
      </div>
    </div>
  );
}
