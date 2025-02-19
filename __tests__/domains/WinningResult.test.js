import Lotto from "../../src/domains/Lotto";
import WinningResult from "../../src/domains/WinningResult";

describe("당첨 결과 테스트", () => {
  describe("정상 케이스", () => {
    test("사용자가 구입한 로또 번호와 당첨 번호를 비교하여 당첨 통계를 계산한다.", () => {
      // given
      const lottos = [
        new Lotto([1, 2, 3, 4, 5, 6]),
        new Lotto([1, 2, 3, 4, 5, 7]),
        new Lotto([1, 2, 3, 4, 5, 8]),
        new Lotto([1, 2, 3, 4, 8, 9]),
        new Lotto([1, 2, 3, 10, 11, 12]),
        new Lotto([1, 2, 13, 14, 15, 16]),
        new Lotto([1, 17, 18, 19, 20, 21]),
      ];
      const winningLotto = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      // when
      const winningResult = new WinningResult(winningLotto, bonusNumber);
      const result = winningResult.calculate(lottos);

      // then
      expect(result).toEqual([1, 1, 1, 1, 1]);
    });
  });
});
