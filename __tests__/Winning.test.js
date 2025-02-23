import { LOTTO_NUMBER_LENGTH, PRIZE } from '../src/constants/common.js';
import Winning from '../src/Model/Winning.js';

describe('Winning 클래스 테스트', () => {
  let winningNumbers;
  let bonusNumber;
  let winning;

  beforeEach(() => {
    winningNumbers = Array.from({ length: LOTTO_NUMBER_LENGTH }, (_, i) => i + 1);
    bonusNumber = 7;
    winning = new Winning(winningNumbers, bonusNumber);
  });
  test('입력받은 당첨번호와 보너스번호 저장 테스트', () => {
    expect(winning.winningNumbers).toEqual(winningNumbers);
    expect(winning.bonusNumber).toBe(bonusNumber);
  });

  test.each([
    [[1, 2, 3, 4, 5, 6], 'first'],
    [[1, 2, 3, 4, 5, 7], 'second'],
    [[1, 2, 3, 4, 5, 10], 'third'],
    [[1, 2, 3, 4, 10, 11], 'fourth'],
    [[1, 2, 3, 9, 10, 11], 'fifth'],
  ])('당첨 등수 통계 계산 테스트', (boughtLotto, rank) => {
    winning.calculateRankHistory(boughtLotto);

    expect(winning.rankHistory[rank]).toEqual(1);
  });

  test('당첨 금액 전체 합산 테스트', () => {
    winning.calculateRankHistory([1, 2, 3, 4, 5, 6]);
    winning.calculateRankHistory([1, 2, 3, 4, 5, 7]);
    winning.calculateRankHistory([1, 2, 3, 4, 5, 10]);
    winning.calculateRankHistory([1, 2, 3, 4, 10, 11]);
    winning.calculateRankHistory([1, 2, 3, 9, 10, 11]);

    const price = 5000;

    const expectedTotalPrize = PRIZE.first + PRIZE.second + PRIZE.third + PRIZE.fourth + PRIZE.fifth;
    const calculatedPrizeRate = winning.getCalculatedPrizeRate(price);

    expect((calculatedPrizeRate / 100) * price).toEqual(expectedTotalPrize);
  });

  test('수익률 계산 테스트', () => {
    const price = 8000;

    winning.calculateRankHistory([1, 2, 3, 9, 10, 11]);

    expect(winning.getCalculatedPrizeRate(price)).toBe(Number(((PRIZE.fifth / price) * 100).toFixed(1)));
  });
});
