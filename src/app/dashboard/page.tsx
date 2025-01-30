"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // Dummy data for upcoming journeys
  const dummyBookings = [
    {
      id: 1,
      tripName: "Boston to New York",
      date: "2023-11-20",
      time: "10:00 AM",
      status: "Confirmed",
    },
  ];

  const [bookings, setBookings] = useState(dummyBookings);
  const [loading, setLoading] = useState(false);

  // Commenting out the fetch part for now
  /*
  useEffect(() => {
    setLoading(true);
    fetch('/api/user/upcoming-journeys')
      .then(response => response.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching upcoming journeys:", error);
        setLoading(false);
      });
  }, []);
  */

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Journeys</h2>
          {loading ? (
            <p>Loading...</p>
          ) : bookings.length === 0 ? (
            <p>No upcoming journeys</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <h3 className="text-lg font-bold">{booking.tripName}</h3>
                  <p className="text-gray-600">
                    Date: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Time: {booking.time}</p>
                  <p
                    className={`text-sm font-semibold ${
                      booking.status === "Confirmed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    Status: {booking.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button
              className="w-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
              variant="outline"
              onClick={() => router.push("/#search-form")}
            >
              Book New Ticket
            </Button>
            <Button
              className="w-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
              variant="outline"
              onClick={() => router.push("/#bookings")}
            >
              View Bookings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}