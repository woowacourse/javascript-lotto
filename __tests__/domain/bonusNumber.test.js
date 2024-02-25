import BonusNumber from '../../src/domain/BonusNumber';
import Lotto from '../../src/domain/Lotto';

describe('bonusNumber 테스트', () => {
  const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
  test('보너스 번호에 -1을 입력하면, 에러가 발생한다.', () => {
    const inputBonusNumber = '-1';

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });

  test('보너스 번호에 공백을 입력하면, 에러가 발생한다.', () => {
    const inputBonusNumber = ' ';

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });

  test('보너스 번호에 1 ~ 45가 아닌 숫자를 입력하면, 에러가 발생한다.', () => {
    const inputBonusNumber = '46';

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });

  test('보너스 번호에 winningLotto와 중복되는 번호를 입력하면, 에러가 발생한다.', () => {
    const inputBonusNumber = '4';

    expect(() => {
      new BonusNumber(inputBonusNumber, winningLotto);
    }).toThrow();
  });
});
