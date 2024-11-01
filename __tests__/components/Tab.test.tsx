import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tab } from '@/components/common/Tab';
import { categories, CategoryKey } from '@/types/resas';

describe('Tab', () => {
  const defaultSelectedCategory: CategoryKey = 'TOTAL';

  const renderComponent = (
    selectedCategory: CategoryKey = defaultSelectedCategory
  ) => {
    render(
      <Tab selectedCategory={selectedCategory} onSelectCategory={() => {}} />
    );
  };

  test('全てのカテゴリタブがレンダリングされる', () => {
    renderComponent();

    (Object.keys(categories) as CategoryKey[]).forEach((key) => {
      const button = screen.getByText(categories[key]);
      expect(button).toBeInTheDocument();
    });
  });

  test('選択されたカテゴリタブが強調表示される', () => {
    renderComponent();

    const selectedButton = screen.getByText(
      categories[defaultSelectedCategory]
    );
    expect(selectedButton).toHaveClass(
      'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md'
    );
  });
});
