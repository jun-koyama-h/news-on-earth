import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBox from '../views/SearchBox';

describe('SearchBox', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnInputChange = jest.fn();
  const searchTerm = 'test';

  beforeEach(() => {
    render(<SearchBox onSearchChange={mockOnSearchChange} onInputChange={mockOnInputChange} searchTerm={searchTerm} />);
  });

  test('renders the search box with the correct initial value', () => {
    const inputElement = screen.getByPlaceholderText('日本語でキーワードを入力');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(searchTerm);
  });

  test('calls onInputChange when text is input', () => {
    const inputElement = screen.getByPlaceholderText('日本語でキーワードを入力');
    fireEvent.change(inputElement, { target: { value: 'new term ' } });
    expect(mockOnInputChange).toHaveBeenCalledWith('new term ');
  });

  test('calls onSearchChange when search button is clicked', () => {
    const searchButton = screen.getByAltText('検索');
    fireEvent.click(searchButton);
    expect(mockOnSearchChange).toHaveBeenCalledWith(searchTerm);
  });

});
