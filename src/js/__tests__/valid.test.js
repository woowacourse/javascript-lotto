import { AMOUNT, LOTTO_NUMBER } from "../utils/constants.js";
import {
  isValidAmountUnit,
  isValidMaximumAmount,
  isValidMinimumAmount,
  isValidWinningNumbers,
} from "../utils/validation.js";

describe("유효성 함수 테스트", () => {
  test(`구입할 금액은 최소 ${AMOUNT.MINIMUM}원 이상이여야 한다.`, () => {
    const amount = 500;
    expect(isValidMinimumAmount(amount)).toBe(false);
  });

  test(`구입할 금액 단위는 ${AMOUNT.UNIT}원 이어야 한다.`, () => {
    const amount = 2200;
    expect(isValidAmountUnit(amount)).toBe(false);
  });

  test(`최대 구입 가능한 금액은 ${AMOUNT.MAXIMUM}원이다.`, () => {
    const amount = 110000;
    expect(isValidMaximumAmount(amount)).toBe(false);
  });

  test(`당첨번호와 보너스번호는 ${LOTTO_NUMBER.RANGE_MIN}~${LOTTO_NUMBER.RANGE_MAX} 사이의 숫자로 이루어져야 한다.`, () => {
    const numbers = [1, 2, 3, 4, 5, 6, 46];
    expect(isValidWinningNumbers(numbers)).toBe(false);
  });
});
