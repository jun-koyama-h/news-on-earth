// src/NewsList.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Test: React.FC = () => {
  const [testData, setTestData] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.news-on-earth.workers.dev/api/');
      setTestData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>API テストページ</h1>
      {testData ? (
        <div>
          <p>{testData}</p>
        </div>
      ) : (
        <button onClick={fetchData}>API Test</button>
      )}
    </div>
  );
};

export default Test;
