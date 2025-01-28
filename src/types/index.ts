export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }
  
  export interface Station {
    id: string;
    name: string;
    city: string;
    code: string;
  }
  
  export interface Train {
    id: string;
    number: string;
    name: string;
    type: 'local' | 'express';
    availableSeats: number;
  }
  
  export interface Booking {
    id: string;
    userId: string;
    trainId: string;
    scheduleId: string;
    date: string;
    status: 'booked' | 'cancelled' | 'confirmed';
    passengers: Passenger[];
  }
  
  export interface Passenger {
    name: string;
    age: number;
    seatNumber: string;
  }
  
  export interface Schedule {
    id: string;
    trainId: string;
    stationId: string;
    arrivalTime: string;
    departureTime: string;
  }
  
  export interface SearchParams {
    fromStation: string;
    toStation: string;
    date: string;
    passengers: number;
  }