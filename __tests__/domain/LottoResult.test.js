/* eslint-disable max-lines-per-function */
import Lotto from "../../src/domain/Lotto.js";
import LottoResult from "../../src/domain/LottoResult.js";
import WinningLotto from "../../src/domain/WinningLotto.js";

describe("LottoResult 객체 테스트", () => {
  test("구매한 로또들의 등수별 갯수를 리턴한다.", () => {
    const WINNING_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const WINNING_LOTTO = new WinningLotto(WINNING_LOTTO_NUMBERS);
    WINNING_LOTTO.setBonusNumber(7);
    const LOTTO_LIST = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 8, 7]),
    ];

    const lottoResult = new LottoResult(
      LOTTO_LIST,
      WINNING_LOTTO,
    ).getTotalResult();

    expect(lottoResult).toEqual({
      1: 1,
      2: 0,
      3: 0,
      4: 1,
      5: 0,
    });
  });

  test("구매한 로또의 수익률을 계산한다.", () => {
    const WINNING_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const WINNING_LOTTO = new WinningLotto(WINNING_LOTTO_NUMBERS);
    WINNING_LOTTO.setBonusNumber(7);
    const LOTTO_LIST = [new Lotto([1, 2, 3, 11, 12, 13])];

    const profitResult = new LottoResult(LOTTO_LIST, WINNING_LOTTO).getProfit(
      LOTTO_LIST.length * 1000,
    );

    expect(profitResult).toBe(500);
  });
});
