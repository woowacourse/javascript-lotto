import Lotto from "../src/domain/Lotto.js";

describe("로또 기능 테스트", () => {
  test("숫자 6개를 가진 로또를 발행한다.", () => {
    const lotto = new Lotto();
    expect(lotto.getNumbers()).toHaveLength(6);
  });
});
