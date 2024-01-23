import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import styles from './SearchPage.module.css';
import Logo from './Logo';
import LoadingModal from './LoadingModal.tsx';
import { API_TRANSLATE, API_TRANSLATE_ENGLISH, API_NEWS, API_SUGGEST, API_HEADERS } from '../constraints/constants.ts'

//型定義
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
  url: string;
  urlToImage: string;
  publishedAt: string;
}
//型定義ここまで

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>(''); // 検索中メッセージを保持するステート
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // 検索ボックスの値を保持するステート

  //サジェストAPI
  const handleSearchChange = async (searchTerm: string) => {
    try {
      if (searchTerm === '') {
        return;
      }
      const response = await fetch(API_SUGGEST, {
        method: 'POST',
        headers: API_HEADERS,
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
  };

  // サジェストリストの項目がクリックされたときに呼び出される関数
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion); // 検索ボックスの値を更新
    handleSearch(suggestion); // 検索処理を実行
  };

  // 単一の記事を日本語に翻訳する関数
  async function translateArticle(article: Article): Promise<Article> {
    // ヘッドラインの翻訳
    const headlineResponse = await fetch(API_TRANSLATE_ENGLISH, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({ translateText: article.headline })
    });
  
    if (!headlineResponse.ok) {
      throw new Error(`HTTP error! status: ${headlineResponse.status}`);
    }
  
    const headlineResult: TranslationResponse = await headlineResponse.json();
    const translatedHeadline = headlineResult.translated_text;
  
    // 内容の翻訳
    const contentResponse = await fetch(API_TRANSLATE_ENGLISH, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({ translateText: article.content })
    });
  
    if (!contentResponse.ok) {
      throw new Error(`HTTP error! status: ${contentResponse.status}`);
    }
  
    const contentResult: TranslationResponse = await contentResponse.json();
    const translatedContent = contentResult.translated_text;
  
    // 結合した翻訳結果を返す
    return {
      headline: translatedHeadline,
      content: translatedContent,
      source: article.source,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt
    };
  }
  

  //ソース毎に記事をフィルタリング & Article型の配列に格納する関数を定義
  function filterArticles(articles: NewsApiResponse['articles']): Article[] {
    const articleCountPerSource: Record<string, number> = {};
    const filteredArticles: Article[] = [];
    let totalArticles = 0;
  
    for (const article of articles) {
      if (totalArticles >= 10) break;
  
      const sourceId = article.source.id;
      articleCountPerSource[sourceId] = (articleCountPerSource[sourceId] || 0) + 1;
  
      if (articleCountPerSource[sourceId] <= 3) {
        // 'The Times of India' の場合、description を content に使用
        const content = article.source.name === 'The Times of India' ? article.description : article.content;
  
        filteredArticles.push({
          headline: article.title,
          content: content, // 修正された content を使用
          source: article.source.name,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt
        });
        totalArticles++;
      }
    }
  
    return filteredArticles;
  }
  

  //翻訳後の記事を格納する変数を定義
  let translatedArticles: Article[] = [];

  //翻訳・NewsAPI
  const handleSearch = async (searchTerm: string) => {
    console.log('検索語:', searchTerm);
    
    try {
      setLoading(true);
      setLoadingMessage('翻訳中...');
      //翻訳API：キーワードの日→英翻訳
      const translateResponse = await fetch(API_TRANSLATE, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ translateText: searchTerm })
      });

      if (!translateResponse.ok) {
        throw new Error(`HTTP error! status: ${translateResponse.status}`);
      }

      const translateResult: TranslationResponse = await translateResponse.json();
      console.log('翻訳結果:', translateResult.translated_text);
      
      //NewsAPI：記事の取得
      setLoadingMessage('記事取得中...');
      const newsResponse = await fetch(API_NEWS, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ q: translateResult.translated_text })
      });

      if (!newsResponse.ok) {
        throw new Error(`HTTP error! status: ${newsResponse.status}`);
      }

      const newsResult: NewsApiResponse = await newsResponse.json();
      console.log('取得記事:', newsResult.articles);

      const articles = filterArticles(newsResult.articles);
      console.log('フィルター・型変更済み記事', articles);

      //翻訳API：記事の英→日翻訳
      setLoadingMessage('記事翻訳中...');
      translatedArticles = await Promise.all(articles.map(translateArticle));
      console.log('翻訳記事', translatedArticles)
  
    } catch (error) {
      console.error('APIリクエストエラー:', error);
    } finally {
      setLoading(false);
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
      <LoadingModal loading={loading} message={loadingMessage} />
      <Logo width={500} height={200} />
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
