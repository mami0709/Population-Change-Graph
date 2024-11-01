import React from 'react';
import { Checkbox } from '@/components/common/Checkbox';

interface PrefectureCheckboxesProps {
  prefectures: { prefCode: number; prefName: string }[];
  selectedPrefectures: string[];
  onCheckboxChange: (prefName: string) => void;
}

export function PrefectureCheckboxes({
  prefectures,
  selectedPrefectures,
  onCheckboxChange,
}: PrefectureCheckboxesProps) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 md:grid-cols-8 text-[10px] sm:text-xs md:text-sm">
      {prefectures.map((prefecture) => (
        <Checkbox
          key={prefecture.prefCode}
          label={prefecture.prefName}
          checked={selectedPrefectures.includes(prefecture.prefName)}
          onChange={() => onCheckboxChange(prefecture.prefName)}
        />
      ))}
    </div>
  );
}
