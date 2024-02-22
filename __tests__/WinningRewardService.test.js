import CONDITION from '../src/constant/Condition.js';

class WinningRewardService {
  #winningResult;
  #purchasedCount;

  constructor(winningResult, purchasedCount) {
    this.#winningResult = winningResult;
    this.#purchasedCount = purchasedCount;
  }

  getWinningPrice() {
    return Object.entries(this.#winningResult).reduce(
      (total, [matched, count]) =>
        total + CONDITION.winningPrice[matched] * count,
      0,
    );
  }

  getReturnRate() {
    const PERCENT_UNIT = 100;
    return (
      (this.getWinningPrice() /
        (this.#purchasedCount * CONDITION.pricePerLotto)) *
      PERCENT_UNIT
    );
  }
}

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
