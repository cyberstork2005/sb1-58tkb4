export interface Design {
  id: number;
  image: string;
  carModel: string;
  price: number;
  reservations: number;
  startDate: Date;
  endDate: Date;
  status: 'open' | 'confirmed' | 'sold_out';
}

export interface Reservation {
  name: string;
  postalCode: string;
  address: string;
  phone: string;
  email: string;
  quantity: number;
}