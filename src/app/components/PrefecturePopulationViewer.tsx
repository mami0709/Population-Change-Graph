'use client';

import React, { Suspense } from 'react';
import { PopulationChart } from '@/app/components/PopulationChart';
import { PrefectureCheckboxes } from '@/app/components/PrefectureCheckboxes';
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
      <PrefectureCheckboxes
        prefectures={prefectures}
        selectedPrefectures={selectedPrefectures}
        onCheckboxChange={handleCheckboxChange}
      />

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
