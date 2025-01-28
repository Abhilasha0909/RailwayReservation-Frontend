import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const bookings = [
    // Add sample bookings data here
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Journeys</h2>
          {bookings.length === 0 ? (
            <p>No upcoming journeys</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li key={booking.id}>
                  {/* Add booking details here */}
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button className="w-full">Book New Ticket</Button>
            <Button className="w-full" variant="outline">View All Bookings</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
