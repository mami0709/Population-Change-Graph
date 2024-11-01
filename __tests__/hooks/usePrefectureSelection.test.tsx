import { renderHook, act } from '@testing-library/react';
import { usePrefectureSelection } from '@/app/hooks/usePrefectureSelection';

describe('usePrefectureSelection', () => {
  const setupHook = () => renderHook(() => usePrefectureSelection());

  test('初期状態でselectedPrefecturesは空配列である', () => {
    const { result } = setupHook();
    expect(result.current.selectedPrefectures).toEqual([]);
  });

  test('handleCheckboxChangeで都道府県を選択するとselectedPrefecturesに追加される', () => {
    const { result } = setupHook();

    act(() => result.current.handleCheckboxChange('北海道'));

    expect(result.current.selectedPrefectures).toEqual(['北海道']);
  });

  test('handleCheckboxChangeで既に選択された都道府県を再度選択するとselectedPrefecturesから削除される', () => {
    const { result } = setupHook();

    act(() => result.current.handleCheckboxChange('北海道'));
    expect(result.current.selectedPrefectures).toEqual(['北海道']);

    act(() => result.current.handleCheckboxChange('北海道'));
    expect(result.current.selectedPrefectures).toEqual([]);
  });

  test('複数の都道府県を選択・解除できる', () => {
    const { result } = setupHook();

    act(() => {
      result.current.handleCheckboxChange('北海道');
      result.current.handleCheckboxChange('青森県');
      result.current.handleCheckboxChange('岩手県');
    });
    expect(result.current.selectedPrefectures).toEqual([
      '北海道',
      '青森県',
      '岩手県',
    ]);

    act(() => result.current.handleCheckboxChange('青森県'));
    expect(result.current.selectedPrefectures).toEqual(['北海道', '岩手県']);
  });
});
