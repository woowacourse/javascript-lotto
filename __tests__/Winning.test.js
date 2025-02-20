import Winning from '../src/Model/Winning.js';

describe('Winning 클래스 테스트', () => {
  test('입력받은 당첨번호와 보너스번호 저장 테스트', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winning = new Winning(winningNumbers, bonusNumber);

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
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winning = new Winning(winningNumbers, bonusNumber);
    winning.calculateRankHistory(boughtLotto);

    expect(winning.rankHistory[rank]).toEqual(1);
  });

  test('당첨 금액 전체 합산 테스트', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winning = new Winning(winningNumbers, bonusNumber);

    winning.rankHistory.first = 1;
    winning.rankHistory.second = 1;
    winning.rankHistory.third = 1;
    winning.rankHistory.fourth = 1;
    winning.rankHistory.fifth = 1;

    expect(winning.getTotalPrize()).toEqual(2031555000);
  });
});
