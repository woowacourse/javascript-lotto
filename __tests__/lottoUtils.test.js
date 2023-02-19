import { ERROR_MESSAGE, LOTTO_CONSTANT } from '../src/data/constants';
import LottoUtils from '../src/domain/LottoUtils';

describe('기능 테스트', () => {
  const isValidLotto = (numbers) => {
    const filteredNumbers = numbers.filter(
      (number) => LOTTO_CONSTANT.MIN_NUMBER <= number && number <= LOTTO_CONSTANT.MAX_NUMBER
    );
    if (new Set(filteredNumbers).size !== LOTTO_CONSTANT.LENGTH) return false;
    return true;
  };
  test('로또 번호 생성', () => {
    const lottos = new Array(10).fill().map(() => LottoUtils.createLottoNumbers());
    lottos.forEach((numbers) => {
      expect(isValidLotto(numbers)).toBe(true);
    })
  });

  test('수익률 계산', () => {
    const winningResult = { first: 0, second: 0, third: 1, fourth: 1, fifth: 0 };
    LottoUtils.calculateYieldRate([1, 2, 3, 4, 5, 6], 7);

    expect(LottoUtils.calculateYieldRate(winningResult, 20)).toBe('7750.0');
  });
});

describe('예외 테스트', () => {
  test.each([['a'], ['가'], ['!'], [' ']])('구입 금액은 숫자이다', (budget) => {
    expect(() => {
      LottoUtils.validateBudget(budget);
    }).toThrow(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BUDGET));
  });

  test.each([[300], [1], [8008]])('구입 금액은 1000원으로 나뉘어 떨어진다.', (budget) => {
    expect(() => {
      LottoUtils.validateBudget(budget);
    }).toThrow(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
  });

  test.each([[-1000], [-2000], [-8000]])('구입 금액은 로또 금액보다 크다.', (budget) => {
    expect(() => {
      LottoUtils.validateBudget(budget);
    }).toThrow(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
  });

  test.each([['h'], [' ']])('재시작 커맨드는 y 또는 n이다.', (command) => {
    expect(() => {
      LottoUtils.validateRetryCommand(command);
    }).toThrow(ERROR_MESSAGE.RETRY_COMMAND);
  });
});
