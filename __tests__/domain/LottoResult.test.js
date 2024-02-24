/* eslint-disable max-lines-per-function */
import Lotto from "../../src/domain/Lotto.js";
import LottoResult from "../../src/domain/LottoResult.js";
import WinningLotto from "../../src/domain/WinningLotto.js";

describe("LottoResult 객체 테스트", () => {
  let lottoRank;
  let lottoProfit;

  beforeEach(() => {
    const LOTTO_LIST = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([7, 8, 9, 10, 11, 12]),
    ];
    const WINNING_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const WINNING_LOTTO = new Lotto(WINNING_LOTTO_NUMBERS);
    const WINNING_LOTTO_WITH_BONUS_NUMBER = new WinningLotto(WINNING_LOTTO, 7);

    const result = new LottoResult(
      LOTTO_LIST,
      WINNING_LOTTO_WITH_BONUS_NUMBER,
    ).getResult();

    lottoRank = result.rank;
    lottoProfit = result.profit;
    console.log(result);
  });

  test("구매한 로또들의 등수별 갯수를 리턴한다.", () => {
    expect(lottoRank).toEqual({
      1: 1,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    });
  });

  test("구매한 로또의 수익률을 계산한다.", () => {
    expect(lottoProfit).toBe(100000000);
  });
});
