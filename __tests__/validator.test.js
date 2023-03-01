import LOTTO from '../src/constants/lotto';
import {
  validatePurchaseAmount,
  validateNumbers,
  validateBonusNumber,
  validateRestartCommand,
} from '../src/domain/validator';

describe('validator 테스트입니다.', () => {
  test.each(['', 0, 999, -1])('1000원 단위의 금액을 입력하지 않으면 에러를 던진다.', (money) => {
    expect(() => validatePurchaseAmount(money)).toThrow();
  });

  test.each(['', [], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7]])(
    `로또 번호의 개수가 ${LOTTO.SIZE}개가 아니면 에러를 던진다.`,
    (numbers) => {
      expect(() => validateNumbers(numbers)).toThrow();
    },
  );

  test('로또 번호에 중복된 번호가 있으면 에러를 던진다.', () => {
    const numbers = [1, 2, 3, 4, 5, 5];

    expect(() => validateNumbers(numbers)).toThrow();
  });

  test.each(['', LOTTO.MIN_NUMBER - 1, LOTTO.MAX_NUMBER + 1])(
    '보너스 번호가 로또 번호 범위를 벗어나면 에러를 던진다.',
    (bonusNumber) => {
      const winNumbers = [1, 2, 3, 4, 5, 6];

      expect(() => validateBonusNumber(winNumbers, bonusNumber)).toThrow();
    },
  );

  test('당첨 번호와 보너스 번호가 중복되면 에러를 던진다.', () => {
    const winNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 6;

    expect(() => validateBonusNumber(winNumbers, bonusNumber)).toThrow();
  });

  test.each(['', 'a', 'z', 1, 0, -1])(
    'command에 없는 입력을 받을 경우 에러를 던진다.',
    (command) => {
      expect(() => validateRestartCommand(command)).toThrow();
    },
  );
});
