import Lotto from "../../src/models/Lotto.js";

describe("models/Lotto", () => {
  test("로또 객체를 만들 수 있다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);

    expect(lotto.numbers).toEqual(numbers);
  });
});
