export interface Campsite {
  name: string;
  intro: string;
  description: string;
  city: string;
  state: string;
  address: string;
  address2: string;
  locationClass: string;
  mapX: string;
  mapY: string;
  homepage: string;
  imageUrl: string;
  // latitude: number | null;
  // longitude: number | null;
  // amenities: string[];
  // bookingUrl: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  savedCampsites: Campsite[];
}

export interface Review {
  id: string;
  author: User;
  campsite: Campsite;
  rating: number;
  text: string;
  date: Date;
}
