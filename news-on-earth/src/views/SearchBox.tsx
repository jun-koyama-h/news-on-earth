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
		console.log("input : " + newSearchTerm);
		setLocalSearchTerm(newSearchTerm); // 内部状態を更新
		if (newSearchTerm.endsWith(' ')) {
			onInputChange(newSearchTerm); // 入力変更時に onInputChange 関数を呼び出す
		}
	};

	const handleButtonClick = () => {
		onSearchChange(localSearchTerm); // ボタンクリック時に検索処理を実行
	};

	return (
		<div>
			<input
				type="text"
				placeholder="日本語でキーワードを入力"
				value={localSearchTerm}
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
