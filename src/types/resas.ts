// 都道府県
export interface Prefecture {
  prefCode: number;
  prefName: string;
}
export type Prefectures = Prefecture[];

// 人口系
export interface Population {
  boundaryYear: number;
  data: {
    label: string;
    data: PopulationData[];
  }[];
}

export interface PopulationData {
  year: number;
  value: number;
}

export const categories = {
  TOTAL: '総人口',
  YOUTH: '年少人口',
  WORKING_AGE: '生産年齢人口',
  ELDERLY: '老年人口',
} as const;
export type CategoryKey = keyof typeof categories;
