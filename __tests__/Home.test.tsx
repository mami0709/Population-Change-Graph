import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Home from '@/app/page';

test('renders the title text', () => {
  render(<Home />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'タイトル'
  );
});
