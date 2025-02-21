import validateLottoPrice from "./validateLottoPrice.js";
import CustomError from "../CustomError.js";
import { ERROR_MESSAGE, ERROR_PREFIX } from "../constants/message.js";
import { LOTTO_RULE } from "../constants/lotto.js";

describe("validateLottoPrice 유효성 검사", () => {
  test("로또 구입 금액이 정수가 아니면 에러가 발생한다.", () => {
    const price = 1000.1;
    expect(() => validateLottoPrice(price)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_INTEGER, ERROR_PREFIX.typeError)
    );
  });

  test(`로또 구입 금액이 ${LOTTO_RULE.MIN_PRICE}원 단위로 나눠지지 않으면 에러가 발생한다.`, () => {
    const price = 5001;
    expect(() => validateLottoPrice(price)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_MULTIPLE_OF_THOUSAND, ERROR_PREFIX.invalidInputError)
    );
  });

  test(`로또 구입 금액이 최소 단위인 ${LOTTO_RULE.MIN_PRICE}원 보다 작으면 에러가 발생한다.`, () => {
    const price = 999;
    expect(() => validateLottoPrice(price)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_MIN_PRICE, ERROR_PREFIX.rangeError)
    );
  });

  test(`로또 구입 금액이 최대 구입 가능 금액인 ${LOTTO_RULE.MAX_PRICE}원을 초과하면 에러가 발생한다.`, () => {
    const price = 101_000;
    expect(() => validateLottoPrice(price)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_OVER_MAX_PRICE, ERROR_PREFIX.rangeError)
    );
  });

  test("로또 구입 금액이 1,000원이면 유효성 검사에서 에러가 발생하지 않는다.", () => {
    const price = 1_000;
    expect(() => validateLottoPrice(price)).not.toThrow();
  });
});
