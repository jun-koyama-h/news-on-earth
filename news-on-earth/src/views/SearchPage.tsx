import React from 'react';
import SearchBox from './SearchBox';
import Logo from './Logo';

interface TranslationResponse {
  translated_text: string;
}

const SearchPage: React.FC = () => {
  const handleSearch = async (searchTerm: string) => {
    console.log('検索語:', searchTerm);

    try {
      const response = await fetch('https://api.news-on-earth.workers.dev/api/translate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translateText: searchTerm })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: TranslationResponse = await response.json();
      console.log('翻訳結果:', result.translated_text);
    } catch (error) {
      console.error('APIリクエストエラー:', error);
    }
  };

  return (
    <div>
      <SearchBox onSearchChange={handleSearch} />
      <Logo />
    </div> 
  );
};

export default SearchPage;
