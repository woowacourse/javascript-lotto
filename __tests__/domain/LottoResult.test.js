import Lotto from "../../src/domain/Lotto.js";
import WinningNumber from "../../src/domain/WinningNumber.js";
import LottoResult from "../../src/domain/LottoResult.js";
import Rank from "../../src/domain/Rank.js";

describe("LottoResult 테스트", () => {
  const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
  const winningNumber = new WinningNumber(winningLotto, 7);

  test("낙첨 로또는 집계에서 제외된다", () => {
    const lottos = [new Lotto([10, 20, 30, 40, 41, 42])];
    const result = new LottoResult(lottos, winningNumber);
    expect(result.getRankCount(Rank.MISS)).toBe(0);
  });

  test("수익률을 소수점 첫째 자리까지 계산한다", () => {
    const lottos = [new Lotto([1, 2, 3, 10, 11, 12])]; // 5등 (5000원)
    const result = new LottoResult(lottos, winningNumber);
    expect(result.getProfitRate(1000)).toBe("500.0");
  });
});
