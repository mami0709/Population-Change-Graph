import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';

export function Title() {
  return (
    <div className="text-center my-6">
      <h2
        data-testid="title-heading"
        className="text-lg md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 inline-flex items-center space-x-2"
      >
        <FiBarChart2 className="text-blue-500" />
        <span>都道府県別人口推移グラフ</span>
      </h2>
      <div className="mt-2 border-b-2 border-blue-300 w-1/3 mx-auto" />
    </div>
  );
}
