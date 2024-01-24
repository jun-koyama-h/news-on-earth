import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPage from '../views/SearchPage'; 
import * as Constants from '../constraints/constants';

// fetchのモック
global.fetch = jest.fn();

describe('SearchPage component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches suggestions on input change', async () => {
    // サジェストAPIのモックレスポンス
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'mocked suggestion response' }),
    });

    render(<SearchPage />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(Constants.API_SUGGEST, expect.anything());
    });
  });

  it('translates search term and fetches news', async () => {
    // 翻訳APIのモックレスポンス
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ translated_text: 'translated term' }),
    });

    // ニュースAPIのモックレスポンス
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: [{ title: 'Test Article', content: 'Test Content' }] }),
    });

    render(<SearchPage />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(Constants.API_TRANSLATE, expect.anything());
      expect(fetch).toHaveBeenCalledWith(Constants.API_NEWS, expect.anything());
    });
  });

});
