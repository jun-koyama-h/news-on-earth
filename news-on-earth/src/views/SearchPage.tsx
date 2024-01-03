import React from 'react';
import SearchBox from './SearchBox';
import Background from './Background';

const SearchPage: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log('検索語:', searchTerm);
    // API呼び出し
  };
  
  return (
    <div>
      <SearchBox onSearchChange={handleSearch} />
      <Background />
    </div> 
  );
};

export default SearchPage;
