import React from 'react';
import styles from './SearchResult.module.css';
import Map from './Map'; // Map コンポーネントをインポート

type SearchResultProps = {
  keyword?: string;
  headlines?: string[];
};

const SearchResult: React.FC<SearchResultProps> = ({ keyword, headlines = [] }) => {
  return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <div className={styles.keyword}>
                    <h2>{keyword}</h2>
                </div>
                <ul className={styles.headlines}>
                    {headlines.map((headline, index) => (
                        <li key={index}>{headline}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.rightPanel}>
                <Map /> {/* Map コンポーネントを埋め込み */}
            </div>
        </div>
    );
};

// デフォルトPropsを定義
SearchResult.defaultProps = {
  keyword: 'ガザ',
  headlines: ['ガザ決議案の採決、国連安保理が再び延期']
};

export default SearchResult;
