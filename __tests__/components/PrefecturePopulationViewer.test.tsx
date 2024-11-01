import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrefecturePopulationViewer } from '@/app/components/PrefecturePopulationViewer';
import { usePrefectureData } from '@/app/hooks/usePrefectureData';
import { PrefectureCheckboxes } from '@/app/components/PrefectureCheckboxes';
import { Tab } from '@/components/common/Tab';

jest.mock('@/app/hooks/usePrefectureData');

jest.mock('@/app/components/PrefectureCheckboxes', () => ({
  PrefectureCheckboxes: jest.fn(() => (
    <div data-testid="prefecture-checkboxes" />
  )),
}));

jest.mock('@/app/components/PopulationChart', () => ({
  PopulationChart: jest.fn(() => <div data-testid="population-chart" />),
}));

jest.mock('@/components/common/Tab', () => ({
  Tab: jest.fn(() => <div data-testid="tab" />),
}));

const mockUsePrefectureData = usePrefectureData as jest.MockedFunction<
  typeof usePrefectureData
>;

describe('PrefecturePopulationViewer', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];

  const defaultUsePrefectureDataReturnValue = {
    selectedPrefectures: [],
    selectedCategory: 'TOTAL' as const,
    handleCheckboxChange: jest.fn(),
    setSelectedCategory: jest.fn(),
    populationData: [],
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePrefectureData.mockReturnValue({
      ...defaultUsePrefectureDataReturnValue,
    });
  });

  test('初期状態でコンポーネントが正しくレンダリングされる', () => {
    render(<PrefecturePopulationViewer prefectures={mockPrefectures} />);

    expect(screen.getByTestId('prefecture-checkboxes')).toBeInTheDocument();
    expect(screen.getByTestId('tab')).toBeInTheDocument();
    expect(screen.getByTestId('population-chart')).toBeInTheDocument();

    expect(screen.queryByText('エラーメッセージ')).not.toBeInTheDocument();
  });

  test('エラーがある場合はエラーメッセージが表示され、グラフが表示されない', () => {
    mockUsePrefectureData.mockReturnValue({
      ...defaultUsePrefectureDataReturnValue,
      error: 'エラーメッセージ',
    });

    render(<PrefecturePopulationViewer prefectures={mockPrefectures} />);

    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();

    // PopulationChartが表示されていないことを確認
    expect(screen.queryByTestId('population-chart')).not.toBeInTheDocument();
  });

  test('都道府県を選択すると handleCheckboxChange が呼ばれる', () => {
    const mockHandleCheckboxChange = jest.fn();
    mockUsePrefectureData.mockReturnValue({
      ...defaultUsePrefectureDataReturnValue,
      handleCheckboxChange: mockHandleCheckboxChange,
    });

    render(<PrefecturePopulationViewer prefectures={mockPrefectures} />);

    // PrefectureCheckboxesのモックからpropsを取得
    const mockProps = (PrefectureCheckboxes as jest.Mock).mock.calls[0][0];

    // onCheckboxChangeを呼び出す
    mockProps.onCheckboxChange('北海道');

    expect(mockHandleCheckboxChange).toHaveBeenCalledWith('北海道');
  });

  test('タブをクリックすると setSelectedCategory が呼ばれる', () => {
    const mockSetSelectedCategory = jest.fn();
    mockUsePrefectureData.mockReturnValue({
      ...defaultUsePrefectureDataReturnValue,
      setSelectedCategory: mockSetSelectedCategory,
    });

    render(<PrefecturePopulationViewer prefectures={mockPrefectures} />);

    // Tabのモックからpropsを取得
    const mockProps = (Tab as jest.Mock).mock.calls[0][0];

    // onSelectCategoryを呼び出す
    mockProps.onSelectCategory('YOUTH');

    expect(mockSetSelectedCategory).toHaveBeenCalledWith('YOUTH');
  });
});
