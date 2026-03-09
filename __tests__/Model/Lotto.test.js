import Lotto from "../../src/Model/Lotto.js";

describe("로또 검사 테스트", () => {
  test("로또 객체는 로또 번호를 가진다.", () => {
    const randomNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(randomNumbers);

    expect(lotto.getNumbers().length).toBe(6);
  });
  test("로또 객체는 중복되지 않은 번호들 오름차순으로 가진다.", () => {
    const randomNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(randomNumbers);

    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
