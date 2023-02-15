const WinLotto = require("../src/domain/WinLotto");

describe("당첨 번호 테스트", () => {
  test("당첨 번호와 보너스 번호가 잘 입력되는 지 확인", () => {
    const winLotto = new WinLotto([1, 2, 3, 4, 5, 6], 7);
    expect([...winLotto.numbers, winLotto.bonusNumber]).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });
});
