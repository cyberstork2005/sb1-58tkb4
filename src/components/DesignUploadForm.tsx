import React, { useState } from 'react';
import { Design } from '../types';

interface DesignUploadFormProps {
  onSubmit: (newDesign: Omit<Design, 'id'>) => void;
  onCancel: () => void;
}

const DesignUploadForm: React.FC<DesignUploadFormProps> = ({ onSubmit, onCancel }) => {
  const [newDesign, setNewDesign] = useState<Omit<Design, 'id'>>({
    image: '',
    carModel: '',
    price: 0,
    reservations: 0,
    startDate: new Date(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    status: 'open',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDesign(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'reservations' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newDesign);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold mb-4">新規デザインアップロード</h3>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">画像URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={newDesign.image}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="carModel" className="block text-gray-700 font-bold mb-2">車種</label>
        <select
          id="carModel"
          name="carModel"
          value={newDesign.carModel}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        >
          <option value="">選択してください</option>
          <option value="ジムニーJB74">ジムニーJB74</option>
          <option value="GRヤリスGXPA16前期型">GRヤリスGXPA16前期型</option>
          <option value="GRヤリスMXPA12前期型">GRヤリスMXPA12前期型</option>
          <option value="スイフトZC33">スイフトZC33</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">価格</label>
        <input
          type="number"
          id="price"
          name="price"
          value={newDesign.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
          min="0"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">開始日</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={newDesign.startDate.toISOString().split('T')[0]}
          onChange={(e) => setNewDesign(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">終了日</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={newDesign.endDate.toISOString().split('T')[0]}
          onChange={(e) => setNewDesign(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          アップロード
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default DesignUploadForm;