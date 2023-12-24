import React, { useState, ChangeEvent } from 'react';

interface SearchBoxProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = () => {
    onSearchChange(searchTerm); // ボタンクリック時に検索処理を実行
  };

  return (
    <div>
      <input
        type="text"
        placeholder="検索..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleButtonClick}>検索</button> {/* 検索ボタンを追加 */}
    </div>
  );
};

export default SearchBox;
