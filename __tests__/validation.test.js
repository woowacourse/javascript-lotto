import { ERROR } from '../src/constants/message';
import { LOTTO_RULE } from '../src/domain/constants';
import {
  validateMoney,
  validateLottoNumber,
  validateBonus,
  validateRestart,
} from '../src/domain/validation';

describe('로또 구입 금액', () => {
  test('로또 구입 금액은 1,000원으로 나누어떨어져야 한다.', () => {

    expect(() => {
      validateMoney(LOTTO_RULE.PRICE);
    }).not.toThrow();
  });

  test('로또 구입 금액은 1,000원으로 나누어 떨어지지 않으면 에러를 발생한다.', () => {

    expect(() => {
      validateMoney(LOTTO_RULE.PRICE + 1);
    }).toThrow(ERROR.MONEY.REST_VALUE);
  });

  test.each([[0], [-1000]])(
    '로또 구입 금액은 0원 이하일 경우 에러를 발생한다.',
    (money) => {
      expect(() => {
        validateMoney(money);
      }).toThrow(ERROR.MONEY.EMPTY_VALUE);
    },
  );

  test('로또 구입 금액은 100,000원을 초과할 경우 에러를 발생한다.', () => {
    expect(() => {
      validateMoney(LOTTO_RULE.MAX_BUY_MONEY + LOTTO_RULE.PRICE);
    }).toThrow(ERROR.MONEY.MAX_OVER_VALUE);
  });
});

describe('로또 숫자', () => {
  test.each([[[1, 2, 3, 4, 5, 6, 7]], [[1, 2, 3, 4, 5]]])(
    '로또의 번호 숫자는 6개가 아닐시 에러가 발생한다.',
    (lottoNumbers) => {
      expect(() => validateLottoNumber(lottoNumbers)).toThrow(
        ERROR.LOTTO_NUMBER.QUANTITY,
      );
    },
  );

  test.each([[[0, 1, 2, 3, 4, 5]], [[41, 42, 43, 44, 45, 46]]])(
    '로또의 번호의 숫자 범위는 1 미만 혹은 45 초과하면 에러가 발생한다.',
    (lottoNumbers) => {
      // then
      expect(() => validateLottoNumber(lottoNumbers)).toThrow(
        ERROR.LOTTO_NUMBER.RANGE,
      );
    },
  );

  test.each([[[1, 1, 2, 3, 4, 5]], [[41, 42, 43, 44, 45, 45]]])(
    '로또의 번호의 숫자는 중복된 숫자가 있으면 안된다.',
    (lottoNumbers) => {
      // then
      expect(() => validateLottoNumber(lottoNumbers)).toThrow(
        ERROR.LOTTO_NUMBER.DUPLICATION,
      );
    },
  );
});

describe('보너스 숫자', () => {
  const winningLotto = [1, 2, 3, 4, 5, 6];

  test.each([[0], [46]])(
    '보너스 번호의 숫자 범위는 1 미만 혹은 45 초과하면 에러가 발생한다.',
    (bonus) => {
      // then
      expect(() => validateBonus(bonus, winningLotto)).toThrow(
        ERROR.BONUS.RANGE,
      );
    },
  );

  test.each([[1], [6]])(
    '보너스 번호는 당첨 로또의 있는 숫자와 중복되면 안된다.',
    () => {
      const bonus = 6;

      expect(() => validateBonus(bonus, winningLotto)).toThrow(
        ERROR.BONUS.DUPLICATION,
      );
    },
  );
});

test('재시작 여부는 y 혹은 n이 아닐시 에러가 발생한다.', () => {
  const lowerCaseInput = 'a';

  expect(() => validateRestart(lowerCaseInput)).toThrow(
    ERROR.RESTART.YES_OR_NO,
  );
});
