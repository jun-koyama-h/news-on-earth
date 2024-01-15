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

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: {
    source: { id: string, name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
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
  const [searchTerm, setSearchTerm] = useState<string>(''); // 検索ボックスの値を保持するステート

  //サジェストAPI
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

  // サジェストリストの項目がクリックされたときに呼び出される関数
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion); // 検索ボックスの値を更新
    handleSearch(suggestion); // 検索処理を実行
  };

  // 単一の記事を日本語に翻訳する関数
  async function translateArticle(article: Article): Promise<Article> {
    const response = await fetch('https://api.news-on-earth.workers.dev/api/translate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ translateText: article.content })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: TranslationResponse = await response.json();
    return {
      ...article,
      content: result.translated_text
    };
  }

  let translatedArticles: Article[] = [];

  //翻訳・NewsAPI
  const handleSearch = async (searchTerm: string) => {
    console.log('検索語:', searchTerm);

    //TODO:仮表示のため、削除
    // const hardcodedArticles: Article[] = [
    //   {
    //     headline: '固定記事の見出し1',
    //     content: '固定記事の内容1...',
    //     source: 'bbc(ex)',
    //   },
    //   {
    //     headline: '固定記事の見出し2',
    //     content: '固定記事の内容2...',
    //     source: 'cnn(ex)',
    //   },
    // ];
    //TODO:仮表示のため、削除
    
    try {
      //翻訳API：キーワードの日→英翻訳
      const translateResponse = await fetch('https://api.news-on-earth.workers.dev/api/translate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translateText: searchTerm })
      });

      if (!translateResponse.ok) {
        throw new Error(`HTTP error! status: ${translateResponse.status}`);
      }

      const translateResult: TranslationResponse = await translateResponse.json();
      console.log('翻訳結果:', translateResult.translated_text);
      
      //NewsAPI：記事の取得
      const newsResponse = await fetch('https://api.news-on-earth.workers.dev/api/news/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: translateResult.translated_text })
      });

      if (!newsResponse.ok) {
        throw new Error(`HTTP error! status: ${newsResponse.status}`);
      }

      const newsResult: NewsApiResponse = await newsResponse.json();
      console.log('取得記事:', newsResult.articles);

      const articles: Article[] = newsResult.articles.slice(0, 3).map(article => ({
        headline: article.title,
        content: article.content,
        source: article.source.name
      }));
      console.log('Article型の配列に格納',articles);

      //翻訳API：記事の英→日翻訳
      translatedArticles = await Promise.all(articles.map(translateArticle));
  
    } catch (error) {
      console.error('APIリクエストエラー:', error);
    }
    navigate('/SearchResult', { 
      state: { 
        keyword: searchTerm,
        articles: translatedArticles
      } 
    });
  };


  return (
    <div className={styles.container}>
      <Logo />
      <SearchBox onSearchChange={handleSearch} onInputChange={handleSearchChange} searchTerm={searchTerm} />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div> 
  );
};

export default SearchPage;
