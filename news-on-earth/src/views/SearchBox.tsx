import React, { useState, ChangeEvent } from 'react';

interface SearchBoxProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="検索..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBox;
