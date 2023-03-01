import Validation from '../src/domain/Validation.js';
import { LOTTO_CONDITION } from '../src/constants/condition.js';
import { ERROR_MESSAGE } from '../src/constants/message.js';

describe('Validation.isNumber', () => {
  test.each(['abc', '8천원', '8$'])(
    '구입금액 입력이 숫자가 아닌 경우 false를 반환한다.',
    (purchaseAmount) => {
      const result = Validation.isNumber(purchaseAmount);

      expect(result).toBe(false);
    }
  );

  test('구입금액 입력이 숫자인 경우 true를 반환한다.', () => {
    const purchaseAmount = '1000';

    const result = Validation.isNumber(purchaseAmount);

    expect(result).toBe(true);
  });
});

describe('Validation.isHigherThanLottoPrice', () => {
  test(`구입금액 입력이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice}원) 미만인 경우, false를 반환한다.`, () => {
    const purchaseAmount = `${LOTTO_CONDITION.lottoPrice - 1}`;

    const result = Validation.isHigherThanLottoPrice(purchaseAmount);

    expect(result).toBe(false);
  });

  test(`구입금액 입력이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice}원) 이상인 경우, true를 반환한다.`, () => {
    const purchaseAmount = `${LOTTO_CONDITION.lottoPrice + 1}`;

    const result = Validation.isHigherThanLottoPrice(purchaseAmount);

    expect(result).toBe(true);
  });
});

describe('Validation.isDivisibleByLottoPrice', () => {
  test(`구입금액 입력이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice}원)으로 나누어 떨어지지 않는 경우, false를 반환한다.`, () => {
    const purchaseAmount = `${LOTTO_CONDITION.lottoPrice + 1}`;

    const result = Validation.isDivisibleByLottoPrice(purchaseAmount);

    expect(result).toBe(false);
  });

  test(`구입금액 입력이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice}원)으로 나누어 떨어지는 경우, true를 반환한다.`, () => {
    const purchaseAmount = `${LOTTO_CONDITION.lottoPrice * 2}`;

    const result = Validation.isDivisibleByLottoPrice(purchaseAmount);

    expect(result).toBe(true);
  });
});

describe('Validation.validatePurchaseAmount', () => {
  test.each(['abc', '8천원', '8$'])(
    '구입금액 입력이 숫자가 아닌 경우, 에러가 발생한다.',
    (purchaseAmount) => {
      expect(() => {
        Validation.validatePurchaseAmount(purchaseAmount);
      }).toThrow(ERROR_MESSAGE.invalidInputType);
    }
  );

  test(`구입금액 입력이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice}원) 미만인 경우, 에러가 발생한다.`, () => {
    const purchaseAmount = `${LOTTO_CONDITION.lottoPrice - 1}`;

    expect(() => {
      Validation.validatePurchaseAmount(purchaseAmount);
    }).toThrow(ERROR_MESSAGE.lowerThanLottoPrice);
  });

  test(`구입금액 입력이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice}원)으로 나누어 떨어지지 않는 경우, 에러가 발생한다.`, () => {
    const purchaseAmount = `${LOTTO_CONDITION.lottoPrice + 1}`;

    expect(() => {
      Validation.validatePurchaseAmount(purchaseAmount);
    }).toThrow(ERROR_MESSAGE.indivisibleByLottoPrice);
  });
});

describe('Validation.isValidWinningNumberLength', () => {
  test(`당첨 번호 배열의 길이가 로또 자릿수(${LOTTO_CONDITION.lottoDigits}자리)와 일치하지 않는 경우 false를 반환한다.`, () => {
    const winningNumbers = Array.from(
      { length: LOTTO_CONDITION.lottoDigits - 1 },
      (_, idx) => idx + 1
    );

    const result = Validation.isValidWinningNumbersLength(winningNumbers);

    expect(result).toBe(false);
  });

  test(`당첨 번호 배열의 길이가 로또 자릿수(${LOTTO_CONDITION.lottoDigits}자리)와 일치하는 경우 true를 반환한다.`, () => {
    const winningNumbers = Array.from({ length: LOTTO_CONDITION.lottoDigits }, (_, idx) => idx + 1);

    const result = Validation.isValidWinningNumbersLength(winningNumbers);

    expect(result).toBe(true);
  });
});

describe('Validation.hasOnlyNumber', () => {
  test(`당첨 번호 배열의 각 요소가 숫자가 아닌 경우, false를 반환한다.`, () => {
    const winningNumbers = Array.from(
      { length: LOTTO_CONDITION.lottoDigits },
      () => 'string'
    );

    const result = Validation.hasOnlyNumber(winningNumbers);

    expect(result).toBe(false);
  });

  test(`당첨 번호 배열의 각 요소가 숫자인 경우, true를 반환한다.`, () => {
    const winningNumbers = Array.from({ length: LOTTO_CONDITION.lottoDigits }, (_, idx) => idx + 1);

    const result = Validation.hasOnlyNumber(winningNumbers);

    expect(result).toBe(true);
  });
});

describe('Validation.isValidWinningNumberRange', () => {
  test(`당첨 번호 배열의 각 요소가 로또 숫자 범위내의 수(${LOTTO_CONDITION.lottoNumberMinRange}~${LOTTO_CONDITION.lottoNumberMaxRange})가 아닌 경우, false를 반환한다.`, () => {
    const winningNumbers = Array.from({ length: LOTTO_CONDITION.lottoDigits }, (_, idx) => idx);

    const result = Validation.isValidWinningNumberRange(winningNumbers);

    expect(result).toBe(false);
  });

  test(`당첨 번호 배열의 각 요소가 로또 숫자 범위내의 수(${LOTTO_CONDITION.lottoNumberMinRange}~${LOTTO_CONDITION.lottoNumberMaxRange})인 경우, true를 반환한다.`, () => {
    const winningNumbers = Array.from({ length: LOTTO_CONDITION.lottoDigits }, (_, idx) => idx + 1);

    const result = Validation.isValidWinningNumberRange(winningNumbers);

    expect(result).toBe(true);
  });
});

describe('Validation.validateWinningNumbers', () => {
  test(`당첨 번호 배열의 길이가 로또 자릿수(${LOTTO_CONDITION.lottoDigits}자리)와 일치하지 않는 경우 에러가 발생한다.`, () => {
    const winningNumbers = Array.from(
      { length: LOTTO_CONDITION.lottoDigits - 1 },
      (_, idx) => idx + 1
    );

    expect(() => {
      Validation.validateWinningNumbers(winningNumbers);
    }).toThrow(ERROR_MESSAGE.invalidLottoNumberLength);
  });

  test(`당첨 번호 배열의 각 요소가 숫자가 아닌 경우, 에러가 발생한다.`, () => {
    const winningNumbers = Array.from(
      { length: LOTTO_CONDITION.lottoDigits },
      () => 'string'
    );

    expect(() => {
      Validation.validateWinningNumbers(winningNumbers);
    }).toThrow(ERROR_MESSAGE.invalidInputType);
  });

  test(`당첨 번호 배열의 각 요소가 로또 숫자 범위내의 수(${LOTTO_CONDITION.lottoNumberMinRange}~${LOTTO_CONDITION.lottoNumberMaxRange})가 아닌 경우, 에러가 발생한다.`, () => {
    const winningNumbers = Array.from({ length: LOTTO_CONDITION.lottoDigits }, (_, idx) => idx);

    expect(() => {
      Validation.validateWinningNumbers(winningNumbers);
    }).toThrow(ERROR_MESSAGE.invalidLottoNumberRange);
  });
});

describe('Validation.validateBounsNumber', () => {
  test.each(['seven', '칠', '&7&'])(
    '보너스 번호 입력이 숫자가 아닌 경우, 에러가 발생한다.',
    (bonusNumber) => {
      expect(() => {
        Validation.validateBonusNumber(bonusNumber);
      }).toThrow(ERROR_MESSAGE.invalidInputType);
    }
  );

  test(`보너스 번호 입력이 로또 숫자 범위내의 수(${LOTTO_CONDITION.lottoNumberMinRange}~${LOTTO_CONDITION.lottoNumberMaxRange})가 아닌 경우, 에러가 발생한다.`, () => {
    const bonusNumber = LOTTO_CONDITION.lottoNumberMaxRange + 1;

    expect(() => {
      Validation.validateBonusNumber(bonusNumber);
    }).toThrow(ERROR_MESSAGE.invalidLottoNumberRange);
  });

  test(`보너스 번호 입력이 당첨번호와 중복인 경우, 에러가 발생한다.`, () => {
    const winningNumbers = Array.from({ length: LOTTO_CONDITION.lottoDigits }, (_, idx) => idx + 1);
    const bonusNumber = winningNumbers[0];

    expect(() => {
      Validation.validateBonusNumber(bonusNumber, winningNumbers);
    }).toThrow(ERROR_MESSAGE.duplicateLottoNumber);
  });
});
