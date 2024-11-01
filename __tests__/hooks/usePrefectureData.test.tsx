import { renderHook, act, waitFor } from '@testing-library/react';
import { usePrefectureData } from '@/app/hooks/usePrefectureData';
import { getPopulation } from '@/lib/resasService';
import { Prefecture, Population } from '@/types/resas';

jest.mock('@/lib/resasService');

const mockGetPopulation = getPopulation as jest.MockedFunction<
  typeof getPopulation
>;

describe('usePrefectureData', () => {
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];

  const mockPopulationData: Population = {
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1980, value: 1000000 },
          { year: 1990, value: 1100000 },
        ],
      },
    ],
  };

  // テスト中のconsole.errorを抑制
  beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
  // console.errorのモックをリストア
  afterAll(() => (console.error as jest.Mock).mockRestore());
  // 各テスト前にモックをクリア
  beforeEach(() => jest.clearAllMocks());

  const setupHook = () =>
    renderHook(() => usePrefectureData({ prefectures: mockPrefectures }));

  test('選択された都道府県の人口データが正しく取得される', async () => {
    mockGetPopulation.mockResolvedValue(mockPopulationData);
    const { result } = setupHook();

    act(() => result.current.handleCheckboxChange('北海道'));

    await waitFor(() => {
      expect(result.current.populationData).toEqual([
        { data: mockPopulationData, prefName: '北海道' },
      ]);
    });
    expect(result.current.error).toBeNull();
  });

  test('複数の都道府県を選択した場合でも、人口データが正しく取得される', async () => {
    mockGetPopulation.mockResolvedValue(mockPopulationData);
    const { result } = setupHook();

    act(() => {
      result.current.handleCheckboxChange('北海道');
      result.current.handleCheckboxChange('青森県');
    });

    await waitFor(() => {
      expect(result.current.populationData).toEqual([
        { data: mockPopulationData, prefName: '北海道' },
        { data: mockPopulationData, prefName: '青森県' },
      ]);
    });
    expect(result.current.error).toBeNull();
  });

  test('選択されたカテゴリが正しく更新される', () => {
    const { result } = setupHook();
    expect(result.current.selectedCategory).toBe('TOTAL');

    act(() => result.current.setSelectedCategory('YOUTH'));

    expect(result.current.selectedCategory).toBe('YOUTH');
  });

  test('チェックボックスの選択が解除された場合、人口データが更新される', async () => {
    mockGetPopulation.mockResolvedValue(mockPopulationData);
    const { result } = setupHook();

    act(() => result.current.handleCheckboxChange('北海道'));
    await waitFor(() => expect(result.current.populationData?.length).toBe(1));

    act(() => result.current.handleCheckboxChange('北海道'));
    await waitFor(() => expect(result.current.populationData).toEqual([]));
    expect(result.current.error).toBeNull();
  });

  test('APIエラー時にerrorがセットされる', async () => {
    mockGetPopulation.mockRejectedValue(new Error('API Error'));
    const { result } = setupHook();

    act(() => result.current.handleCheckboxChange('北海道'));

    await waitFor(() => {
      expect(result.current.error).toBe(
        'データの取得中にエラーが発生しました。'
      );
    });
    expect(result.current.populationData).toBeNull();
  });
});
