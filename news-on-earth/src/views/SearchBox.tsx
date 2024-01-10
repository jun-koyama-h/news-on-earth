import React, { useState, ChangeEvent } from 'react';
import searchIcon from '../assets/search.svg';

interface SearchBoxProps {
    onSearchChange: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleButtonClick = () => {
        onSearchChange(searchTerm);
    };

    const handleClearButtonClick = () => {
        setSearchTerm('');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="日本語でキーワードを入力"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    fontSize: '20px',
                    padding: '10px',
                    width: '300px',
                }}
            />
            {searchTerm && (
                <button onClick={handleClearButtonClick} style={{ marginLeft: '10px' }}>
                    ×
                </button>
            )}
            <button onClick={handleButtonClick} style={{ marginLeft: '10px' }}>
                <img src={searchIcon} alt="検索" width="20" height="20" />
            </button>
        </div>
    );
};

export default SearchBox;