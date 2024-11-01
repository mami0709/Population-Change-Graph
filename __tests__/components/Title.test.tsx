import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Title } from '@/app/(home)/components/Title';

describe('Title', () => {
  test('タイトルが正しいテキストでレンダリングされる', () => {
    render(<Title />);
    const titleElement = screen.getByText('都道府県別人口推移グラフ');
    expect(titleElement).toBeInTheDocument();
  });

  test('タイトルに正しいスタイリングクラスが適用されている', () => {
    render(<Title />);
    const titleElement = screen.getByTestId('title-heading');
    expect(titleElement).toHaveClass(
      'text-lg md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 inline-flex items-center space-x-2'
    );
  });
});
