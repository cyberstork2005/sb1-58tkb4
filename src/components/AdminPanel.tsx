import React, { useState } from 'react';
import { Design } from '../types';
import DesignUploadForm from './DesignUploadForm';
import ChangePasswordForm from './ChangePasswordForm';

interface AdminPanelProps {
  designs: Design[];
  onUpdateDesign: (updatedDesign: Design) => void;
  onDeleteDesign: (id: number) => void;
  onAddDesign: (newDesign: Omit<Design, 'id'>) => void;
  onChangePassword: (newPassword: string) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  designs,
  onUpdateDesign,
  onDeleteDesign,
  onAddDesign,
  onChangePassword,
  onLogout
}) => {
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const handleEdit = (design: Design) => {
    setEditingDesign(design);
  };

  const handleSave = () => {
    if (editingDesign) {
      onUpdateDesign(editingDesign);
      setEditingDesign(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingDesign) {
      setEditingDesign({
        ...editingDesign,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">管理者パネル</h2>
      <div className="flex space-x-4 mb-4">
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
          ログアウト
        </button>
        <button onClick={() => setShowUploadForm(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          新規デザインアップロード
        </button>
        <button onClick={() => setShowChangePasswordForm(true)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
          パスワード変更
        </button>
      </div>

      {showUploadForm && (
        <DesignUploadForm
          onSubmit={(newDesign) => {
            onAddDesign(newDesign);
            setShowUploadForm(false);
          }}
          onCancel={() => setShowUploadForm(false)}
        />
      )}

      {showChangePasswordForm && (
        <ChangePasswordForm
          onSubmit={(newPassword) => {
            onChangePassword(newPassword);
            setShowChangePasswordForm(false);
          }}
          onCancel={() => setShowChangePasswordForm(false)}
        />
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">画像</th>
            <th className="border border-gray-300 px-4 py-2">車種</th>
            <th className="border border-gray-300 px-4 py-2">価格</th>
            <th className="border border-gray-300 px-4 py-2">予約数</th>
            <th className="border border-gray-300 px-4 py-2">開始日</th>
            <th className="border border-gray-300 px-4 py-2">終了日</th>
            <th className="border border-gray-300 px-4 py-2">ステータス</th>
            <th className="border border-gray-300 px-4 py-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {designs.map((design) => (
            <tr key={design.id}>
              <td className="border border-gray-300 px-4 py-2">{design.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={design.image} alt={`Design ${design.id}`} className="w-20 h-20 object-cover" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{design.carModel}</td>
              <td className="border border-gray-300 px-4 py-2">¥{design.price.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">{design.reservations}</td>
              <td className="border border-gray-300 px-4 py-2">{design.startDate.toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{design.endDate.toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{design.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(design)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 transition-colors"
                >
                  編集
                </button>
                <button
                  onClick={() => onDeleteDesign(design.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;