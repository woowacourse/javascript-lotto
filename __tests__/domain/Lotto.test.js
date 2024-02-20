import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 객체 테스트", () => {
  test("로또 번호는 중복되면 안된다.", () => {
    expect(() => new Lotto([1, 1, 2, 3, 4, 5])).toThrow("[ERROR]");
  });
});
