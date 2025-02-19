import { validationLottoPrice } from "./validationLottoPrice.js";

describe("validationLottoPrice 유효성 검사", () => {
  test("1000.1원은 정수가 아니다.", () => {
    const price = 1000.1;
    expect(() => validationLottoPrice(price)).toThrow();
  });

  test("5001원은 1000원 단위로 나눠지지 않는다.", () => {
    const price = 5001;
    expect(() => validationLottoPrice(price)).toThrow();
  });

  test("999원은 최소 구입 금액(1000원)보다 작다.", () => {
    const price = 999;
    expect(() => validationLottoPrice(price)).toThrow();
  });

  test("101,000원은 최대 구입 금액(10만원)을 초과한다.", () => {
    const price = 101_000;
    expect(() => validationLottoPrice(price)).toThrow();
  });
});
