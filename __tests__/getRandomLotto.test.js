import { getRandomLotto } from "../src/service/getRandomLotto.js";

describe("getRandomLotto", () => {
  test("랜덤 로또 번호 6개를 반환한다.", () => {
    const result = getRandomLotto();
    expect(result.length).toBe(6);
  });
});
