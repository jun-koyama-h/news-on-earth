import React, { useState } from 'react';
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

const SearchResult: React.FC<SearchResultProps> = ({ keyword, articles = [] }) => {
  const [openArticleIndex, setOpenArticleIndex] = useState<number | null>(null);

  const toggleArticle = (index: number) => {
    setOpenArticleIndex(openArticleIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.keyword}>
          <h2>{keyword}</h2>
        </div>
        <ul className={styles.articles}>
          {articles.map((article, index) => (
            <li key={index} className={styles.article}>
              <h3 onClick={() => toggleArticle(index)} className={styles.headline}>
                {article.headline}
                <span className={styles.icon}>
                  {openArticleIndex === index ? '▲' : '▼'}
                </span>
              </h3>
              {openArticleIndex === index && (
                <p className={styles.content}>{article.content}</p>
              )}
            </li>
          ))}
        </ul>
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
