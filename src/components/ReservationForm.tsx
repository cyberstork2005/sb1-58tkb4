import React, { useState } from 'react';
import { Reservation } from '../types';

interface ReservationFormProps {
  onSubmit: (reservation: Reservation) => void;
  onCancel: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit, onCancel }) => {
  const [reservation, setReservation] = useState<Reservation>({
    name: '',
    postalCode: '',
    address: '',
    phone: '',
    email: '',
    quantity: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reservation);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">予約フォーム</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">名前</label>
        <input
          type="text"
          id="name"
          name="name"
          value={reservation.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="postalCode" className="block text-gray-700 font-bold mb-2">郵便番号</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={reservation.postalCode}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">住所</label>
        <input
          type="text"
          id="address"
          name="address"
          value={reservation.address}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">電話番号</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={reservation.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">メールアドレス</label>
        <input
          type="email"
          id="email"
          name="email"
          value={reservation.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">予約枚数</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={reservation.quantity}
          onChange={handleChange}
          min="1"
          max="30"
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          予約する
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;