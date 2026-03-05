import WinningLotto from "../src/domain/WinningLotto.js";

describe("WinningLotto", () => {
  test("당첨 번호와 보너스 번호를 받는 객체를 생성한다.", () => {
    const number = { "당첨 번호": [1, 2, 3, 4, 5, 6], "보너스 번호": 7 };

    const lotto = new WinningLotto(number);

    expect(lotto.getWinningNumber()).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(lotto.getBonusNumber()).toStrictEqual(7);
  });
});
