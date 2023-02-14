const Lotto = require("../src/domain/Lotto");

describe("로또 기능 테스트", () => {
  test("배열이 전달되면 로또가 생성돼는지 테스트", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("", () => {});
});
