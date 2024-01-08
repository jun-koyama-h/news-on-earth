import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation をインポート
import styles from './SearchResult.module.css';
import Map from './Map'; // Map コンポーネントをインポート

type Article = {
  headline: string;
  content: string;
};

type SearchResultProps = {
  keyword?: string;
  articles?: Article[];
};

const SearchResult: React.FC = () => {
  const location = useLocation();
  const [openArticleIndex, setOpenArticleIndex] = useState<number | null>(null);

  const state = location.state as { keyword: string; articles: Article[] };
  const { keyword, articles } = state;  

  const toggleArticle = (index: number) => {
    setOpenArticleIndex(openArticleIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.keyword}>
          <h2>{keyword}</h2>
        </div>
        <div className={styles.articles}>
          {articles.map((article, index) => (
            <div key={index} className={styles.article}>
              <div onClick={() => toggleArticle(index)} className={styles.cardHeader}>
                <h3 className={styles.headline}>{article.headline}</h3>
                <span className={styles.icon}>
                  {openArticleIndex === index ? '▲' : '▼'}
                </span>
              </div>
              {openArticleIndex === index && (
                <div className={styles.cardContent}>
                  <p>{article.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rightPanel}>
        <Map />
      </div>
    </div>
  );
};

// デフォルトPropsを定義
SearchResult.defaultProps = {
  keyword: 'ガザ',
  articles: [
    {
      headline: 'ガザ決議案の採決、見出し1',
      content: 'ガザ決議案の採決についての詳細な本文1。ガザ決議案の採決についての詳細な本文1。ガザ決議案の採決についての詳細な本文1。ガザ決議案の採決についての詳細な本文1。ガザ決議案の採決についての詳細な本文1。'
    },
    {
      headline: 'ガザに関する国際会議、見出し2',
      content: 'ガザに関する国際会議の詳細報告、本文2。ガザに関する国際会議の詳細報告、本文2。ガザに関する国際会議の詳細報告、本文2。ガザに関する国際会議の詳細報告、本文2。ガザに関する国際会議の詳細報告、本文2。'
    },
    {
      headline: '地域の平和維持活動、見出し3',
      content: '地域の平和維持活動に関する最新の動き、本文3。地域の平和維持活動に関する最新の動き、本文3。地域の平和維持活動に関する最新の動き、本文3。地域の平和維持活動に関する最新の動き、本文3。地域の平和維持活動に関する最新の動き、本文3。'
    }
  ]
};

export default SearchResult;
