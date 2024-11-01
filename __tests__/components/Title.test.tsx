import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Title } from '@/app/components/Title';

describe('Title', () => {
  test('タイトルが正しいテキストでレンダリングされる', () => {
    render(<Title />);
    const titleElement = screen.getByText('都道府県別人口推移グラフ');
    expect(titleElement).toBeInTheDocument();
  });

  test('タイトルに正しいスタイリングクラスが適用されている', () => {
    render(<Title />);
    const titleElement = screen.getByText('都道府県別人口推移グラフ');
    expect(titleElement).toHaveClass(
      'text-xl md:text-2xl font-semibold text-gray-900 border-b-4 border-blue-500 pb-1.5 inline-block'
    );
  });
});
