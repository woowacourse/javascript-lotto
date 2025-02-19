import Winning from '../src/Model/Winning.js';

describe('Winning 클래스 테스트', () => {
  test('입력받은 당첨번호와 보너스번호 저장 테스트', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winning = new Winning(winningNumbers, bonusNumber);

    expect(winning).toEqual({ winningNumbers, bonusNumber });
  });
});
