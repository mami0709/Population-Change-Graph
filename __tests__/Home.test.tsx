import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { getPrefectures } from '@/lib/resasService';
import { PrefecturePopulationViewer } from '@/app/components/PrefecturePopulationViewer';

jest.mock('@/lib/resasService');
const mockGetPrefectures = getPrefectures as jest.MockedFunction<
  typeof getPrefectures
>;

jest.mock('@/app/components/Title', () => ({
  Title: jest.fn(() => <div data-testid="title" />),
}));

jest.mock('@/app/components/PrefecturePopulationViewer', () => ({
  PrefecturePopulationViewer: jest.fn(() => <div data-testid="viewer" />),
}));

describe('Home', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Title と PrefecturePopulationViewer が正しくレンダリングされる', async () => {
    mockGetPrefectures.mockResolvedValue(mockPrefectures);

    const HomeComponent = await Home();
    render(HomeComponent);

    expect(mockGetPrefectures).toHaveBeenCalled();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('viewer')).toBeInTheDocument();

    // PrefecturePopulationViewer に渡された props を検証
    const mockProps = (PrefecturePopulationViewer as jest.Mock).mock
      .calls[0][0];

    expect(mockProps.prefectures).toEqual(mockPrefectures);
  });
});
