'use server';

import { Population, Prefectures } from '@/types/resas';

const BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';

interface ApiResponse<Result> {
  message: string | null;
  result: Result | null;
}

export const fetchResasApi = async <Result extends object>(
  url: string
): Promise<Result> => {
  const endpoint = `${BASE_URL}${url}`;

  const res = await fetch(endpoint, {
    headers: {
      'X-API-KEY': process.env.RESAS_API_KEY ?? '',
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${res.url}: ${res.status} ${res.statusText}`
    );
  }

  const data: ApiResponse<Result> = await res.json();

  if (data.message) {
    throw new Error(`API error occurred at ${res.url}: ${data.message}`);
  }

  if (!data.result) {
    throw new Error(
      `Result not found at ${res.url}: Response does not contain result field`
    );
  }

  return data.result;
};

/**
 * RESAS APIから都道府県一覧を取得する関数
 * @returns 都道府県一覧データ
 */
export const getPrefectures = async (): Promise<Prefectures> => {
  return await fetchResasApi<Prefectures>('/prefectures');
};

/**
 * 都道府県別の人口推移データを取得する関数
 * @param prefCode 都道府県コード
 * @returns 人口推移データ
 */
export const getPopulation = async (prefCode: number): Promise<Population> => {
  const url = `/population/composition/perYear?prefCode=${prefCode}`;
  return await fetchResasApi<Population>(url);
};
