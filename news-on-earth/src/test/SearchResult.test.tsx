import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResult from '../views/SearchResult';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useLocation: () => ({
      state: {
        keyword: 'テストキーワード',
        articles: [
          {
            headline: 'テスト記事1',
            content: '内容1',
            source: 'source1',
            url: 'http://example.com/article1',
            urlToImage: 'http://example.com/image1.jpg',
            publishedAt: '2021-01-01T00:00:00Z'
          },
          // 他のダミー記事データを追加
        ]
      }
    })
  };
});


describe('SearchResult', () => {
  test('コンポーネントが正しくレンダリングされ、キーワードと記事が表示される', () => {
    render(
      <Router>
        <SearchResult />
      </Router>
    );

    // 指定されたキーワードが表示されることを確認
    expect(screen.getByText('テストキーワード')).toBeInTheDocument();

    // 記事のヘッドラインが表示されることを確認
    expect(screen.getByText('テスト記事1')).toBeInTheDocument();

  });

  // 追加のテストケース（記事の表示・非表示のトグル、記事の内容表示など）
});
