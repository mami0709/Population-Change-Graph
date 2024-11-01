'use client';

import { useState } from 'react';

/**
 * 都道府県の選択を管理するカスタムフック。
 *
 * @returns {object} 選択されている都道府県名と選択状態を切り替える関数。
 */
export function usePrefectureSelection() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);

  const handleCheckboxChange = (prefecture: string) => {
    setSelectedPrefectures((prev) =>
      prev.includes(prefecture)
        ? prev.filter((p) => p !== prefecture)
        : [...prev, prefecture]
    );
  };

  return { selectedPrefectures, handleCheckboxChange };
}
