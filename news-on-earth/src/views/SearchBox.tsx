import React, { useState, useEffect, ChangeEvent } from 'react';
import searchIcon from '../assets/search.svg';

interface SearchBoxProps {
	onSearchChange: (searchTerm: string) => void;
	onInputChange: (searchTerm: string) => void;
	searchTerm: string; // searchTerm プロパティを追加
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange, onInputChange, searchTerm }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

	useEffect(() => {
    setLocalSearchTerm(searchTerm); // 外部から searchTerm が変更されたときに内部状態を更新
	}, [searchTerm]);
  

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value;
		setLocalSearchTerm(newSearchTerm); // 内部状態を更新

		onInputChange(newSearchTerm); // 入力変更時に onInputChange 関数を呼び出す
		};

	const handleButtonClick = () => {
		onSearchChange(localSearchTerm); // ボタンクリック時に検索処理を実行
	};

    return (
        <div style={{ position: 'relative', width: '300px' }}>
            <input
                type="text"
                placeholder="日本語でキーワードを入力"
                value={localSearchTerm}
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