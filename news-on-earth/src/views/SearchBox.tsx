import React, { useState, ChangeEvent } from 'react';
import searchIcon from '../assets/search.svg';

interface SearchBoxProps {
	onSearchChange: (searchTerm: string) => void;
	onInputChange: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange, onInputChange }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm); // 入力変更をリアルタイム検知
		onInputChange(newSearchTerm); // 入力変更時に onInputChange 関数を呼び出す
		};

	const handleButtonClick = () => {
		onSearchChange(searchTerm); // ボタンクリック時に検索処理を実行
	};

	return (
		<div>
			<input
				type="text"
				placeholder="日本語でキーワードを入力"
				value={searchTerm}
				onChange={handleSearchChange}
                style={{
                    fontSize: '20px', // フォントサイズを大きくする
                    padding: '10px', // テキストボックス内のパディングを増やす
                    width: '300px', // テキストボックスの幅を指定する
                }}
			/>
			<button onClick={handleButtonClick}>
				<img src={searchIcon} alt="検索" width="20" height="20"/>
			</button>
		</div>
	);
};

export default SearchBox;
