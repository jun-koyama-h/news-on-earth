import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation をインポート
import styles from './SearchResult.module.css';
import Map from './Map'; // Map コンポーネントをインポート

type Article = {
  headline: string;
  content: string;
  source: string;
};

// `value`フィールドのための型
interface Location {
  longitude: string;
  latitude: string;
}

// KV APIの返却値全体のための型
interface KVApiResponseItem {
  key: string;
  value: string; // JSON文字列としてのLocation
}

// KV APIの返却値全体を表す配列のための型
type KVApiResponse = KVApiResponseItem[];


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

    // sourceをクリックしたときに呼び出される関数
    const handleSourceClick = async (source: string) => {
      console.log('KVAPI:', source);

      try {
        // KVからメディアの地図情報を取得
        const kvResponse = await fetch('https://api.news-on-earth.workers.dev/api/kv/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        if (!kvResponse.ok) {
          throw new Error(`HTTP error! status: ${kvResponse.status}`);
        }
      
        const kvResult: KVApiResponse = await kvResponse.json();
      // 位置情報の処理など
      console.log('KV APIの応答:', kvResult);
      
      // sourceと一致するアイテムを見つける
      const matchingItem = kvResult.find(item => item.key === source);
      if (matchingItem) {
        try {
          // value の JSON 文字列を適切に解析する
          const locationInfo: Location = JSON.parse(matchingItem.value.replace(/\\/g, ""));
          console.log(`位置情報 (${source}):`, locationInfo);
        } catch (parseError) {
          console.error(`JSON解析エラー (${source}):`, matchingItem.value);
        }
      } else {
        console.log(`位置情報が見つかりませんでした (${source})`);
      }
      

        
      } catch (error) {
        console.error('APIリクエストエラー:', error);
      }
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
                <span 
                  className={styles.source}
                  onClick={() => handleSourceClick(article.source)}
                >
                  {article.source}
                </span>
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
