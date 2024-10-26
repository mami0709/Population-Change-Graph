import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Header } from '@/components/Layouts/Header';
import { Footer } from '@/components/Layouts/Footer';

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

describe('RootLayoutContent', () => {
  const renderLayout = () =>
    render(
      <RootLayoutContent>
        <div>Test Content</div>
      </RootLayoutContent>
    );

  test('renders Header with correct text', () => {
    renderLayout();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('日本人口データマップ')).toBeInTheDocument();
  });

  test('renders Footer with correct text', () => {
    renderLayout();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/2024 NishinoApp/i)).toBeInTheDocument();
  });
});
