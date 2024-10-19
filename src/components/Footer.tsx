import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">会社情報</h3>
            <p>車のメーターパネル専門会社</p>
            <p>〒123-4567 東京都渋谷区...</p>
            <p>電話: 03-1234-5678</p>
            <p>メール: info@meterpanel.co.jp</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">リンク</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-300">ホーム</a></li>
              <li><a href="#" className="hover:text-gray-300">デザイン一覧</a></li>
              <li><a href="#" className="hover:text-gray-300">予約方法</a></li>
              <li><a href="#" className="hover:text-gray-300">お問い合わせ</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">ニュースレター登録</h3>
            <p className="mb-4">最新のデザインや特別オファーをお届けします。</p>
            <form className="flex">
              <input type="email" placeholder="メールアドレス" className="flex-grow px-3 py-2 text-gray-700 rounded-l" />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors">
                登録
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 メーターパネル専門会社. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;