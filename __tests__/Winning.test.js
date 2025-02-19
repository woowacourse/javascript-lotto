import Lotto from '../src/Model/Lotto.js';
import Winning from '../src/Model/Winning.js';

describe('Winning 클래스 테스트', () => {
  test('입력받은 당첨번호와 보너스번호 저장 테스트', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winning = new Winning(winningNumbers, bonusNumber);

    expect(winning).toEqual({ winningNumbers, bonusNumber });
  });

  test.each([
    [[1, 2, 3, 4, 5, 6], 1],
    [[1, 2, 3, 4, 5, 7], 2],
    [[1, 2, 3, 4, 5, 10], 3],
    [[1, 2, 3, 4, 10, 11], 4],
    [[1, 2, 3, 9, 10, 11], 5],
  ])('각 등수별 당첨 여부 확인', (boughtLotto, rank) => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winning = new Winning(winningNumbers, bonusNumber);

    expect(winning.getRank(boughtLotto)).toBe(rank);
  });
});
