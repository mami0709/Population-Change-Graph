import React from 'react';
import { categories, CategoryKey } from '@/types/resas';

interface TabProps {
  selectedCategory: CategoryKey;
  onSelectCategory: (category: CategoryKey) => void;
}

export function Tab({ selectedCategory, onSelectCategory }: TabProps) {
  return (
    <div className="flex justify-center border-b border-gray-200 space-x-4 md:space-x-6 mt-5 md:mt-6">
      {(Object.keys(categories) as CategoryKey[]).map((key) => (
        <button
          key={key}
          onClick={() => onSelectCategory(key)}
          className={`px-3 py-1.5 rounded-lg text-sm md:text-base transition-colors duration-300 ${
            selectedCategory === key
              ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md'
              : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'
          }`}
        >
          {categories[key]}
        </button>
      ))}
    </div>
  );
}
