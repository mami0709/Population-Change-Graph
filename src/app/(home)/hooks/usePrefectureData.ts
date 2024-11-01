'use client';

import { useState, useEffect } from 'react';
import { usePrefectureSelection } from '@/app/(home)/hooks/usePrefectureSelection';
import { getPopulation } from '@/lib/resasService';
import { CategoryKey, Population, Prefecture } from '@/types/resas';

interface UsePrefectureDataProps {
  prefectures: Prefecture[];
}

/**
 * 都道府県リストから選択された都道府県の人口データを取得し、カテゴリ別にデータを管理するためのフック。
 *
 * @param {Prefecture[]} props.prefectures - 都道府県リスト（コードと名前を含むオブジェクトの配列）。
 *
 * @returns {object} - フックが返すオブジェクト。
 */
export function usePrefectureData({ prefectures }: UsePrefectureDataProps) {
  const { selectedPrefectures, handleCheckboxChange } =
    usePrefectureSelection();

  const [populationData, setPopulationData] = useState<
    { data: Population; prefName: string }[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>('TOTAL');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedPrefCodes = prefectures
      .filter((pref) => selectedPrefectures.includes(pref.prefName))
      .map((pref) => pref.prefCode);

    if (selectedPrefCodes.length > 0) {
      Promise.all(
        selectedPrefCodes.map(async (code) => {
          const population = await getPopulation(code);
          const prefName = prefectures.find(
            (pref) => pref.prefCode === code
          )?.prefName;
          return { data: population, prefName: prefName || '' };
        })
      )
        .then((data) => {
          setPopulationData(data);
          setError(null);
        })
        .catch((error) => {
          console.error('エラー:', error);
          setError('データの取得中にエラーが発生しました。');
          setPopulationData(null);
        });
    } else {
      setPopulationData([]);
    }
  }, [selectedPrefectures, prefectures]);

  return {
    selectedPrefectures,
    handleCheckboxChange,
    populationData,
    selectedCategory,
    setSelectedCategory,
    error,
  };
}
