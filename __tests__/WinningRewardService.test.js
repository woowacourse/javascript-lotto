import WinningRewardService from '../src/domain/service/WinningRewardService.js';

describe('당청금 및 수익률 계산 테스트', () => {
  test('당첨 개수들을 인자로 받았을 때, 당첨금을 반환한다.', () => {
    const WINNING_RESULT = { 3: 1, 4: 0, 5: 1, '5-1': 0, 6: 0 };
    const PUCHASED_COUNT = 8;
    const EXPECTED_RESULT = 1505000;

    const priceResult = new WinningRewardService(
      WINNING_RESULT,
      PUCHASED_COUNT,
    ).getWinningPrice();

    expect(priceResult).toBe(EXPECTED_RESULT);
  });

  test('당첨 개수들을 인자로 받았을 때, 수익률을 반환한다.', () => {
    const WINNING_RESULT = { 3: 1, 4: 0, 5: 0, '5-1': 0, 6: 0 };
    const PUCHASED_COUNT = 8;
    const EXPECTED_RESULT = 62.5;

    const returnRate = new WinningRewardService(
      WINNING_RESULT,
      PUCHASED_COUNT,
    ).getReturnRate();

    expect(returnRate).toBe(EXPECTED_RESULT);
  });
});
