import {
  calculateProfit,
  statistics,
} from "../../../../src/features/statistics/lottoStatistics.js";

import Lotto from "../../../../src/domain/Lotto.js";
import Rank from "../../../../src/domain/Rank.js";
import WinningNumber from "../../../../src/domain/WinningNumber.js";

describe("8000원으로 로또 3등이 당첨됐을때", () => {
  test("출력용 통계 객체(몇등인지랑 수량)", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningNumber = new WinningNumber([1, 2, 3, 4, 5, 7], 6);
    const result = Rank.SECOND;
    expect(statistics(lotto, winningNumber)).toEqual(result);
  });

  test("수익률 계산 8000원으로 5000원 벌면 62.5%", () => {
    expect(calculateProfit(8000, 5000)).toBe(62.5);
  });
});
