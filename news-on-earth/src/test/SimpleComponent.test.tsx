import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleComponent from '../components/SimpleComponent';
import { describe, test, expect } from "@jest/globals";
import "@testing-library/jest-dom";

describe('SimpleComponent', () => {
  test('renders the correct content', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
  });
});