import { LOTTO_NUMBER_LENGTH, PRIZE } from '../src/constants/common.js';
import Winning from '../src/Model/Winning.js';
import { getLottoNumberArray } from '../src/util/createNumber.js';

describe('Winning 클래스 테스트', () => {
  let winningNumbers;
  let bonusNumber;
  let winning;

  beforeEach(() => {
    winningNumbers = getLottoNumberArray();
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
  ])('각 등수에 대한 당첨 횟수가 올바른지 확인한다.', (boughtLotto, rank) => {
    winning.calculateRankHistory(boughtLotto);

    expect(winning.rankHistory[rank]).toEqual(1);
  });

  test('전체 당첨 금액 합산 결과가 올바른지 확인한다.', () => {
    winning.rankHistory.first = 1;
    winning.rankHistory.second = 1;
    winning.rankHistory.third = 1;
    winning.rankHistory.fourth = 1;
    winning.rankHistory.fifth = 1;

    const expectedTotalPrize = Object.keys(winning.rankHistory)
      .map((rank) => PRIZE[rank] * winning.rankHistory[rank])
      .reduce((total, prize) => total + prize, 0);

    expect(winning.getTotalPrize()).toEqual(expectedTotalPrize);
  });

  test('수익률 계산이 올바른지 확인한다.', () => {
    const price = 8000;

    winning.rankHistory.fifth = 1;

    expect(winning.getCalculatedPrizeRate(price)).toEqual(62.5);
  });
});
