import PriceValidator from "../src/validation/PriceValidator.js";

describe("입력한 구매 금액에 대한 유효성 검사를 진행한다", () => {
  test("1000원 단위가 아닌 경우 에러를 발생시킨다.", () => {
    const price = 1200;

    const priceValidator = new PriceValidator();

    expect(() => priceValidator.checkThousandUnit(price)).toThrow("[ERROR]");
  });

  test.each([500, 1000000])(
    "1000원 이상 100000 이하가 아닌 경우 에러를 발생시킨다. - %s원인 경우",
    (price) => {
      const priceValidator = new PriceValidator();

      expect(() => priceValidator.validatePrice(price)).toThrow("[ERROR]");
    }
  );
});
