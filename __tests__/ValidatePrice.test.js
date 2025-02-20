import { PRICE_ERROR_MESSAGE } from "../src/constants/errorMessage.js";
import validatePrice from "../src/validation/validatePrice.js";
import { LOTTO_PRICE } from "../src/constants/systemConstants.js";

describe("구입금액에 대한 유효성 검사를 진행한다", () => {
  test("빈 값을 입력할 경우 에러 발생", () => {
    expect(() => validatePrice("")).toThrow(PRICE_ERROR_MESSAGE.EMPTY);
  });

  test.each(["a", "메타", "블루"])("숫자가 아닐 때 에러 발생", (priceInput) => {
    expect(() => validatePrice(priceInput)).toThrow(PRICE_ERROR_MESSAGE.NUMBER);
  });

  test.each([300, 900, 980])(`${LOTTO_PRICE}보다 작을 때 에러 발생`, (priceInput) => {
    expect(() => validatePrice(priceInput)).toThrow(PRICE_ERROR_MESSAGE.UNDER_PRICE);
  });

  test.each([1300, 1900, 9580])(`${LOTTO_PRICE}로 나누어 떨어지지 않을 때 에러 발생`, (priceInput) => {
    expect(() => validatePrice(priceInput)).toThrow(PRICE_ERROR_MESSAGE.INDIVISIBLE);
  });
});
