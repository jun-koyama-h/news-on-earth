import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleComponent from '../components/SimpleComponent';

describe('SimpleComponent', () => {
  test('renders the correct content', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
  });
});