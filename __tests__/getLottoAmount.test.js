import { getLottoAmount } from "../src/utils.js";

describe("getLottoAmount 테스트", () => {
  test("구입 금액을 입력하면 구입한 로또 개수를 반환한다.", () => {
    const price = 8000;
    const amount = getLottoAmount(price);
    expect(amount).toBe(8);
  });
});
