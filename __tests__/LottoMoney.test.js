import LottoMoney from "../src/domain/LottoMoney.js";

describe("로또머니 클래스 기능 테스트", () => {
  const MINIMUM_MONEY_THRESHOLD = LottoMoney.MIN - 1;
  const MAXIMUM_MONEY_THRESHOLD = LottoMoney.MAX + 1;

  test.each([MINIMUM_MONEY_THRESHOLD, MAXIMUM_MONEY_THRESHOLD])(
    "구입 금액이 1000 미만이거나 1,000,000,000을 초과하면 오류를 발생시킨다.",
    (wrongMoney) => {
      expect(() => new LottoMoney(wrongMoney)).toThrow("[ERROR]");
    }
  );

  test.each(["a", 123.45])(
    "구입 금액의 자료형이 정수가 아니면 오류를 발생시킨다.",
    (wrongMoney) => {
      expect(() => new LottoMoney(wrongMoney)).toThrow("[ERROR]");
    }
  );
});
