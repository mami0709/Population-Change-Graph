'use client';

import React, { Suspense } from 'react';
import { Checkbox } from '@/components/common/Checkbox';
import { PopulationChart } from '@/app/components/PopulationChart';
import { Tab } from '@/components/common/Tab';
import { categories } from '@/types/resas';
import { usePrefectureData } from '@/app/hooks/usePrefectureData';
import { Loading } from '@/components/common/Loading';

interface PrefecturePopulationViewerProps {
  prefectures: { prefCode: number; prefName: string }[];
}

export function PrefecturePopulationViewer({
  prefectures,
}: PrefecturePopulationViewerProps) {
  const {
    selectedPrefectures,
    handleCheckboxChange,
    populationData,
    selectedCategory,
    setSelectedCategory,
    error,
  } = usePrefectureData({ prefectures });

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 md:grid-cols-8 text-[10px] sm:text-xs md:text-sm">
        {prefectures.map((prefecture) => (
          <Checkbox
            key={prefecture.prefCode}
            label={prefecture.prefName}
            checked={selectedPrefectures.includes(prefecture.prefName)}
            onChange={() => handleCheckboxChange(prefecture.prefName)}
          />
        ))}
      </div>

      <Tab
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {error ? (
        <div className="text-red-500 text-center my-4 mt-4">{error}</div>
      ) : (
        <div className="my-4">
          <Suspense fallback={<Loading />}>
            <PopulationChart
              data={populationData || []}
              category={categories[selectedCategory]}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
