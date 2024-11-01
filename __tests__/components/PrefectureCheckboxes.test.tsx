import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrefectureCheckboxes } from '@/app/(home)/components/PrefectureCheckboxes';

describe('PrefectureCheckboxes', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];

  let onCheckboxChange: jest.Mock;

  beforeEach(() => {
    onCheckboxChange = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (selectedPrefectures: string[] = []) => {
    render(
      <PrefectureCheckboxes
        prefectures={mockPrefectures}
        selectedPrefectures={selectedPrefectures}
        onCheckboxChange={onCheckboxChange}
      />
    );
    const hokkaidoCheckbox = screen.getByLabelText(
      '北海道'
    ) as HTMLInputElement;
    const aomoriCheckbox = screen.getByLabelText('青森県') as HTMLInputElement;
    return { hokkaidoCheckbox, aomoriCheckbox };
  };

  test('各都道府県のチェックボックスがレンダリングされる', () => {
    const { hokkaidoCheckbox, aomoriCheckbox } = renderComponent();

    expect(hokkaidoCheckbox).toBeInTheDocument();
    expect(aomoriCheckbox).toBeInTheDocument();

    expect(hokkaidoCheckbox.checked).toBe(false);
    expect(aomoriCheckbox.checked).toBe(false);
  });

  test('チェックボックスをクリックすると正しい都道府県名でonCheckboxChangeが呼ばれる', () => {
    const { hokkaidoCheckbox, aomoriCheckbox } = renderComponent();

    fireEvent.click(hokkaidoCheckbox);
    expect(onCheckboxChange).toHaveBeenCalledWith('北海道');

    fireEvent.click(aomoriCheckbox);
    expect(onCheckboxChange).toHaveBeenCalledWith('青森県');
  });

  test('selectedPrefecturesに含まれる都道府県はチェックが入った状態で表示される', () => {
    const { hokkaidoCheckbox, aomoriCheckbox } = renderComponent(['北海道']);

    expect(hokkaidoCheckbox.checked).toBe(true);
    expect(aomoriCheckbox.checked).toBe(false);
  });
});
