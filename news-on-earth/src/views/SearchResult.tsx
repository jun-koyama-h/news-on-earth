import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation をインポート
import styles from '../styles/SearchResult.module.css';
import Map from './Map'; // Map コンポーネントをインポート

type Article = {
  headline: string;
  content: string;
  source: string;
};

const SearchResult: React.FC = () => {
  const location = useLocation();
  const [openArticleIndex, setOpenArticleIndex] = useState<number | null>(null);

  // location.state に基づいて型付けされた変数を作成
  const state = location.state as { keyword?: string; articles?: Article[] } | null;
  const keyword = state?.keyword ?? 'デフォルトキーワード';
  const articles = state?.articles ?? [];

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
                <span className={styles.source}>{article.source}</span>
                <span className={styles.icon}>
                  {openArticleIndex === index ? '▲' : '▼'}
                </span>
              </div>
              {openArticleIndex === index && (
                <div className={styles.cardContent}>
                  <p className={styles.content}>{article.content}</p>
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

export default SearchResult;
