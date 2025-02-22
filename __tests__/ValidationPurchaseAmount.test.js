import parseAndValidatePurchaseAmount from "../src/domain/processors/parseAndValidatePurchaseAmount";

describe("구입 금액 도메인 검증", () => {
  test("숫자가 아닌 값이 들어오면 에러가 발생한다.", () => {
    const purchaseAmount = "가나다";
    expect(() => parseAndValidatePurchaseAmount(purchaseAmount)).toThrow();
  });
  test("0 값이 들어오면 에러가 발생한다.", () => {
    const purchaseAmount = 0;
    expect(() => parseAndValidatePurchaseAmount(purchaseAmount)).toThrow();
  });
  test("1,000원 단위가 아니라면 에러가 발생한다.", () => {
    const purchaseAmount = "3200";
    expect(() => parseAndValidatePurchaseAmount(purchaseAmount)).toThrow();
  });
  test("숫자가 들어오면 해당 숫자가 반환된다.", () => {
    const purchaseAmount = 3000;
    expect(parseAndValidatePurchaseAmount(purchaseAmount)).toBe(purchaseAmount);
  });
});
