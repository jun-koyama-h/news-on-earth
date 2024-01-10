import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate をインポート
import SearchBox from '../components/SearchBox';
import styles from '../styles/SearchPage.module.css';
import Logo from '../components/Logo';

interface TranslationResponse {
  translated_text: string;
}

interface Article {
  headline: string;
  content: string;
  source: string;
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate フックの初期化
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
      <SearchBox onSearchChange={handleSearch} />
    </div> 
  );
};

export default SearchPage;
