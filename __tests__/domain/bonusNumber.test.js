import BonusNumber from '../../src/domain/BonusNumber';

describe('bonusNumber 테스트', () => {
  test.each([-1, 0, 'd'])('입력한 보너스 번호 %s이 양의 정수가 아닐 때, 예외가 발생한다.', (inputBonusNumber) => {
    const winningLotto = [1, 2, 3, 4, 5, 6];

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });

  test('입력한 보너스 번호의 범위가 1~45가 아닐 때, 예외가 발생한다.', () => {
    const inputBonusNumber = '46';
    const winningLotto = [1, 2, 3, 4, 5, 6];

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });
});
