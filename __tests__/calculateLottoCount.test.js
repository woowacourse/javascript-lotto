import { calculateLottoCount } from "../src/service/calculateLottoCount.js";

describe("calculateLottoCount", () => {
  test("2000원을 지불하면 로또 2장을 발급한다.", () => {
    const money = 2000;
    const count = calculateLottoCount(money);
    expect(count).toBe(2);
  });
});
