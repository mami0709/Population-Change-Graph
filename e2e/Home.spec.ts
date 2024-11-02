import { test, expect } from '@playwright/test';

test.describe('Homeページのテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('タイトルが正しく表示されることを確認', async ({ page }) => {
    await expect(page.getByText('都道府県別人口推移グラフ')).toBeVisible();
  });

  test('タブが正しく表示されることを確認', async ({ page }) => {
    const tabs = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
    for (const tabName of tabs) {
      await expect(page.getByRole('button', { name: tabName })).toBeVisible();
    }
  });

  test('都道府県のチェックボックスが正しく表示されることを確認', async ({
    page,
  }) => {
    const prefectures = ['北海道', '青森県', '岩手県'];
    for (const prefecture of prefectures) {
      await expect(page.getByText(prefecture)).toBeVisible();
    }
  });

  test('都道府県を選択すると人口グラフが表示されることを確認', async ({
    page,
  }) => {
    const label = page.getByText('北海道');
    await label.click();

    const chart = page.locator('canvas');
    await expect(chart).toBeVisible();

    const legend = page.getByText('北海道');
    await expect(legend).toBeVisible();
  });

  test('タブを切り替えるとグラフが更新されることを確認', async ({ page }) => {
    const label = page.getByText('北海道');
    await label.click();

    let legend = page.getByText('北海道');
    await expect(legend).toBeVisible();

    const youthTab = page.getByRole('button', { name: '年少人口' });
    await youthTab.click();

    const chart = page.locator('canvas');
    await expect(chart).toBeVisible();
  });

  test('複数の都道府県を選択するとグラフに反映されることを確認', async ({
    page,
  }) => {
    const hokkaidoLabel = page.getByText('北海道');
    await hokkaidoLabel.click();

    const aomoriLabel = page.getByText('青森県');
    await aomoriLabel.click();

    const chart = page.locator('canvas');
    await expect(chart).toBeVisible();

    const hokkaidoLegend = page.getByText('北海道');
    await expect(hokkaidoLegend).toBeVisible();

    const aomoriLegend = page.getByText('青森県');
    await expect(aomoriLegend).toBeVisible();
  });

  test('都道府県の選択を変更するとグラフが更新されることを確認', async ({
    page,
  }) => {
    const hokkaidoLabel = page.getByText('北海道');
    await hokkaidoLabel.click();

    const legendItem = page.locator('.chart-legend').getByText('北海道');

    await hokkaidoLabel.click();

    await expect(legendItem).toHaveCount(0);
  });
});
