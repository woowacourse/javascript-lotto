import { ERROR_MESSAGE, RULES } from '../constants/index.js';
import { convertToNumber, pickLottoNumber } from '../util/common.js';
import {
  validatePurchaseMoney,
  validateWinningNumbers,
} from '../util/validator.js';

describe('로또 번호 생성 테스트', () => {
  it(`한 로또에는 ${RULES.LOTTO_NUMS}개의 숫자가 있다.`, () => {
    const numberList = pickLottoNumber(RULES.LOTTO_NUMS);

    expect(numberList).toHaveLength(RULES.LOTTO_NUMS);
  });

  it('로또 번호에는 중복이 없다.', () => {
    const numberList = pickLottoNumber(RULES.LOTTO_NUMS);

    expect(numberList).toHaveLength(new Set(numberList).size);
  });

  it(`모든 로또 번호는 ${RULES.MIN_LOTTO_NUMBER}~${RULES.MAX_LOTTO_NUMBER} 사이에 존재한다.`, () => {
    const numberList = pickLottoNumber(RULES.LOTTO_NUMS);

    expect(
      numberList.filter(
        number =>
          number >= RULES.MIN_LOTTO_NUMBER && number <= RULES.MAX_LOTTO_NUMBER,
      ),
    ).toHaveLength(RULES.LOTTO_NUMS);
  });
});

describe('구매할 금액 테스트', () => {
  it(`${RULES.LOTTO_PRICE}원 단위의 자연수면 정상적으로 구매가 가능하다.`, () => {
    const validPrice = 10000;

    // 정상 입력 시 아무것도 반환하지 않음
    expect(validatePurchaseMoney(validPrice)).toBeUndefined();
  });

  it(`${RULES.LOTTO_PRICE}원 단위가 아니면 에러가 발생한다.`, () => {
    const invalidPrice = 1100;

    expect(() => validatePurchaseMoney(invalidPrice)).toThrowError(
      ERROR_MESSAGE.NOT_UNIT_OF_THOUSAND,
    );
  });

  it('음수이면 에러가 발생한다.', () => {
    const invalidPrice = -1;

    expect(() => validatePurchaseMoney(invalidPrice)).toThrowError(
      ERROR_MESSAGE.NEGATIVE_NUMBER,
    );
  });

  it('0이면 에러가 발생한다.', () => {
    const invalidPrice = 0;

    expect(() => validatePurchaseMoney(invalidPrice)).toThrowError(
      ERROR_MESSAGE.ZERO_MONEY,
    );
  });

  it('숫자 값이 아니면 에러가 발생한다.', () => {
    const invalidPrice = '돈';

    expect(() => validatePurchaseMoney(invalidPrice)).toThrowError(
      ERROR_MESSAGE.NOT_NUMBER_TYPE,
    );
  });
});

describe('당첨번호 테스트', () => {
  it(`${RULES.MIN_LOTTO_NUMBER} ~ ${RULES.MAX_LOTTO_NUMBER} 사이의 값을 중복 없이 모두 입력하였을 경우 정상적으로 결과 계산이 가능하다.`, () => {
    const validNumbers = [1, 2, 3, 4, 5, 6, 7];

    expect(validateWinningNumbers(validNumbers)).toBeUndefined();
  });

  it(`${RULES.MIN_LOTTO_NUMBER} ~ ${RULES.MAX_LOTTO_NUMBER}가 아닌 값을 하나라도 입력하면 에러가 발생한다.`, () => {
    const invalidNumbers = [1, 2, 3, 4, 5, 6, 70];

    expect(() => validateWinningNumbers(invalidNumbers)).toThrowError(
      ERROR_MESSAGE.INVALID_WINNING_NUMBERS,
    );
  });

  it('값을 전부 입력하지 않으면 에러가 발생한다.', () => {
    const invalidNumbers = [1, 2, 3, 4, 5, 6];

    expect(() => validateWinningNumbers(invalidNumbers)).toThrowError(
      ERROR_MESSAGE.INVALID_WINNING_NUMBERS,
    );
  });

  it('중복 값을 입력하면 에러가 발생한다.', () => {
    const invalidNumbers = [1, 2, 3, 4, 5, 6, 6];

    expect(() => validateWinningNumbers(invalidNumbers)).toThrowError(
      ERROR_MESSAGE.INVALID_WINNING_NUMBERS,
    );
  });
});

describe('문자열에서 숫자로의 변환 테스트', () => {
  it('문자열을 숫자로 변환한다.', () => {
    const string = '11000';

    expect(convertToNumber(string)).toEqual(Number(string));
  });
});
