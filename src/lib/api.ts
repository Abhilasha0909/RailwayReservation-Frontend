const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function fetchStations(): Promise<Station[]> {
  const response = await fetch(`${API_BASE_URL}/stations`);
  if (!response.ok) throw new Error('Failed to fetch stations');
  return response.json();
}

export async function searchTrains(params: SearchParams): Promise<Train[]> {
  const queryString = new URLSearchParams({
    from: params.fromStation,
    to: params.toStation,
    date: params.date,
    passengers: params.passengers.toString(),
  }).toString();

  const response = await fetch(`${API_BASE_URL}/trains/search?${queryString}`);
  if (!response.ok) throw new Error('Failed to search trains');
  return response.json();
}

export async function createBooking(bookingData: Partial<Booking>): Promise<Booking> {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  
  if (!response.ok) throw new Error('Failed to create booking');
  return response.json();
}

export async function getBooking(id: string): Promise<Booking> {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
  if (!response.ok) throw new Error('Failed to fetch booking');
  return response.json();
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/bookings`);
  if (!response.ok) throw new Error('Failed to fetch user bookings');
  return response.json();
}