"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import SeatMap from '@/components/booking/SeatMap';

export default function BookingForm() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your search logic here
  };

  return (
    <>
      <Card className="mb-8 p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="From"
            value={searchParams.from}
            onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
          />
          <Input
            type="text"
            placeholder="To"
            value={searchParams.to}
            onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
          />
          <Input
            type="date"
            value={searchParams.date}
            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
          />
          <Button type="submit">Search</Button>
        </form>
      </Card>
      <SeatMap />
    </>
  );
}