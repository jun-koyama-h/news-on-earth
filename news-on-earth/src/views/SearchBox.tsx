import React, { useState, useEffect, ChangeEvent } from 'react';
import searchIcon from '../assets/search.svg';
import clearIcon from '../assets/clear.svg';

interface SearchBoxProps {
  onSearchChange: (searchTerm: string) => void;
  onInputChange: (searchTerm: string) => void;
  searchTerm: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange, onInputChange, searchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    if (newSearchTerm.endsWith(' ') || newSearchTerm.endsWith('　')) {
      onInputChange(newSearchTerm);
    }
  };

  const handleButtonClick = () => {
    onSearchChange(localSearchTerm);
  };

  const handleClearButtonClick = () => {
    setLocalSearchTerm('');
    onInputChange('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="日本語でキーワードを入力"
        value={localSearchTerm}
        onChange={handleSearchChange}
        style={{
          fontSize: '20px',
          padding: '10px',
          width: '300px',
        }}
      />
      {localSearchTerm && (
        <button
          onClick={handleClearButtonClick}
          style={{
            position: 'absolute',
            right: '50px', // 適切な位置に調整
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          <img src={clearIcon} alt="クリア" width="15" height="15" />
        </button>
      )}
      <button
        onClick={handleButtonClick}
        style={{
          position: 'absolute',
          right: '1px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 0,
        }}
      >
        <img src={searchIcon} alt="検索" width="20" height="20" />
      </button>
    </div>
  );
};

export default SearchBox;