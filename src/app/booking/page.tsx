import BookingForm from '@/components/booking/BookingForm';

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Book Train Tickets</h1>
      <BookingForm />
    </div>
  );
}