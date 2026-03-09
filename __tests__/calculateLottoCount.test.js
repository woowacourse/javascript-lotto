import { calculateLottoCountService } from "../src/service/calculateLottoCountService.js";

describe("calculateLottoCountService", () => {
  test("2000원을 지불하면 로또 2장을 발급한다.", () => {
    const money = 2000;
    const count = calculateLottoCountService(money);
    expect(count).toBe(2);
  });
});
