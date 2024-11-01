import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/Layouts/Header';

describe('Header', () => {
  test('ヘッダーがレンダリングされ、タイトルが表示される', () => {
    render(<Header />);
    const titleElement = screen.getByText('Pop Trends Japan');
    expect(titleElement).toBeInTheDocument();
  });

  test('About と Contact のリンクが表示される', () => {
    render(<Header />);

    const aboutLink = screen.getByText('About');
    const contactLink = screen.getByText('Contact');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/');

    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/');
  });

  test('アイコンが表示される', () => {
    render(<Header />);
    const iconElement = screen.getByLabelText('map pin icon');
    expect(iconElement).toBeInTheDocument();
  });
});
