import React from 'react';
import SearchBox from './SearchBox';

const SearchPage: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log('検索語:', searchTerm);
    // API呼び出し
  };
  
  return (
    <div>
      <h1>ここに検索ページを書きます。</h1>
      <SearchBox onSearchChange={handleSearch} />
    </div>
  );
};

export default SearchPage;
