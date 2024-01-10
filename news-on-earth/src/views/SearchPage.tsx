import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import styles from './SearchPage.module.css';
import Logo from './Logo';

interface SuggestApiResponse {
  response: string;
}

interface TranslationResponse {
  translated_text: string;
}

interface Article {
  headline: string;
  content: string;
  source: string;
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  const handleSearchChange = async (searchTerm: string) => {
    // 既存のタイマーをクリア
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // 新しいタイマーを設定
    const newTimer = setTimeout(async () => {
      try {
        const response = await fetch('https://api.news-on-earth.workers.dev/api/suggest/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keyword: searchTerm })
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result: SuggestApiResponse = await response.json();
  
        // 正規表現を使用して必要なテキストを抽出
        const regex = /\n\d\.\s([^\s]+)\s\(/g;
  
        const suggestionsText = [];
        let match;
        while ((match = regex.exec(result.response)) !== null) {
          suggestionsText.push(match[1]);
        }
    
        console.log('生成AIの結果:', suggestionsText);
        setSuggestions(suggestionsText);
    
      } catch (error) {
        console.error('APIリクエストエラー:', error);
        setSuggestions([]);
      }
    }, 500); // 500ミリ秒の遅延

    setDebounceTimer(newTimer);

  };

  const handleSearch = async (searchTerm: string) => {
    console.log('検索語:', searchTerm);

    const hardcodedArticles: Article[] = [
      {
        headline: '固定記事の見出し1',
        content: '固定記事の内容1...',
        source: 'BBC',
      },
      {
        headline: '固定記事の見出し2',
        content: '固定記事の内容2...',
        source: 'WSJ',
      },
      // 他の固定記事
    ];
    
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
    navigate('/SearchResult', { 
      state: { 
        keyword: searchTerm, // searchTerm または 'サンプル検索キーワード' を渡す
        articles: hardcodedArticles // 検索結果の固定記事を渡す
      } 
    });
  };

  return (
    <div className={styles.container}>
      <Logo />
      <SearchBox onSearchChange={handleSearch} onInputChange={handleSearchChange} />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSearch(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div> 
  );
};

export default SearchPage;
