import React from 'react';
import SearchBox from './SearchBox';
import Logo from './Logo';

const SearchPage: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log('検索語:', searchTerm);
    // API呼び出し
  };
  
  return (
    <div>
      <SearchBox onSearchChange={handleSearch} />
      <Logo />
    </div> 
  );
};

export default SearchPage;
