export interface Campsite {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  imageUrl: string;
  bookingUrl: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  savedCampsites: Campsite[];
}

export interface SearchQuery {
  location: string;
  checkIn: Date;
  checkOut: Date;
  maxDistance: number;
  amenities: string[];
}

export interface Review {
  id: string;
  author: User;
  campsite: Campsite;
  rating: number;
  text: string;
  date: Date;
}
