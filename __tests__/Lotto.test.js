import Lotto from "../src/domain/Lotto.js";

describe("Lotto", () => {
  test("발급 받은 번호로 로또 객체를 생성한다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];

    const lotto = new Lotto(numbers);

    expect(lotto.getNumber()).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
