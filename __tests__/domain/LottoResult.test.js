/* eslint-disable max-lines-per-function */
import Lotto from "../../src/domain/Lotto.js";
import LottoResult from "../../src/domain/LottoResult.js";
import WinningLotto from "../../src/domain/WinningLotto.js";

describe("LottoResult 객체 테스트", () => {
  test("구매한 로또들의 등수별 갯수를 리턴한다.", () => {
    const winningLottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningLotto = new WinningLotto(winningLottoNumbers);
    winningLotto.setBonusNumber(7);

    const lottoList = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 8, 7]),
    ];
    const lottoResult = new LottoResult(lottoList, winningLotto);

    // expect(lottoResult.getdjWjrn()).toBe({
    //   FIRST: 1,
    //   SECONT: 1,
    //   THIRD: 0,
    //   FOURTH: 0,
    //   FIFTH: 0,
    //   NONE: 0,
    // });
  });
});
