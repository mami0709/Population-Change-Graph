import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '@/components/Layouts/Footer';

describe('Footer', () => {
  test('フッターの著作権メッセージが表示される', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(
      '© 2024 Pop Trends Japan. All rights reserved.'
    );
    expect(copyrightText).toBeInTheDocument();
  });

  test('SNSのリンクが正しく表示される', () => {
    render(<Footer />);

    // Twitter
    const twitterLink = screen.getByLabelText('Twitter');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');

    // Facebook
    const facebookLink = screen.getByLabelText('Facebook');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');

    // Instagram
    const instagramLink = screen.getByLabelText('Instagram');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
  });

  test('Footer クレジットメッセージが表示される', () => {
    render(<Footer />);
    const creditText = screen.getByText(
      'Crafted with care by Pop Trends Japan'
    );
    expect(creditText).toBeInTheDocument();
  });
});
