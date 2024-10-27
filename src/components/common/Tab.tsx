import React from 'react';
import { categories, CategoryKey } from '@/types/resas';

interface TabProps {
  selectedCategory: CategoryKey;
  onSelectCategory: (category: CategoryKey) => void;
}

export function Tab({ selectedCategory, onSelectCategory }: TabProps) {
  return (
    <div className="flex justify-center border-b border-gray-300 space-x-3 md:space-x-6 mt-3 md:mt-4">
      {(Object.keys(categories) as CategoryKey[]).map((key) => (
        <button
          key={key}
          onClick={() => onSelectCategory(key)}
          className={`px-2 py-1 text-xs text-gray-500 ${
            selectedCategory === key
              ? 'text-black font-semibold border-b-2 border-blue-500'
              : 'hover:text-black'
          } md:px-3 md:py-1.5 md:text-base`}
        >
          {categories[key]}
        </button>
      ))}
    </div>
  );
}
