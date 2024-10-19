import React, { useState, useEffect } from 'react';
import DesignCard from './components/DesignCard';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { Design } from './types';
import { Filter } from 'lucide-react';

const INITIAL_DESIGNS: Design[] = [
  {
    id: 1,
    image: 'https://example.com/design1.jpg',
    carModel: 'ジムニーJB74',
    price: 50000,
    reservations: 5,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    status: 'open',
  },
  {
    id: 2,
    image: 'https://example.com/design2.jpg',
    carModel: 'GRヤリスGXPA16前期型',
    price: 60000,
    reservations: 8,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-04-15'),
    status: 'open',
  },
  // 必要に応じて他のデザインを追加
];

function App() {
  const [designs, setDesigns] = useState<Design[]>(INITIAL_DESIGNS);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [selectedCarModel, setSelectedCarModel] = useState<string>('all');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Sort and filter designs based on sortOption and selectedCarModel
    let sortedDesigns = [...designs];
    if (sortOption === 'newest') {
      sortedDesigns.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    } else if (sortOption === 'endingSoon') {
      sortedDesigns.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
    } else if (sortOption === 'popular') {
      sortedDesigns.sort((a, b) => b.reservations - a.reservations);
    }

    if (selectedCarModel !== 'all') {
      sortedDesigns = sortedDesigns.filter(design => design.carModel === selectedCarModel);
    }

    setDesigns(sortedDesigns);
  }, [sortOption, selectedCarModel]);

  const handleReservation = (designId: number, quantity: number) => {
    setDesigns(prevDesigns =>
      prevDesigns.map(design =>
        design.id === designId
          ? { ...design, reservations: design.reservations + quantity }
          : design
      )
    );
  };

  const handleAdminLogin = (password: string) => {
    if (password === 'cshappy18') {
      setIsAdminLoggedIn(true);
    } else {
      alert('パスワードが間違っています。');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const handleUpdateDesign = (updatedDesign: Design) => {
    setDesigns(designs.map(design => design.id === updatedDesign.id ? updatedDesign : design));
  };

  const handleDeleteDesign = (id: number) => {
    setDesigns(designs.filter(design => design.id !== id));
  };

  const handleAddDesign = (newDesign: Omit<Design, 'id'>) => {
    const newId = Math.max(...designs.map(d => d.id)) + 1;
    setDesigns([...designs, { ...newDesign, id: newId }]);
  };

  const handleChangePassword = (newPassword: string) => {
    // In a real application, you would update the password in a secure way
    console.log('Password changed to:', newPassword);
    alert('パスワードが変更されました。');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">メーターパネルデザイン予約システム</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isAdminLoggedIn ? (
          <AdminPanel
            designs={designs}
            onUpdateDesign={handleUpdateDesign}
            onDeleteDesign={handleDeleteDesign}
            onAddDesign={handleAddDesign}
            onChangePassword={handleChangePassword}
            onLogout={handleAdminLogout}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <label htmlFor="sort" className="mr-2">並び替え:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="newest">新着順</option>
                  <option value="endingSoon">終了が近い順</option>
                  <option value="popular">人気順</option>
                </select>
              </div>
              <div>
                <label htmlFor="carModel" className="mr-2">車種:</label>
                <select
                  id="carModel"
                  value={selectedCarModel}
                  onChange={(e) => setSelectedCarModel(e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="all">すべて</option>
                  <option value="ジムニーJB74">ジムニーJB74</option>
                  <option value="GRヤリスGXPA16前期型">GRヤリスGXPA16前期型</option>
                  <option value="GRヤリスMXPA12前期型">GRヤリスMXPA12前期型</option>
                  <option value="スイフトZC33">スイフトZC33</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              {designs.map((design) => (
                <DesignCard 
                  key={design.id} 
                  design={design} 
                  onReserve={handleReservation}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;