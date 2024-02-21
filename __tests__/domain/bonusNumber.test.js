import BonusNumber from '../../src/domain/BonusNumber';

describe('bonusNumber 테스트', () => {
  test('입력한 보너스 번호가 양의 정수인가', () => {
    //TODO: 예외케이스 추가
    const inputBonusNumber = '-1';
    const winningLotto = [1, 2, 3, 4, 5, 6];

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });

  test('입력한 보너스 번호의 범위는 1~45인가', () => {
    const inputBonusNumber = '46';
    const winningLotto = [1, 2, 3, 4, 5, 6];

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });

  test('당첨 번호와 보너스 번호가 중복되는가', () => {
    const inputBonusNumber = '4';
    const winningLotto = [1, 2, 3, 4, 5, 6];

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });
});
