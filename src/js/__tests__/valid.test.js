import { AMOUNT, LOTTO_NUMBER } from "../utils/constants.js";
import {
  hasOverRangeNumber,
  isOverMaximumAmount,
  isUnderAmountUnit,
  isUnderMinimumAmount,
} from "../utils/validation.js";

describe("유효성 함수 테스트", () => {
  test(`구입할 금액은 최소 ${AMOUNT.MINIMUM}원 이상이여야 한다.`, () => {
    const amount1 = 500;
    const amount2 = 1000;
    expect(isUnderMinimumAmount(amount1)).toBe(true);
    expect(isUnderMinimumAmount(amount2)).toBe(false);
  });

  test(`최대 구입 가능한 금액은 ${AMOUNT.MAXIMUM}원이다.`, () => {
    const amount1 = 110000;
    const amount2 = 100000;
    expect(isOverMaximumAmount(amount1)).toBe(true);
    expect(isOverMaximumAmount(amount2)).toBe(false);
  });

  test(`구입할 금액 단위는 ${AMOUNT.UNIT}원 이어야 한다.`, () => {
    const amount1 = 2200;
    const amount2 = 10000;
    expect(isUnderAmountUnit(amount1)).toBe(true);
    expect(isUnderAmountUnit(amount2)).toBe(false);
  });

  test(`당첨번호와 보너스번호는 ${LOTTO_NUMBER.RANGE_MIN}~${LOTTO_NUMBER.RANGE_MAX} 사이의 숫자로 이루어져야 한다.`, () => {
    const numbers1 = [1, 2, 3, 4, 5, 6, 46];
    const numbers2 = [1, 2, 3, 4, 5, 6, 7];
    expect(hasOverRangeNumber(numbers1)).toBe(true);
    expect(hasOverRangeNumber(numbers2)).toBe(false);
  });
});
