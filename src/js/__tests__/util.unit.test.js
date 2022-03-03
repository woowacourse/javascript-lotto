import {
  isDividedByThousand,
  isEmptyValue,
  isPositiveValue,
  isNotDuplicateNumberExistInArray,
  isAllNumberInRange,
  isNumberInRange,
  isNotIncludeSameNumber,
} from '../utils/validator.js';
import { LOTTO } from '../utils/constants.js';

describe('구매 금액 유효성 검사 유틸 테스트', () => {
  test('금액이 천 단위인지 판단 할 수 있어야한다.', () => {
    const purchaseMoney = 3000;

    expect(isDividedByThousand(purchaseMoney)).toBe(true);
  });

  test('금액이 빈값인지 판단 할 수 있어야한다. ', () => {
    const purchaseMoney = '';

    expect(isEmptyValue(purchaseMoney)).toBe(true);
  });

  test('금액이 양의 정수인지 판단 할 수 있어야한다', () => {
    let purchaseMoney = -1000;

    expect(isPositiveValue(purchaseMoney)).toBe(false);

    purchaseMoney = 0;

    expect(isPositiveValue(purchaseMoney)).toBe(false);
  });
});

describe('당첨번호 유효성 검사 유틸 테스트', () => {
  test('번호간 중복이 없어야 한다', () => {
    const lottoWinningNumbers = [1, 2, 3, 4, 6, 7];

    expect(isNotDuplicateNumberExistInArray(lottoWinningNumbers)).toBe(true);
  });

  // test('번호간 중복이 있는 경우 에러메시지를 보여줘야한다.', () => {
  //   const lottoWinningNumbers = [1, 1, 3, 4, 6, 7];

  //   expect(isNotDuplicateNumExist(lottoWinningNumbers)).toBe(false);
  // });

  test('각 번호는 1이상 45이하의 숫자들로만 이루어져야한다.', () => {
    const lottoWinningNumbers = [1, 2, 3, 4, 6, 45];

    expect(isAllNumberInRange(lottoWinningNumbers, LOTTO.MIN_DIGIT, LOTTO.MAX_DIGIT)).toBe(true);
  });

  // test('각 번호가 1이상 45이하의 숫자들로만 이루어지지 않은 경우 에러메시지를 보여줘야 한다.', () => {
  //   const lottoWinningNumbers = [1, '2', NaN, 0, 6, 7];

  //   expect(isAllNumberInRange(lottoWinningNumbers)).toBe(false);
  // });
});

describe('보너스번호 유효성 검사 유틸 테스트', () => {
  test('1이상 45이하의 숫자여야 한다.', () => {
    const lottoWinningBonusNumber = 1;

    expect(isNumberInRange(lottoWinningBonusNumber, LOTTO.MIN_DIGIT, LOTTO.MAX_DIGIT)).toBe(true);
  });

  // test('1이상 45이하의 숫자가 아니면, 에러메시지를 보여줘야한다.', () => {
  //   const lottoWinningBonusNumber = 0;

  //   expect(isNumberInRange(lottoWinningBonusNumber).toBe(false));
  // });

  test('당첨번호와 중복되지 않아야한다.', () => {
    const lottoWinningBonusNumber = 30;
    const lottoWinningNumbers = [1, 2, 3, 4, 6, 7];

    expect(isNotIncludeSameNumber(lottoWinningNumbers, lottoWinningBonusNumber)).toBe(true);
  });

  // test('당첨번호와 중복된 경우, 에러메시지를 보여줘야한다.', () => {
  //   const lottoWinningBonusNumber = 7;
  //   const lottoWinningNumbers = [1, 2, 3, 4, 6, 7];

  //   expect(
  //     isNotIncludeSameNumber(lottoWinningNumbers, lottoWinningBonusNumber)
  //   ).toBe(false);
  // });
});
