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
        <div style={{ position: 'relative', width: '300px' }}>
            <input
                type="text"
                placeholder="日本語でキーワードを入力"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    fontSize: '20px',
                    padding: '10px',
                    width: '100%',
                    paddingRight: '40px', // Space for the icon and clear button
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <button
                    onClick={handleClearButtonClick}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '5px',
                        visibility: searchTerm ? 'visible' : 'hidden',
                    }}
                >
                    ×
                </button>
                <button
                    onClick={handleButtonClick}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <img src={searchIcon} alt="検索" width="20" height="20" />
                </button>
            </div>
        </div>
    );
};

export default SearchBox;