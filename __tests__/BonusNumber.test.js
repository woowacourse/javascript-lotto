const BonusNumber = require('../src/domain/BonusNumber');
const WinningNumbers = require('../src/domain/WinningNumbers');

describe('BonusNumber 클래스 테스트', () => {
  test.each([['1'], ['23'], ['45']])(
    '보너스 번호 입력 값이 1 ~ 45 이내의 숫자인 경우 정상 동작.',
    (input) => {
      const winningNumbers = [2, 3, 4, 5, 6, 7];

      expect(() => {
        new BonusNumber(input, winningNumbers);
      }).not.toThrow();
    }
  );

  test.each([['0'], ['46']])(
    '보너스 번호 입력 값이 1 ~ 45 이내의 숫자가 아닌 경우 예외처리.',
    (input) => {
      const winningNumbers = [2, 3, 4, 5, 6, 7];

      expect(() => {
        new BonusNumber(input, winningNumbers);
      }).toThrow();
    }
  );

  test('보너스 번호와 당첨번호의 중복이 존재하는 경우 예외처리.', () => {
    const bonusNumberinput = '6';
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    expect(() => {
      new BonusNumber(bonusNumberinput, winningNumbers);
    }).toThrow();
  });
});
