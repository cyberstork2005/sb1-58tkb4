import React, { useState } from 'react';
import { Design } from '../types';
import { Share2, Instagram, Facebook, Twitter } from 'lucide-react';

interface DesignCardProps {
  design: Design;
  onReserve: (designId: number, quantity: number) => void;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, onReserve }) => {
  const [quantity, setQuantity] = useState(1);
  // ... (他の状態や計算は変更なし)

  const handleReserve = () => {
    const googleFormUrl = 'https://forms.gle/dVErnWap813o2rVG7';
    onReserve(design.id, quantity);
    window.open(`${googleFormUrl}?entry.designId=${design.id}&entry.quantity=${quantity}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2 w-full sm:w-1/2 md:w-1/3">
      {/* ... (他の要素は変更なし) */}
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">予約枚数</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max={30 - design.reservations}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        onClick={handleReserve}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full mb-2"
        disabled={design.status === 'sold_out' || design.reservations + quantity > 30}
      >
        予約する
      </button>
      {/* ... (他の要素は変更なし) */}
    </div>
  );
};

export default DesignCard;