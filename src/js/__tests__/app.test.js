import Lotto from '../model/Lotto.js';
import LottoBundle from '../model/LottoBundle.js';
import autoComma from '../utils/autoComma.js';
import { moneyValidator, validateMoney } from '../validator/moneyValidator.js';
import LOTTO from '../constants/lotto.js';
import EXCEPTION from '../constants/exception.js';

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  test(`사용자는 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원 단위로 금액을 투입해야한다.`, () => {
    const inputMoney = 1000;

    expect(
      moneyValidator.isCorrectUnit(inputMoney, LOTTO.PRICE_PER_TICKET),
    ).toBe(true);
  });

  test(`사용자는 금액을 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원 이상 투입해야한다.`, () => {
    const inputMoney = 1000;

    expect(moneyValidator.isOverMin(inputMoney, LOTTO.PRICE_PER_TICKET)).toBe(
      true,
    );
  });

  test(`사용자는 ${autoComma(
    LOTTO.INVENTORY * LOTTO.PRICE_PER_TICKET,
  )}원 이하의 금액을 투입해야한다.`, () => {
    const inputMoney = 1000000;

    expect(
      moneyValidator.isUnderMax(
        inputMoney,
        LOTTO.INVENTORY,
        LOTTO.PRICE_PER_TICKET,
      ),
    ).toBe(true);
  });

  test('사용자가 입력한 금액만큼 로또가 구매된다.', () => {
    const inputMoney = 5000;
    const lottoBundle = new LottoBundle();

    lottoBundle.createLottoBundle(inputMoney / LOTTO.PRICE_PER_TICKET);
    expect(lottoBundle.lottos.length).toBe(inputMoney / LOTTO.PRICE_PER_TICKET);
  });
});

describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
  test('자동발급된 로또의 번호는 중복되어서는 안된다.', () => {
    const isNumberDuplicated = (numbers) =>
      numbers.length !== new Set(numbers).size;

    const lotto = new Lotto();
    lotto.generateLottoNumbers();

    expect(isNumberDuplicated(lotto.numbers)).toBe(false);
  });

  test(`발급받은 로또 ${LOTTO.NUMBER_COUNT}개 숫자 모두가 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER} 범위 안에 있어야 한다.`, () => {
    const isCorrectRangeAll = (numbers) => {
      const isCorrectRange = (number) =>
        number >= LOTTO.MIN_NUMBER && number <= LOTTO.MAX_NUMBER;

      return numbers.every(isCorrectRange);
    };

    const lotto = new Lotto();
    lotto.generateLottoNumbers();

    expect(isCorrectRangeAll(lotto.numbers)).toBe(true);
  });
});

describe('사용자가 유효하지 않은 값을 입력했을 경우, 에러를 발생시켜야 한다.', () => {
  const validateErrorMessage = (invalidMoney, errorMessage) => {
    try {
      validateMoney(invalidMoney);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  };

  test(`사용자가 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원이하의 금액을 투입했을 경우 에러를 발생시킨다.`, () => {
    const invalidMoney = 500;

    validateErrorMessage(invalidMoney, EXCEPTION.INVALID_RANGE.MINIMUM);
  });

  test('사용자가 입력할 수 있는 최대 금액을 초과하여 투입했을 경우 에러를 발생시킨다.', () => {
    const invalidMoney = Number.MAX_SAFE_INTEGER;

    validateErrorMessage(invalidMoney, EXCEPTION.INVALID_RANGE.MAXIMUM);
  });

  test(`사용자가 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원 단위로 금액을 투입하지 않았을 경우 에러를 발생시킨다.`, () => {
    const invalidMoney = 1500;

    validateErrorMessage(invalidMoney, EXCEPTION.INVALID_UNIT);
  });
});
